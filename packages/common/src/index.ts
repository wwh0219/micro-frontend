import Vue from 'vue'
import { Store } from 'vuex'
import { commonModule } from './store'

export type Factory = () => Vue | Promise<Vue>
export type RegisterOptions = {
  el?: Element | string
  appid: number
  store: Store<any>
}
const defaultOptions: Partial<RegisterOptions> = {
  el: '#app'
}
export const registerSubSystem = async (genVM: Factory, options: RegisterOptions) => {
  const _options = {
    ...defaultOptions,
    ...options
  }
  const vm = await genVM()
  registerStoreModule(options.store)
  if (window.IS_INTERNAL) { // 集成到入口系统启动时
    window.SUB_SYS_FACTORY_MAP[`${_options.appid}`] = genVM
    subscribeRootStore(options.store)
  } else {
    vm.$mount(_options.el)
  }
  return vm
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
