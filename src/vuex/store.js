import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    username: '赵六',
    login:true
  },
  //改变 state 的一些方法
  mutations:{
	  shareWs(state,dispath){
	      state.dispath = dispath
	  },
	  reduce(state){
	      state.count-=1;
	  }
  },
  //管理触发mutations条件的
  action:{

  },
  //存放一些公共函数供组件调用
  getters:{

  }
})

export default store