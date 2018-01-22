<template>
  <div class="equipment">
    <heade title="可视化仿真模拟软件"></heade>
      <!-- nav导航 -->
    <menus title="平台功能区" @choosemenu="chooseMenu" :menus="navs"></menus>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /*nav导航数据*/
      navs:[
        {name:'场景',icon:''},
        {name:'目标',icon:''},
        {name:'平台',icon:''},
        {name:'航线',icon:''},
        {name:'规则配置',icon:''}
      ]
    }
  },
  props:['title'],
  mounted(){
    
  },
  methods:{
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
