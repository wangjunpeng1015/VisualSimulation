import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let userInfo = sessionStorage.getItem('userInfo');

const store = new Vuex.Store({
  // 定义状态
  state: JSON.parse(userInfo) || {
                  username:'',
                  authority:0,
                  isLogin:true
                },
  //改变 state 的一些方法(同步)
  mutations:{
    //改变登录用户
	  changeUser(state,params){
      sessionStorage.setItem('userInfo',JSON.stringify(params));
      state.username = params;
	  },
	  reduce(state){
	      state.count-=1;
	  }
  },
  //管理触发mutations条件的（不受限制 一般是异步）
  action:{

  },
  //存放一些公共函数供组件调用
  getters:{

  }
})

export default store