import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import modal from '../components/content/modal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/modal',
          component: modal
        }
      ]
    }
  ]
})
