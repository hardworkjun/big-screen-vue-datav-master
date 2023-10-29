import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path:'/home',
    name:'Home',
    component:() => import('../views/index.vue')
  },
  {
    path:'/fit',
    name:'Fit',
    component:() => import('../views/fit.vue')
  },
  {
    path:'/clustering',
    name:'Clustering',
    component:() => import('../views/clustering.vue')
  },
  {
    path:'/series',
    name:'Series',
    component:() => import('../views/series.vue')
  },
]
const router = new VueRouter({
  routes
})

export default router