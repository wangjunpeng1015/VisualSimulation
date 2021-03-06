import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',//使用路由的history模式 这种模式充分利用了history.pushState API来完成URL的跳转而不需要重新加载页面(history模式和hash模式)
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
    },
    /*场景设置*/
    {
      path: '/scene',
      name: 'scene',
      component: resolve => require(['@/components/page/scene.vue'], resolve) 
    },
    /*航迹规划*/
    {
      path: '/hjgh',
      name: 'hjgh',
      component: resolve => require(['@/components/page/hjgh.vue'], resolve) 
    },
    /*基础数据库*/
    {
      path: '/jcsjk',
      name: 'jcsjk',
      component: resolve => require(['@/components/page/jcsjk.vue'], resolve) 
    },
    /*任务规划*/
    {
      path: '/rwgh',
      name: 'rwgh',
      component: resolve => require(['@/components/page/rwgh.vue'], resolve) 
    }
  ]
})
