// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*这里是“@”相当于“../” */
import Vue from 'vue'
import App from './App'
import iview from 'iview'  //引入iview
import router from './router/index'
import qs from 'qs'
import axios from 'axios'
import _ from 'lodash' //引入数据操作处理js
const config = require('../static/js/config')//引入配置文件
/*引用CSS样式*/
import 'iview/dist/styles/iview.css'//引入iview的css文件
// import 'vis/dist/vis.min.css'//引入vis的css文件
import './assets/css/layout.scss'//引入布局的scss文件
import './assets/css/reset.scss'//引入重置的scss文件
Vue.use(iview)

Vue.config.productionTip = false
Vue.prototype.$http = axios
// window.moment = moment;//暴露到window
/*请求头配置*/
// axios.defaults.timeout = 5000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json';//配置请求头
axios.defaults.baseURL = config.baseUrl;   //配置接口地址
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	//在发送请求之前做某件事
    if(config.method  === 'post'){
        // config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     // _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
	//对响应数据做些事
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

// 切换路由显示loadingbar
// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start()
//   next()
// })

// router.afterEach((to, from, next) => {
//   iView.LoadingBar.finish()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
