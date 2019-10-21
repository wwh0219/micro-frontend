import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import { http } from '@/api/http'
import appData from '../dev-subsysmt-map.json'
import Url from 'url-parse'

Vue.use(Vuex)
type App = NodeJS.EnvVars & {
  scripts: string[]
  styles: string[]
}

type State = {
  appList: App[]
}
const _module: Module<State, any> = {
  state: {
    appList: []
  },
  getters: {
    appList: state => state.appList,
    getAppData: state => (alias: string) => state.appList.find(app => app.ALIAS === alias)
  },
  mutations: {
    SET_APP_LIST (state, data) {
      state.appList = data
    }
  },
  actions: {
    async getManifest ({ commit, state }, urls:string[]) {
      const data = await Promise.all(urls.map(async i => {
        const url = new Url('/manifest.json', i).href
        let { env, ...data } = await http({
          url
        })
        return {
          ...env,
          ...data
        }
      }))
      commit('SET_APP_LIST', data)
    },
    getAppList ({ commit, dispatch }) {
      let data
      if (process.env.IS_DEV) {
        data = appData
      }
      return dispatch('getManifest', data)
    }
  }
}
const store = new Vuex.Store(_module)
export default store
