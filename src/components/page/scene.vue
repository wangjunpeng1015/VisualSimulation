<template>
  <div class="scene layout-row">
    <!-- 左 -->
    <div class="containbox flex-20">
      <div>
        <div class="contain-head layout-row" style="align-items:center;justify-content: space-between;">
          <h3>场景模型列表</h3>
          <Button class="btn" @click="addScene"><Icon type="plus-round"></Icon></Button>
          <Select v-model="scene" filterable style="width:150px">
            <Option v-for="item in scenes" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          <Cascader :data="contrys" trigger="hover"></Cascader>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex">
          <Tree @on-select-change="sceneChange" :data="sceneTree"></Tree>
        </div>
        <div>
          <Table class="flex layout-column" :show-header='false' stripe :columns="sceneCol" :data="sceneData"></Table>
        </div>
      </div>
    </div>
    <!-- 中 -->
    <div class="containbox flex-58" :style="{top:showDz?'100%':''}">
      <div>
        <div class="contain-head">
          <h3>场景搭载</h3>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex-65 layout-column">
          <div class="title">群、搭载关系</div>
          <div id="d3box" class="flex"></div>
        </div>
        <div class="flex layout-column">
          <div class="title">参数设置</div>
          <div class="flex layout-column">
            <Table class="flex layout-column" :show-header='false' stripe :columns="paramsCol" :data="paramsData"></Table>
          </div>
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div class="containbox flex-20">
      <div class="contain-head">
        <h3>模型库</h3>
      </div>
      <div class="flex container layout-column">
        <div class="flex">
          <!-- <mytree v-for="menuItem in mxTree" :model="menuItem"></mytree> -->
          <Tree class="flex layout-column" v-dragTree="showDz" :data="mxTree"></Tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {drawforce} from '@/assets/js/d3.force.js'
import mytree from '@/components/mytree'
export default {
  components: {
    mytree
  },
  data () {
    return {
      //显示搭载框
      showDz:false,
      /*场景信息*/
      sceneCol:[
        {
            title: '',
            sortable: true,
            key: 'key'
        },
        {
            title: '',
            sortable: true,
            key: 'value'
        }
      ],
      sceneData:[
        {
            key: '场景编号',
            value: 1,
        },
        {
            key: '场景名称',
            value: '航母群',
        },{
            key: '创建时间',
            value: '2018/01/05',
        },{
            key: '修改时间',
            value: '2018/01/05',
        }
      ],
      /*参数配置*/
      paramsCol:[
        {
            title: '',
            sortable: true,
            key: 'key'
        },
        {
            title: '',
            sortable: true,
            key: 'value'
        }
      ],
      paramsData:[
        {
            key: '编号',
            value: 1,
        },
        {
            key: '名称',
            value: '航母群',
        },{
            key: '颜色',
            value: '2018/01/05',
        },{
            key: '图标',
            value: '2018/01/05',
        },{
            key: '侦察装备类型',
            value: '2018/01/05',
        },{
            key: '侦察装备',
            value: '2018/01/05',
        }
      ],
      /*场景*/
      scene:'',
      scenes:[{
        label:'中国',
        value:'01'
      },{
        label:'美国',
        value:'02'
      }],
      /*场景树*/
      sceneTree: [
      {
          title: 'parent 1',
          expand: true,
          children: [
              {
                  title: 'child 1-1',
                  expand: true,
                  children: [
                      {
                          title: 'leaf 1-1-1',
                          expand: true
                      },
                      {
                          title: 'leaf 1-1-2',
                          expand: true
                      }
                  ]
              },
              {
                  title: 'child 1-2',
                  expand: true,
              }
          ]
      }],
      mxTree:[],
      //当前点击树节点数据
      sceneChoose:[],
      contry:''
    }
  },
  computed:{
    contrys(){
      return this.$baseData;
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.drawForce();
      this.getmxTree();
    },
    drawForce(){
      drawforce('d3box');
    },
    sceneChange(data){
      this.sceneChoose = data;
    },
    //获取模型库数据
    getmxTree(){
      this.mxTree = [{
          title: 'parent 1',
          expand: true,
          children: [
              {
                  title: 'child 1-1',
                  expand: true,
                  children: [
                      {
                          title: 'leaf 1-1-1',
                          expand: true
                      },
                      {
                          title: 'leaf 1-1-2',
                          expand: true
                      }
                  ]
              },
              {
                  title: 'child 1-2',
                  expand: true,
              }
          ]
      }]
      this.$http.get('/Template/GetTree').then(res=>{
        this.mxTree = res.data;
      },err=>{

        this.$Notice.error({desc: '获取模型库失败！'});
      })
    },
    //添加场景
    addScene(){
      this.showDz = true;
    },
  }
}
</script>
<!--
   '<<<' 一般为scoped深度作用或'/deep/'
   转化为：  .a[data-v-f3f3eg9] .b
-->
<style lang="scss" scoped>
  .scene{
    justify-content: space-between;
    >:nth-child(1){
      width:20%;
      left:40px;
    }
    >:nth-child(2){
      width:calc(58% - 80px);
      left:calc(21% + 40px);
    }
    >:nth-child(3){
      width:20%;
      right:40px;
    }
    .containbox{
      position:fixed;
      top:140px;
      padding-bottom: 140px;
      transition:all 1s linear;
    }
  }
</style>
