<template>
  <div id="app" v-cloak>
    <heade title="精细化战场电磁态势仿真"></heade>
    <router-view/>
    <!-- 地球 -->
    <div id="map"></div>
  </div>
</template>

<script>
import heade from '@/components/header'
export default {
  components: {
    heade
  },
  name: 'app'
}
</script>

<style lang="scss">
  html,body,#app{
    width: 100%;
    height: 100%;
  }
  [v-cloak] {
    display: none;
  }
  #app{
    background:url('assets/image/banner.png') no-repeat 0 0/100% 100%;
  	>div:not(.header){
  		height: 100%;
  	}
  }
</style>
