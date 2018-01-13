import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    /*测试*/
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/components/test.vue'], resolve) 
    },
    {
      path: '/',
      name: 'login',
      redirect: '/login'
      // component: resolve => require(['@/components/login.vue'], resolve) 
    },
    /*登录页面*/
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login.vue'], resolve) 
    },
    /*主页面*/
    {
      path: '/main',
      name: 'main',
      component: resolve => require(['@/components/main.vue'], resolve) 
    }
  ]
})
