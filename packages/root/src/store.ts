import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import { http } from '@/api/http'
// @ts-ignore
// import appData from './dev-subsysmt-map'
import Url from 'url-parse'
import { Factory } from 'shared/index'
Vue.use(Vuex)
type Manifest ={
  scripts: string[]
  styles: string[]
}
type State = {
  appList: AppData[]
  appFactories:{
    [key:string]:Factory
  }
}
const _module: Module<State, any> = {
  state: {
    appList: [],
    appFactories: {}
  },
  getters: {
    appList: state => state.appList,
    getAppData: state => (alias: string) => state.appList.find(app => app.ALIAS === alias),
    getAppFactory: state => (id:string) => {
      return state.appFactories[id]
    }
  },
  mutations: {
    SET_APP_LIST (state, data) {
      state.appList = data
    },
    SET_APP_MANIFEST (state, { id, data }) {
      const app = state.appList.find(i => i.ID === id)
      Vue.set(app!, 'manifest', data)
    },
    SET_FACTORY (state, { id, factory }) {
      Vue.set(state.appFactories, id, factory)
    }
  },
  actions: {
    async getManifest ({ commit, state }, app: AppData) {
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
