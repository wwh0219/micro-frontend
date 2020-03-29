import Vue, { ComponentOptions } from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import './styles/style.scss'
import 'shared/styles/lib.scss'
import { registerSubSystem, Factory } from 'shared/index'
import ElementUi from 'element-ui'

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
