<template>
  <div class="">
    <heade title="可视化仿真模拟软件"></heade>
    <!-- 时间轴 -->
    <div id="timeline"></div>
     <p>{{message}}</p>
        <!-- 直接在模板中绑定表达式 -->
        <p>{{message.split('').reverse().join('')}}</p>

        <!-- //运用计算属性 -->
        <p>{{reverseMessage}}</p>

        <!-- //运用methods方式 -->
        <p>{{methodMessage()}}</p>
  </div>
</template>

<script>
import heade from '@/components/header'
export default {
	components: {
		heade
	},
	data () {
		return {
			 message:"hello"
		}
	},
	computed:{
	   reverseMessage:function(){
	       return this.message.split('').reverse().join('');
	   }
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
			this.initTimeLine();
		},
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
		},
		 methodMessage:function () {
                    return this.message.split('').reverse().join('');
                }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
