import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const createRouter = () => new Router({
  mode: 'history',
  base: process.env.ALIAS,
  routes: [
    {
      path: '/:appAlias?/(.*)?'
    }
  ]
})
export default createRouter
