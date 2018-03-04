<template>
	<div class="menu layout-row">
	   	<div class="menu-list">
		   	<div v-show='showmenu' class="list layout-row" @click="chooseMenu(item.name,item.nm)" v-for="(item,index) in menus">
		   		<div>{{item.name}}</div>
		   	</div>
	   	</div>
	   	<div class="mainmenu" @click="showmenu = !showmenu"></div>
   </div>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {
			showmenu:true
		}
	},
	props:['menus'],
	mounted(){

	},
	methods:{
		chooseMenu(name,path){
			this.$emit('choosemenu',name);
			//跳转路由
			this.$router.push(path);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.menu{
		height:250px;//避免点击时超出高度抖动
		position: fixed;
		right: 3%;
		bottom: 0;
		.mainmenu{
			width: 192px;
			height: 196px;
			cursor:pointer;
			background: url('../assets/image/menu/主菜单.png');
		}
		.menu-list{
			>:nth-child(1),>:nth-child(3){
			    margin-right: -30px;
			}
			.list {
			    overflow: hidden;
				justify-content: flex-end;
				&:nth-child(1):after{
					width: 210px;
				}
				&:nth-child(2):after{
					width: 100px;
				}
				&:nth-child(3):after{
					width: 50px;
				}
				&:after{
					content: '';
					display: inline-block;
					height: 80px;
					background: url('../assets/image/menu/子菜单右.png');
				};
				>div{
					text-align:center;
				    padding-left: 45px;
					width: 216px;
					height: 80px;
					line-height: 80px;
					cursor:pointer;
					background: url('../assets/image/menu/子菜单左.png');
				}
			}
		}
	}
	
</style>
