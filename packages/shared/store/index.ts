import { Store, Module } from 'vuex'
type State = {
  user?: {
    id: number
  },
  data:any
}

export const sharedModule: Module<State, any> = {
  namespaced: true,
  state: {
    user: undefined,
    data: {}
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data
    },
    SYNC_STATE (state, data) {
      Object.keys(state).forEach((key) => {
        state[key as keyof State] = data[key]
      })
    },
    SET_DATA (state, data) {
      state.data = data
    }
  }
}
