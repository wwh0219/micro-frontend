import { Store, Module } from 'vuex'
type State = {
  user: null|{
    id: number
  },
  data: any
}
export const mutations = {
  sync: 'shared/SYNC_STATE'
}
export const actions = {
  init: 'shared/init'
}
export const sharedModule: Module<State, any> = {
  namespaced: true,
  state: {
    user: null,
    data: {}
  },
  getters: {
    user: state => state.user,
    isInternal: () => !!window.ROOT_VM
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data
    },
    SYNC_STATE (state, data) {
      Object.keys(state).forEach((key) => {
        state[key as keyof State] = data[key]
      })
    }
  },
  actions: {
    // todo 模拟登录，有需要可自行修改
    init ({ getters, commit }) {
      if (!getters.user) {
        const user = prompt('请输入用户名')
        commit('SET_USER', {
          id: user
        })
      }
    }
  }
}
