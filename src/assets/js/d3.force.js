/*改页面只用于scene组件*/
import * as d3 from 'd3';
// import picUrl from ''
//图片地址json
import equipUrl from '../../../static/baseUrl.json'
 //isRoot：外框图片    lx：内图片

//图片Url地址
const picUrl = {
	'00':{
		url:'static/image/aircraftbox.png',
		width:'469',
		height:'495'
	},
	'01':{
		url:'static/image/equipbox.png',
		width:'108',
		height:'109'
	}
}
export const drawforce= function (id,nodes,scope){
	if(!nodes && typeof(nodes)!=='object') {
		debugger
		eventdrag()
		return ;
	}

	//构建连接线link
	let links = [];
	for(let i=1;i<nodes.length;i++){
		links.push({ "source": 0, "target": i })
	}
	//临时节点，临时数据，被放节点数据，坐标
  	let tempNode, tempData, dragData, selectData, relCoords;

	let width = $("#"+id).width();
	let height = $("#"+id).height();
	d3.select('svg').remove();
	var svg = d3.select("#"+id).append("svg")
				.attr("width",width).attr("height",height)
				
	let groupG = svg.append('g')
  
	//拖拽
	let drag = d3.drag()
			  .on('start', function (d) {
					if (!d3.event.active) simulation.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				})
			  .on('drag', function (d) {
					d.fx = d3.event.x;
					d.fy = d3.event.y;
				})
			  .on('end', function (d) {
					if (!d3.event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				})

	let colors = d3.scaleOrdinal(d3.schemeCategory10);
	var simulation = d3.forceSimulation(nodes)
	                   .force('charge', d3.forceManyBody())//顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
	                   .force('link', d3.forceLink(links).distance(150))//连接线长度
	                   .force('center', d3.forceCenter(width / 2, height / 2))
	//连接线
	var link = groupG.append('g')
	              .attr('class', 'links')
	              .selectAll('line')
	              .data(links)
	              .enter()
	              .append('line')
	              .attr('stroke', '#91FFFF')
	              .attr('stroke-width', 1)

	//大节点组
	var nodegroup = groupG.append('g')
	              .attr('class', 'nodes')

	//单个节点组     
	var singlegroup = nodegroup.selectAll('g')
				  .data(nodes)
	              .enter()
 	              .append('g')
 	              //给中间主要加上class'main'
	              .classed("main", d=>{
 	              	return d.lx == '00';
 	              })
 	              .on("mouseover",d=>{
 	              	console.log('in')
              		selectData = d;
	              })
	              .on("mouseout",d=>{
	              	console.log('out')
  					selectData = null;
	              })
	              .on("dblclick ",d=>{
	              	scope.getParam(d.code);
	              })
	              .call(drag)

	//单个节点中装备类型图片
    var node1 = singlegroup.append('image')
 	              .attr("width",d=>{
 	              	return getMxType(d['编号']) == '00'?equipUrl[getMxType(d['编号'])].width:'50';
 	              }).attr("height",d=>{
 	              	return getMxType(d['编号']) == '00'?equipUrl[getMxType(d['编号'])].height:'50';
 	              })
 	              .attr('xlink:href', function(d) {
 					return equipUrl[getMxType(d['编号'])].url;
				  })
    //单个节点中装备背景
	var node = singlegroup.append('image')
	              .attr("width",d=>{
	              	return d.isRoot?picUrl['00'].width/2:picUrl['01'].width/2;
	              })
	              .attr('class',d=>{
	              	return d.isRoot?'aircraft':'equip';
	              })
	              .attr('xlink:href', function(d) {
					return d.isRoot?picUrl['00'].url:picUrl['01'].url;
					  })
	//删除节点
	var del = singlegroup.append("rect")
	              .attr("class","del")
                  // .style("display","none")
	              .attr('width',20)
	              .attr('height',15)
	              .attr("fill", "yellow")
	              // .attr('stroke-width', 2)
	              .on('click',d=>{
	              	alert('删除')
	              });
	              // del.append('text')
	              // .attr("x", -10)
	              // .text('删除')
	              

	              
    //节点名称
	var nodetext = nodegroup.selectAll('text')
				  .data(nodes)
				  .enter().append('text')
				  .style('fill','#91FFFF')
				  .text(d=>{
				  	return d['名称'];
				  })
	
	//给节点添加title
	node.append('title')
	    .text(function(d) { return d['名称']; });

	simulation
	    .nodes(nodes)
	    .on('tick', ticked);

	simulation.force('link')
	          .links(links);
	//指时间间隔，隔一段时间刷新一次画面
	function ticked() {
		//更新连接线的位置
		link.attr('x1', function(d) { return d.source.x; })
			.attr('y1', function(d) { return d.source.y; })
			.attr('x2', function(d) { return d.target.x; })
			.attr('y2', function(d) { return d.target.y; })
		//更新节点装备位置
		node.attr('x', function(d) {
			    let type = d.isRoot?'00':'01';
				return d.isRoot?d.x - picUrl[type].width/4:d.x - picUrl[type].width/4;
			})
			.attr('y', function(d) {
				let type = d.isRoot?'00':'01';
				return d.isRoot?d.y - picUrl[type].height/4:d.y - picUrl[type].height/4;
			})
		node1.attr('x', function(d) {
				let type = getMxType(d['编号']);
				return d.x - equipUrl[type].width/4;
			})
			.attr('y', function(d) {
				return d.y - 30;
			})
		del.attr('x', function(d) {
				return d.x;
			})
			.attr('y', function(d) {
				return d.y;
			})
		//更新节点文字位置
		nodetext.attr('x',d=>{
				return d.x - (d['名称'].length)*6/2;
			})
			.attr('y',d=>{
				return d.y + 40;
			})
	}
	/*--------------------------------------拖拽事件--------------------------------------------------------------*/
	function eventdrag(){
	  //判断是拖动到地球还是场景搭载
	  setTimeout(()=>{
	      d3.selectAll('.dragtree').selectAll('.ivu-tree-title').call(d3.drag()
	          .on("start", function(d) {
	          	console.log(1111)
				let code = d3.select(this).attr('code');
  		  		getTempData(code).then(res=>{
  		  			tempData = res;	
		            tempNode = getTempNode(tempData);
		          	if(scope.showDz){
		          		
		          	}else{

		          	}
  		  		});
      		  	//判断拉取的模型是否有数据
	            d3.event.sourceEvent.stopPropagation();
	          })
	          .on("drag", function(d) {
	          	if(!tempData) return;
	          	if(scope.showDz){

	          	}else{

	              var newNode = tempNode._groups[0][0];

	              // get coords of mouseEvent relative to svg container to allow for panning
	              relCoords = d3.mouse($('svg').get(0));
	              let x = relCoords[0]+10;//不加数字会出现mouseover后马上mouseout
	              let y = relCoords[1]+10;

	              var node = d3.select(newNode);

	              node.attr("transform",`translate(${x},${y})`);

	          	}
	          })
	          .on("end", function(d) {
	          	  if(!tempData) return;
	          	  if(scope.showDz){
          	  		let code = d3.select(this).attr('code');
	          		let position = mainmap.position;
	          		let data = [{
				          "name":name,
				          population:'',
				          lx:'0',//图片类型
				          zy:'0',//阵营
				          lon:parseFloat(position[0]),
				          lat:parseFloat(position[1]) 
				       }
				     ]
	          		mainmap.drawStatic(data);
				     //搭载创建根节点
				    let temp = _.cloneDeep(tempData);
				    temp['部署位置'] = {
				    	'经度':position[0],
				    	'纬度':position[1],
				    }
				    temp['isRoot'] = true;
	          		nodes.push(temp);
	              	update();
					//调用页面获取模型信息
	          		scope.getParam(code,position);//code,经纬度
		          		
	          	  }else{
		              //判断最后是否在场景中且移动到某个节点中否则删除
		              let width = $('svg').width();
		              let height = $('svg').height();
		              var newNode = tempNode._groups[0][0];
		              if(relCoords[0]>0 && relCoords[1]>0 && relCoords[0]<width && relCoords[1]<height && selectData!==null){
		              	// selectData
		              	if(selectData.isRoot){
		              		//先删除svg重绘
			              	nodes.push(tempData)
			              	update();
		              	}else{
		              		d3.select(newNode).remove()
		              	}

		              }else{
		              	d3.select(newNode).remove()
		              }
	          	  }
	          	  selectData = null;
	          }));
	  },1000)
	}
	//更新
	function update(){
		d3.selectAll('svg').remove();
		drawforce(id,nodes,scope);//更新d3画图
	}
	async function getTempData(code) {
		let {data} = await scope.$http.get(`/Template/GetModelByCode?code=${code}`);
     	return data;
	}
	//拖动图片类型
	let getlx = (code)=>{
		return '01'
		if (!code) return '01';
		if(code.startsWith('00')){
			return '';
		}else{
			return '';
		}
	}
	//判断模型类型
	function getMxType(num){
		let type = num.substr(4);
		if(type.startsWith('0202')){//航母
			return '00'
		}else if(type.startsWith('0201')){
			return '02'
		}else if(type.startsWith('0301')){
			return '06'
		}else if(type.startsWith('0204')){
			return '07'
		}else{
			return '01'
		}
	}
	//构造拖动节点
	function getTempNode(data) {
		  let type = getMxType(data['编号']);
	      var g = d3.select('svg .nodes')
	      	  .append('g')
	          .data([data])

	      g.append('image')
	      		.attr("width",d=>{
	              	return 54;
	            })
	        	.attr('xlink:href',d=>{
	            	return 'static/image/equipbox.png'
	        	})
    		
    	    g.append('image')
	              .attr("width",d=>{
	              	return type == '00'?equipUrl[type].width:'50';
	              }).attr("height",d=>{
	              	return type == '00'?equipUrl[type].height:'50';
	              })
	              .attr('xlink:href', function(d) {
					return equipUrl[type].url;
			  })

	      return g;
	}
	eventdrag();
}

