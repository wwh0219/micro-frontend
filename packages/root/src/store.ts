import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import { http } from '@/api/http'
// @ts-ignore
// import appData from './dev-subsysmt-map'
import Url from 'url-parse'

Vue.use(Vuex)
type Manifest ={
  scripts: string[]
  styles: string[]
}
type State = {
  appList: AppData[]
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
    },
    SET_APP_MANIFEST (state, { id, data }) {
      const app = state.appList.find(i => i.ID === id)
      Vue.set(app!, 'manifest', data)
    }
  },
  actions: {
    async getManifest ({ commit, state }, app: AppData) {
      console.log(app)
      const url = new Url('/manifest.json', app.PUBLIC_PATH).href
      const manifest = await http<Manifest>({
        url
      })
      commit('SET_APP_MANIFEST', {
        id: app.ID,
        data: manifest
      })
    },
    getAppList ({ commit, dispatch }) {
      let data
      if (process.env.IS_DEV) {
        data = process.env.DEV_SUB_SYS_CONFIG_MAP
      }
      commit('SET_APP_LIST', data)
    }
  }
}
const store = new Vuex.Store(_module)
export default store
