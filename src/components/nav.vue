<template>
	<nav class="nav-box">
		<div class="nav-head">
			<h3 class="title">{{title}}</h3>
		</div>
    	<ul class="nav-containt layout-column">
    		<li v-for="item in menus" @click="chooseMenu(item.name)">
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
		chooseMenu(name){
			this.$emit('choosemenu',name);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.nav-box{
		position: fixed;
		left: 3%;
		top: 10%;
		width:246px;
	}
	/* nav，表格样式 */
	.nav-box,.grid-box{
	  .nav-head{
	    display:flex;
	    align-items: flex-end;
	    justify-content: center;
	    height:82px;
	    padding-bottom: 10px;
	    background:url('../assets/image/nav/顶部.png') no-repeat;
	    .title{
	      font-size:18px;
	      width:100%;
	      margin: 0 8px;
	      height:42px;
	      line-height: 42px;
	      background:url('../assets/image/nav/title.png') no-repeat;
	      &:before{
	        content:'';
	          margin: 0 10px;
	        vertical-align:middle;
	        display:inline-block;
	        width:31px;
	        height:31px;
	        background:url('../assets/image/nav/titleIcon.png') no-repeat;
	      }
	    }
	  }
	  .nav-containt{
	    padding:5px 0;
	    align-items: center;
	    background:url('../assets/image/nav/中间.png') repeat-y;
	    li{
	      cursor:pointer;
	      width:206px;
	      height:67px;
	      margin:5px 0;
	      line-height:67px;
	      font-size:18px;
	      display:flex;
	        align-items: center;
	      background:url('../assets/image/nav/button.png') no-repeat;
	      p{
	        font-size:18px;
	        display:inline-block;
	        width:100%;
	        text-align:center;
	      }
	      &:before{
	          padding: 0 10px;
	          margin-left: 30px;
	        content:'';
	          width: 25px;
	          height: 21px;
	          display: inline-block;
	        background:url('../assets/image/nav/icon.png') no-repeat;
	      }
	    }
	  }
	  &:after{
	    content:'';
	    display: inline-block;
	    width: 100%;
	    height:26px;
	    background:url('../assets/image/nav/底部.png') no-repeat;
	  }
	}
</style>
