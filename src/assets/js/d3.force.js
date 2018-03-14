import * as d3 from 'd3';
// import picUrl from ''
//图片地址json
import equipUrl from '../../../static/baseUrl.json'
 //type：外框图片    lx：内图片
let nodess=[
        { name: "Adam",type:'00',lx:'00'},
        { name: "Bob",type:'01',lx:'01'},
        { name: "Carrie",type:'01',lx:'02'},
        { name: "Donovan",type:'01',lx:'03'},
        { name: "Edward",type:'01',lx:'04'},
        { name: "Felicity",type:'01',lx:'05'},
        { name: "George",type:'01',lx:'01'},
        { name: "Hannah",type:'01',lx:'05'},
        { name: "Iris",type:'01',lx:'04'},
        { name: "Jerry",type:'01',lx:'03'}
]

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
export const drawforce= function (id,nodes = nodess,scope){
	//构建连接线link
	let links = [];
	for(let i=1;i<nodes.length;i++){
		links.push({ "source": 0, "target": i })
	}
	//临时节点，临时数据，被放节点数据，坐标
  	let tempNode, tempData, dragData, selectData, relCoords;

	let width = $("#"+id).width();
	let height = $("#"+id).height();

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
	                   .force('link', d3.forceLink(links).distance(200))//连接线长度
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
	var inqq = function (d){
		selectData = d;
  		console.log('in')

	}
	var outqq = function (){
		console.log('out')
  		selectData = null;
	}
	//单个节点组     
	var singlegroup = nodegroup.selectAll('g')
				  .data(nodes)
	              .enter()
 	              .append('g')
 	              //给中间主要加上class'main'
	              .classed("main", d=>{
 	              	return d.lx == '00';
 	              })
 	              .on("mouseenter",d=>{
              		// selectData = d;
              		inqq(d)
	              })
	              .on("mouseleave",d=>{
              		outqq(d)
	              })
	              .call(drag)

	//单个节点中装备类型图片
    var node1 = singlegroup.append('image')
 	              .attr("width",d=>{
 	              	return d.lx == '00'?equipUrl[d.lx].width:'50';
 	              }).attr("height",d=>{
 	              	return d.lx == '00'?equipUrl[d.lx].height:'50';
 	              })
 	              
 	              .attr('xlink:href', function(d) {
 					return equipUrl[d.lx].url;
				  })
    //单个节点中装备背景
	var node = singlegroup.append('image')

	              .attr("width",d=>{
	              	return picUrl[d.type].width/2;
	              })
	              .attr('class',d=>{
	              	return d.type=='00'?'aircraft':'equip';
	              })
	              .attr('xlink:href', function(d) {
					return picUrl[d.type].url;
					  })

	              
    //节点名称
	var nodetext = nodegroup.selectAll('text')
				  .data(nodes)
				  .enter().append('text')
				  .text(d=>{
				  	return d.name;
				  })
	
	//给节点添加title
	node.append('title')
	    .text(function(d) { return d.name; });

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
				return d.type=='00'?d.x - picUrl[d.type].width/4:d.x - picUrl[d.type].width/4;
			})
			.attr('y', function(d) {
				return d.type=='00'?d.y - picUrl[d.type].height/4:d.y - picUrl[d.type].height/4;
			})
		node1.attr('x', function(d) {
				return d.x - equipUrl[d.lx].width/4;
			})
			.attr('y', function(d) {
				return d.y - 30;
			})
		//更新节点文字位置
		nodetext.attr('x',d=>{
				return d.x - (d.name.length)*6/2;
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
	          	let name = d3.select(this).text();
				let code = d3.select(this).attr('code');
	          	console.log(scope.showDz)
	          	if(scope.showDz){
	          		
	          	}else{
	      		  // tempData = getTempData(tempData);
	              tempNode = getTempNode();
	              // d = tempData;
	             
	          	}

	            d3.event.sourceEvent.stopPropagation();
	          })
	          .on("drag", function(d) {
	          	if(scope.showDz){

	          	}else{

	              var newNode = tempNode._groups[0][0];

	              // get coords of mouseEvent relative to svg container to allow for panning
	              relCoords = d3.mouse($('svg').get(0));
	              let x = relCoords[0];
	              let y = relCoords[1];
	          	  // console.log(x,y)

	              var node = d3.select(newNode);

	              // node.attr("transform","translate("+x+","+y+")");
	              // node.attr("x", x).attr('y',y);

	          	}
	          })
	          .on("end", function(d) {
	          	  if(scope.showDz){
		          		let position = mainmap.position;
		          		let data = [{
					          name:'北京市',
					          population:'11',
					          lx:'0',//图片类型
					          zy:'0',//阵营
					          lon:parseFloat(position[0]),
					          lat:parseFloat(position[1]) 
					       }
					     ]
		          		mainmap.drawStatic(data);
	          	  }else{
		              //判断最后是否在场景中且移动到某个节点中否则删除
		              let width = $('svg').width();
		              let height = $('svg').height();
		              var newNode = tempNode._groups[0][0];
		              if(relCoords[0]>0 && relCoords[1]>0 && relCoords[0]<width && relCoords[1]<height && selectData!==null){
		              	// selectData
		              	// drawforce(id,node,link,scope);//更新d3画图
		              	alert('拖进去了')
		              }else{
		              	d3.select(newNode).remove()
		              }
	          	  }
	          	  selectData = null;
	          }));
	  },200)
	}
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
	      		.attr("width",d=>{
	              	return picUrl[d.type].width/2;
	            })
	        	.attr('xlink:href',d=>{
	            	return 'static/image/equipbox.png'
	        	})
	      return node;
	}
	eventdrag();
}

