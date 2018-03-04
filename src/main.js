/*这里是“@”在build下设置的为相对路径 */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import iview from 'iview'  //引入iview
import router from './router/index'
import store from './vuex/store'
import qs from 'qs'
import axios from 'axios'
import _ from 'lodash' //引入数据操作处理js
import $ from 'jquery' //引入jquery
import echarts from 'echarts' //引入jquery
import config from '../static/config'//引入配置文件
/*引用CSS样式*/
import 'iview/dist/styles/iview.css'//引入iview的css文件
// import 'vis/dist/vis.min.css'//引入vis的css文件
import './assets/css/layout.scss'//引入布局的scss文件
import './assets/css/reset.scss'//引入重置的scss文件

/*自定义指令*/
import './directive'//指令引用只能引用index.js名称（指令都写在一起）

Vue.use(iview)
Vue.use(Vuex)

/*请求头配置*/
// axios.defaults.timeout = 5000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json';//配置请求头

axios.defaults.baseURL = config.baseUrl;   //配置接口地址
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	//在发送请求之前做某件事
    iview.LoadingBar.start();
    if(config.url.indexOf('?')>-1){
      config.url = config.url+'&t='+(new Date().getTime());
    }else{
      config.url = config.url+'?t='+(new Date().getTime());
    }
    config.withCredentials = false;
    if(config.method != 'post'){
        config.data = qs.stringify(config.data);
    }else{

    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
	//对响应数据做些事
    iview.LoadingBar.finish()
    // if(!res.data.success){
    //     return Promise.reject(res);
    // }
    return res;
}, (error) => {
    return Promise.reject(error);
});

window.$ = $;
Vue.config.productionTip = false;
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

// 切换路由显示loadingbar
router.beforeEach((to, from, next) => {
  iview.LoadingBar.start();
  //判断没有登录调到登录界面
  // if(!sessionStorage.getItem('userInfo') && to.path!='/login'){
  //   router.push('/login');
  // }else{
    next()
  // }
})

router.afterEach((to, from, next) => {
  iview.LoadingBar.finish();
})
/*创建websocket*/
Vue.prototype.ws = (function(){
  let ws = new WebSocket(config.wsUrl);
  ws.onopen = function(evt) { 
    console.log("websocket已打开"); 
    ws.send("Hello WebSockets!");
  };

  ws.onmessage = function(evt) {
    console.log( "Received Message: " + evt.data);
    ws.close();
  };

  ws.onclose = function(evt) {
    console.warn("websocket已关闭");
  };
  return ws
})();

/* eslint-disable no-new */
window.Vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
