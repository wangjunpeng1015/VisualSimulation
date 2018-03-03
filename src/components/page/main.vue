<template>
  <div class="main">
  	<!-- nav导航 -->
   <menus v-drag title="平台功能区" @choosenav="chooseNav" :menus="navs"></menus>
   <!-- 数据列表 -->
   <div class="grid-box nav-box">
		<div class="grid-head nav-head">
			<h3 class="title">数据列表</h3>
		</div>
		<div class="grid-containt nav-containt">
			<Table stripe :data="gridData" :columns="gridColumn"></Table>
		</div>
   </div>
   <!-- 菜单栏 -->
   <menulist :menus='menuList' @choosemenu="chooseMenu"></menulist>
  </div>
</template>

<script>
import menus from '@/components/nav'
import menulist from '@/components/menu'
export default {
	components: {
		menus,
		menulist
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
	           }
			],
			/*nav导航数据*/
			navs:[
				{name:'模型管理',icon:''},
				{name:'任务规则',icon:''},
				{name:'航迹规划',icon:''},
				{name:'战技性能',icon:''}
			],
			/*右下角菜单数据*/
			menuList:[
				{name:'系统设置',nm:'zhts'},
				{name:'XX管理',nm:'rwcj'},
				{name:'基础数据库',nm:'jcsjk'}
			]
		}
	},
	created(){
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){

		},
		/*选择导航*/
		chooseNav(name){
			alert(name)
		},
		/*选择菜单*/
		chooseMenu(name){
			alert(name)
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
	.grid-box{
		position:fixed;
		right:3%;
		top:11%;
		width: 350px;
		.grid-head{
			background:url('../../assets/image/img/gridhead.png') no-repeat 0 0/100% 100%;
		}
		.grid-containt{
			padding: 5px 20px;
		}
	}
</style>
