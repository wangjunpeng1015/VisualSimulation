import Vue from 'vue'
import * as d3 from 'd3'
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
// binding: 一个对象，一个对象，包含以下属性：
			/*name: 指令名，不包括 v- 前缀。
			value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
			oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
			expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
			arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
			modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。。*/
// vnode: Vue编译生成的虚拟节点。
// oldVnode:上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
/*拖拽移动元素指令*/
Vue.directive('drag', {
  inserted(el,binding,vnode,oldVnode){ //inserted 钩子函数:当元素被插入父元素时触发,可省略
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
//拖拽树
Vue.directive('dragTree', {
  componentUpdated(el,binding,vnode,oldVnode){ //inserted 钩子函数:当元素被插入父元素时触发,可省略
	  let oDiv=el; //el --> 触发的DOM元素
	  //定义拖拽数据
	  //数据，d3节点，开始拖拽，鼠标相对dom位置
	  let tempNode, tempData, dragStarted, relCoords;
	  //判断是拖动到地球还是场景搭载
	  let newScene = binding.value;
	  setTimeout(()=>{
	  	debugger
	      d3.select(el).selectAll('.ivu-tree-title').call(d3.drag()
	          .on("start", function(d) {
	              tempNode = getTempNode();
	              // d = tempData;
	              console.log(newScene)
	              dragStarted = true;

	              d3.event.sourceEvent.stopPropagation();
	          })
	          .on("drag", function(d) {
	              // d = tempData;
	              // var svgGroupOffset = {
	              //     'x': parseInt(svgGroup.attr('transform').split('(')[1].split(')')[0].split(',')[0], 10),
	              //     'y': parseInt(svgGroup.attr('transform').split('(')[1].split(')')[0].split(',')[1], 10),
	              //     'scale': zoomListener.scale()
	              // }
	              // tempNode.style('opacity', 1);
	              var newNode = tempNode._groups[0][0];

	              // if (dragStarted) {
	              //     domNode = newNode;
	              //     initiateDrag(d, domNode);
	              // }
	              // get coords of mouseEvent relative to svg container to allow for panning
	              relCoords = d3.mouse($('svg').get(0));
	              let x = relCoords[0];
	              let y = relCoords[1];
	          	  console.log(x,y)

	              var node = d3.select(newNode);
	              node.attr("x", x).attr('y',y);
	              // node.attr("transform", "translate(" + (d.x0 - svgGroupOffset.x)/svgGroupOffset.scale + "," + (d.y0 - svgGroupOffset.y)/svgGroupOffset.scale + ")");
	              // updateTempConnector(true);
	          })
	          .on("end", function(d) {
	              //判断最后是否在场景中 不在删除
	              let width = $('svg').width();
	              let height = $('svg').height();
	              var newNode = tempNode._groups[0][0];
	              if(relCoords[0]>0 && relCoords[1]>0 && relCoords[0]<width && relCoords[1]<height){
	              	console.log('对的')
	              }else{
	              	d3.select(newNode).remove()
	              }
	          }));
			
	  },200)

	  function getTempData(d) {
	      return {
	          "name": d.name,
	          "type": d.type,
	          //"dataType": d.dataType,
	          "x0": 0,
	          "y0": 0,
	          "depth": 0,
	          "x": 0,
	          "y": 0,
	          // "id": d.id,
	          "id":totalNodes++,
	          "parent": root,
	          "appType": d.appType,
	          "appData": d.appData,
	          "contains":d.contains,
	          "move":d.move,
	          "edit":d.edit,
	          "delete":d.delete,
	          "yslx":d.yslx
	      }
	  }
	  function getTempNode(type) {
	      var g = d3.select('svg .nodes')
	      	  .append('g')
	          .data([{ name: "大鹏",type:'01',lx:'03'}])

	      let node = g.append('image')
	      		// .attr('width',)
	        	.attr('xlink:href',d=>{
                	return 'static/image/equipbox.png'
            	})
	      return node;
	  }
  }
})
