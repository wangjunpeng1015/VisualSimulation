<template>
  <div id="app" v-cloak>
    <heade title="精细化战场电磁态势仿真"></heade>
    <router-view/>
    <!-- 地球 -->
    <div id="map"></div>
  </div>
</template>

<script>
import maps from '../static/mapConfig'
import heade from '@/components/header'
export default {
  components: {
    heade
  },
  beforeCreate(){
    
  },
  created(){

  },
  mounted(){
    window.mainmap = maps.initMap('map');
    // this.init();
    // this.initmap();
  },
  methods:{
    initmap(){
    }
  }
}
</script>

<style lang="scss">
  html,body,#app{
    width: 100%;
    height: 100%;
    overflow:hidden;
  }
  [v-cloak] {
    display: none;
  }
  #app{
    background-color:black;
    // background:url('assets/image/banner.png') no-repeat 0 0/100% 100%;
  	>div:nth-child(2){
        position: relative;
        z-index: 99;
        &:not(.main):not(.login){
          height:100%;
          padding:130px 40px 20px 40px;
        }
      }
  }
  #map{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    .ol-overlaycontainer-stopevent{
      .ol-attribution, .ol-zoom{
        display:none;
      }
    }
    .custom-mouse-position{
      top: 8px;
      right: 20%;
      position: absolute;
    }
  }
</style>
