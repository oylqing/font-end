import Vue from 'vue'
import Router from 'vue-router'
import Display from '@/views/display'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/display'
    },
    {
      path: '/display',
      name: 'display',
      component: Display
    }
  ]
})
