import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/style.scss'
import 'shared/styles/lib.scss'
import View from 'shared/components/app-view.vue'
import Header from 'shared/components/app-header.vue'
import { registerStoreModule } from 'shared/index'
import ElementUi from 'element-ui'
import { actions } from 'shared/store'
Vue.use(ElementUi)
Vue.component(View.name, View)
Vue.component(Header.name, Header)
registerStoreModule(store)
store.dispatch(actions.init).then(() => {
  const vm = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  window.ROOT_VM = vm
})
