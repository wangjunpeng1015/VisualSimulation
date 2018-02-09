import Vue from 'vue'
// 1、bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
// 2、inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
// 3、update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
// 4、componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
// 5、unbind:只调用一次，指令与元素解绑时调用。
// bind: //被绑定
// inserted: //绑定到节点
// update:  //组件更新
// componentUpdated://组件更新完成
// unbind://解绑

// el: 指令所绑定的元素，可以用来直接操作DOM。
// binding: 一个对象，包含指令的很多信息。
// vnode: Vue编译生成的虚拟节点。

/*拖拽移动元素指令*/
Vue.directive('drag', {
  inserted:function(el,binding,vnode){ //inserted 钩子函数:当元素被插入父元素时触发,可省略
	  let oDiv=el; //el --> 触发的DOM元素
	  oDiv.style.position = 'fixed';
	  oDiv.style.zIndex = '99';
	  oDiv.style.cursor = 'move';
	  oDiv.onmousedown=function(e){
	    let l=e.clientX-oDiv.offsetLeft;
	    let t=e.clientY-oDiv.offsetTop;
	    document.onmousemove=function(e){
	      oDiv.style.left=e.clientX-l+'px';
	      oDiv.style.top=e.clientY-t+'px';
	    };
	    oDiv.onmouseup=function(){
	      document.onmousemove=null;
	      oDiv.onmouseup=null;
	    }
	  }
  }
})
