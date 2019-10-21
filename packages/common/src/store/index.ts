import { Store, Module } from 'vuex'
type State = {
  user?: {
    id: number
  }
}

export const commonModule: Module<State, any> = {
  namespaced: true,
  state: {
    user: undefined
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data
    }
  }
}
