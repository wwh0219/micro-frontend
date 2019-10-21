import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/style.scss'
import 'common/styles/lib.scss'
import { registerSubSystem } from 'common/index'
import OnevUi from 'onev-ui'
Vue.config.productionTip = false

Vue.use(OnevUi)

const factory = () => {
  const vm = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return vm
}
registerSubSystem(factory, {
  appid: process.env.ID,
  store
})
