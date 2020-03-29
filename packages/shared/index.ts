import Vue from 'vue'
import { Store, MutationPayload } from 'vuex'
import { sharedModule, mutations as sharedMutation, actions } from './store'
import VueRouter from 'vue-router'
import { ComponentOptions } from 'vue/types/umd'
let subStore: Store<any>

const root = window.ROOT_VM // 入口系统实例
let ubsubscribe: Function // 取消父子系统同步

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
/**
 * 在入口系统注册子系统，或者独立访问时直接挂载子系统
 */
export const registerSubSystem = async (factory: Factory, options: RegisterOptions) => {
  const _options = {
    ...defaultOptions,
    ...options
  }
  const store = factory.createStore()
  registerStoreModule(store)
  const createApp = () => {
    const vm = factory.createAPP({
      router: factory.createRouter(),
      store
    })
    vm.$once('hook:beforeDestroy', () => {
      ubsubscribe && ubsubscribe()
    })
    return vm
  }
  if (root) { // 集成到入口系统启动时
    console.log(_options.appid)
    root.$store.commit('SET_FACTORY', { id: _options.appid, factory: createApp })
    syncStoreState(store)
  } else {
    createApp().$mount(_options.el)
  }
}
/**
 * 动态注册一个通用模块
 */
export const registerStoreModule = async (store: Store<any>) => {
  store.registerModule('shared', sharedModule)
  if (root && store !== root.$store) {
    store.commit(sharedMutation.sync, root.$store.state.shared)
  }
  await store.dispatch(actions.init)
}

const isSyncableMutation = (mutation: MutationPayload) => {
  return /^shared\//g.test(mutation.type) && mutation.type !== sharedMutation.sync
}
/**
 * 子系统同步父级shared模块下的状态
 */
export const syncStoreState = (store: Store<any>) => {
  subStore = store
  const rootStore = root!.$store
  subStore.commit(sharedMutation.sync, rootStore.state.shared)
  const ubsubscribeRoot = rootStore.subscribe((mutation, state) => {
    if (isSyncableMutation(mutation)) {
      subStore.commit(sharedMutation.sync, state.shared)
    }
  })
  const ubsubscribeSub = subStore.subscribe((mutation, state) => {
    if (isSyncableMutation(mutation)) {
      rootStore.commit(sharedMutation.sync, state.shared)
    }
  })
  ubsubscribe = () => {
    ubsubscribeRoot()
    ubsubscribeSub()
  }
  store.dispatch(actions.init)
  return store
}

export const uninstallSubApp = (vm:Vue) => {
  vm.$el.remove()
  vm.$destroy()
}
