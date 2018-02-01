<template>
  <div class="header">
    <p class="title">{{title}}</p>
    <div class="userInfo layout-row">
      <p id="longlat">经纬度：<span></span></p>
      <Avatar class="icon" icon="person"/><!--用户图片列子 src="https://i.loli.net/2017/08/21/599a521472424.jpg" -->
      <Dropdown class="user" @on-click="dropmenu" placement="bottom-start">
        <a href="javascript:void(0)">
          {{username}}
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="usermanage">用户管理</DropdownItem>
          <DropdownItem name="usermanage">用户管理</DropdownItem>
          <DropdownItem name="usermanage">用户管理</DropdownItem>
          <DropdownItem name="usermanage">用户管理</DropdownItem>
          <DropdownItem name="usermanage">用户管理</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <span>{{time}}</span>
      <div class="layout-column">
        <span>星期{{week}}</span>
        <span>{{date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
let getTime;
export default {
  data () {
    return {
      // userName:'赵武',
      time:moment(new Date).format('HH:mm:ss'),
      week:'天',
      date:'2018/01/11',
    }
  },
  computed:{
    //将store中的变量映射到当前this避免每次写很长的$store.state.这种
    ...mapState(['username'])
  },
  props:['title'],
  mounted(){
    getTime = setInterval(()=>{
      this.showTime();
    },1000)
  },
  methods:{
    showTime(){
      this.time = moment(new Date).format('HH:mm:ss');
      this.week = '天一二三四五六'.charAt(new Date().getDay());
      this.date = moment(new Date).format('YYYY/MM/DD');
    },
    dropmenu(name){
      debugger
      this.$router.push('/'+name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @mixin fontColor($middle:40%,$end:60%) {
    background:-webkit-linear-gradient(top,#fff,#fff $middle,#81a7a7 $end,#115A5A);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .header{
    width:100%;
    height: 80px;
    position:fixed;
    top:0;
    z-index: 100;
    background:url(../assets/image/header/导航条.png) no-repeat 0 0/100% 100%;
    overflow:hidden;
    .title{
      @include fontColor;
      margin-top: 25px;
      font-size: 24px;
      font-weight: bold;
      text-align:center;
    }
    .userInfo{
      position:absolute;
      top:0;
      right:0;
      height: 58px;
      display: flex;
      align-items: center;
      .user{
        li{
          color:#fff;
        }
        a{
          color:#fff;
        }
      }
      >*:not(:first-child){
        margin-right: 10px;
      }
      >span:not(.icon){
        @include fontColor(60%,80%);
      }
      >div{
        text-align: center;
        span{
           @include fontColor(60%,80%);
        }
      }
    }
  }
</style>
