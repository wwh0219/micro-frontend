import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/style.scss'
import 'shared/styles/lib.scss'
import { registerStoreModule } from 'shared/index'
import ElementUi from 'element-ui'
Vue.config.productionTip = false
Vue.use(ElementUi)
registerStoreModule(store)
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.ROOT_VM = vm

// fixme 调试代码
store.commit('shared/SET_USER', {
  id: 321
})
