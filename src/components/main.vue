<template>
  <div class="">
   <menus title="平台功能区" @choosemenu="chooseMenu" :menus="menus"></menus>
   <!-- 表格 -->
   <div class="grid-box nav-box">
		<div class="nav-head">
			<h3 class="title">数据列表</h3>
		</div>
		<div class="nav-containt">
			<Table stripe :data="gridData" :columns="gridColumn"></Table>
		</div>

   </div>
   <!-- 时间轴 -->
   <div id="timeline"></div>
  </div>
</template>

<script>
import menus from '@/components/nav'
export default {
	components: {
		menus
	},
	data () {
		return {
			/*数据列表数据*/
			gridColumn:[
				{
                 title: '名称',
                 key: 'name'
             },
             {
                 title: '时间',
                 key: 'date'
             },
             {
                 title: '内容',
                 key: 'content'
             }
			],
			gridData:[
				{
               name: 'John Brown',
               age: 18,
               content: 'New York No. 1 Lake Park',
               date: '2016-10-03'
           },{
               name: 'Jim Green',
               age: 24,
               content: 'Ottawa No. 2 Lake Park',
               date: '2016-10-01'
           },{
               name: '内容',
               age: 24,
               content: '我是内容1',
               date: '2016-10-01'
           },
			],
			/*菜单数据*/
			menus:[
				{name:'场景',icon:''},
				{name:'目标',icon:''},
				{name:'平台',icon:''},
				{name:'航线',icon:''},
				{name:'规则配置',icon:''}
			]
		}
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
			this.initTimeLine();
		},
		/*选择菜单*/
		chooseMenu(name){
		},
		/*时间轴初始化*/
		initTimeLine(){
			let container = document.getElementById('timeline');
		  	// Create a DataSet (allows two way data-binding)
			let items = new vis.DataSet([
				{id: 1, content: 'item 1', start: '2013-04-20'},
				{id: 2, content: 'item 2', start: '2013-04-14'},
				{id: 3, content: 'item 3', start: '2013-04-18'},
				{id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
				{id: 5, content: 'item 5', start: '2013-04-25'},
				{id: 6, content: 'item 6', start: '2013-04-27'}
			]);
		  	// Configuration for the Timeline
			let options = {};
			// Create a Timeline
			let timeline = new vis.Timeline(container, items, options);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.grid-box{
		width: 
	}
	#timeline{
		position: fixed;
	    width: 100%;
	    bottom: 0;
	}
	.grid-box{
		position:fixed;
		right:3%;
		top:11%;
	}
</style>
