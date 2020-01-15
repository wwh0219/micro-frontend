import Vue from 'vue'
import { Store } from 'vuex'
import { sharedModule } from './store'
import VueRouter from 'vue-router'
import { ComponentOptions } from 'vue/types/umd'
let currentStore: Store<any>
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
  console.log(window.IS_INTERNAL)
  if (window.IS_INTERNAL) { // 集成到入口系统启动时
    window.SUB_SYS_FACTORY_MAP[`${_options.appid}`] = createApp
    syncStoreState(store)
  } else {
    createApp().$mount(_options.el)
  }
  // return vm
}
/**
 * 动态注册一个通用模块
 */
export const registerStoreModule = (store: Store<any>) => {
  store.registerModule('shared', sharedModule)
}

let ubsubscribe:Function
/**
 * 子系统同步父级shared模块下的状态
 */

export const syncStoreState = (store: Store<any>) => {
  currentStore = store
  window.ROOT_VM!.$store.watch(state => state.shared, (...args) => {
    currentStore.commit('shared/SYNC_STATE', window.ROOT_VM!.$store.state.shared)
  }, {
    immediate: true
  })
  ubsubscribe = currentStore.subscribe((mutation, state) => {
    if (/^shared\//g.test(mutation.type)) {
      window.ROOT_VM!.$store.commit('shared/SYNC_STATE', state.shared)
    }
  })
}

export const uninstallSubApp = (vm:Vue) => {
  vm.$el.remove()
  vm.$destroy()
  ubsubscribe()
}
