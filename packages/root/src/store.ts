import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import { http } from '@/api/http'
import appData from '../dev-subsysmt-map.json'
import Url from 'url-parse'

Vue.use(Vuex)
type App = {
	name: string
	url: string
	id: number
	manifest: AppManifest
}
type AppManifest = {
	scripts: string[]
	styles: string[]
	env: NodeJS.EnvVars
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
    getAppData: state => (alias: string) => state.appList.find(app => app.manifest.env.ALIAS === alias)
  },
  mutations: {
    SET_APP_LIST (state, data) {
      state.appList = data
    },
    SET_APP_MAINIFEST (state, data) {
      const app = state.appList.find(i => i.id === data.id)
      if (app) {
        Vue.set(app, 'manifest', data.data)
      }
    }
  },
  actions: {
    getManifest ({ commit, state }) {
      return Promise.all(state.appList.map(async i => {
        const url = new Url('/manifest.json', i.url).href
        const data = await http({
          url
        })
        commit('SET_APP_MAINIFEST', {
          id: i.id,
          data
        })
        return data
      }))
    },
    getAppList ({ commit }) {
      let data
      if (process.env.IS_DEV) {
        data = appData.map(i => {
          return {
            ...i,
            manifest: {
              env: {},
              scripts: [],
              styles: []
            }
          }
        })
      }
      commit('SET_APP_LIST', data)
    }
  }
}
const store = new Vuex.Store(_module)
export default store
