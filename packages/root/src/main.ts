import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/style.scss'
import 'common/styles/lib.scss'
import { registerStoreModule } from 'common/index'
import OnevUi from 'onev-ui'
Vue.config.productionTip = false
Vue.use(OnevUi)
registerStoreModule(store)
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.ROOT_VM = vm

// fixme 调试代码
store.commit('common/SET_USER', {
  id: 321
})
