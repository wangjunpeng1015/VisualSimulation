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
    },
    /*登录页面*/
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/page/login.vue'], resolve) 
    },
    /*主页面*/
    {
      path: '/main',
      name: 'main',
      component: resolve => require(['@/components/page/main.vue'], resolve) 
    },
    /*用户管理*/
    {
      path: '/usermanage',
      name: 'usermanage',
      component: resolve => require(['@/components/page/usermanage.vue'], resolve) 
    }
  ]
})
