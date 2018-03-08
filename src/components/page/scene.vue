<template>
  <div class="scene layout-row">
    <!-- 左 -->
    <div class="containbox flex-20">
      <div>
        <div class="contain-head layout-row" style="align-items:center;justify-content: space-between;">
          <h3>场景模型列表</h3>
          <Select v-model="scene" filterable style="width:150px">
            <Option v-for="item in scenes" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
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
    <div class="containbox flex-58">
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
          <Tree class="flex layout-column" v-dragTree:data='mxTree' :data="mxTree"></Tree>
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
        label:'场景1',
        value:'scen1'
      },{
        label:'场景2',
        value:'scen2'
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
      mxTree:[
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
      //当前点击树节点数据
      sceneChoose:[]
    }
  },
  mounted(){
    this.drawForce();
  },
  methods:{
    drawForce(){
      drawforce('d3box');
    },
    sceneChange(data){
      this.sceneChoose = data;
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
  }
</style>
