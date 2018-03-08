<template>
	<nav class="nav-box">
		<div class="nav-head">
			<h3 class="title">{{title}}</h3>
		</div>
    	<ul class="nav-containt layout-column">
    		<li v-for="item in menus" @click="chooseNav(item.name,item.nm)">
    			<p>{{item.name}}</p>
    		</li>
    	</ul>
    </nav>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {
			
		}
	},
	props:['title','menus'],
	mounted(){

	},
	methods:{
		chooseNav(name,path){
			this.$emit('choosenav',name);
			//跳转路由
			this.$router.push(path);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.nav-box{
		position: fixed;
		left: 3%;
		top: 25%;
		width:246px;
	}
	
</style>
