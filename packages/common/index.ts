import Vue from 'vue'
import { Store } from 'vuex'
import { commonModule } from './store'
import VueRouter from 'vue-router'
import { VueConfiguration } from 'vue/types/vue'
import { ComponentOptions } from 'vue/types/umd'

export type RegisterOptions = {
  el?: Element | string
  appid: number
}
export type Factory = {
  createAPP: (options: ComponentOptions<Vue>) => Vue
  createStore: () => Store<any>
  createRouter: () => VueRouter
}
const defaultOptions: Partial<RegisterOptions> = {
  el: '#app'
}
export const registerSubSystem = async (factory: Factory, options: RegisterOptions) => {
  const _options = {
    ...defaultOptions,
    ...options
  }
  const store = factory.createStore()
  registerStoreModule(store)
  const createApp = () => factory.createAPP({
    router: factory.createRouter(),
    store
  })
  if (window.IS_INTERNAL) { // 集成到入口系统启动时
    window.SUB_SYS_FACTORY_MAP[`${_options.appid}`] = createApp
    subscribeRootStore(store)
  } else {
    createApp().$mount(_options.el)
  }
  // return vm
}
/**
 * 动态注册一个通用模块
 */
export const registerStoreModule = (store: Store<any>) => {
  store.registerModule('common', commonModule)
}
/**
 * 子系统同步父级common模块下的状态
 */
export const subscribeRootStore = (store: Store<any>) => {
  if (window.ROOT_VM) {
    window.ROOT_VM.$store.watch(state => state.common, (...args) => {
      console.log(...args)
    }, {
      immediate: true
    })
  }
}
