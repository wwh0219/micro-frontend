import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import './styles/style.scss'
import 'common/styles/lib.scss'
import { registerSubSystem, Factory } from 'common/index'
import ElementUi from 'element-ui'
import { VueConfiguration } from 'vue/types/vue'
import { ComponentOptions } from 'vue/types/umd'
Vue.config.productionTip = false
Vue.use(ElementUi)
const createAPP = (options: ComponentOptions<Vue>): Vue => {
  return new Vue({
    ...options,
    render: h => h(App)
  })
}
const factory: Factory = {
  createAPP,
  createStore,
  createRouter
}
registerSubSystem(factory, {
  appid: process.env.ID
})
export default factory
