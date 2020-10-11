import Vue from 'vue'
import VueRouter from 'vue-router'
import PageNotFound from '../components/PageNotFound.vue'
import Login from '../components/Login.vue'
import Main from '../components/Main.vue'

Vue.use(VueRouter)

  const routes =
  [
    {
    path: '*',
    name: '404',
    component: PageNotFound,
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
