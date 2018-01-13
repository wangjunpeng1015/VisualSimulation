<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
export default {
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
  	>div{
  		height: 100%;
  	}
  }
</style>
