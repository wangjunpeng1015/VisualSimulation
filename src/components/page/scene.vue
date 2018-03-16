<template>
  <div class="scene layout-row">
    <!-- 左 -->
    <div class="containbox flex-20">
      <div>
        <div class="contain-head layout-row" style="align-items:center;justify-content: space-between;">
          <h3>场景模型列表</h3>
          <Button class="btn" @click="showDz = true"><Icon type="plus-round"></Icon></Button>
          <Select v-model="scene" filterable style="width:150px">
            <Option v-for="item in scenes" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex">
          <Tree :data="sceneTree"></Tree>
        </div>
        <div>
          <Table class="flex layout-column" :show-header='false' stripe :columns="sceneCol" :data="sceneData"></Table>
        </div>
      </div>
    </div>
    <!-- 中 -->
    <div class="containbox flex-58" :style="{top:showDz?'100%':''}">
      <div>
        <div class="contain-head layout-row" style="justify-content: space-between;align-items:center;">
          <h3>场景搭载</h3>
          <div class="buttons">
            <Button class="btn" @click="addScene">保存</Button>
          </div>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex-60 layout-column">
          <div class="title">群、搭载关系</div>
          <div id="d3box" class="flex"></div>
        </div>
        <div class="flex layout-column" style="overflow-y: auto;">
          <div class="title">参数设置</div>
          <div class="flex layout-column">
            <table class="wjptable">
              <tr>
                <td>装备国家</td>
                <td><Cascader :data="$contrys" trigger="hover" v-model="param.zbgj"></Cascader></td>
              </tr>
              <tr>
                <td>敌我属性</td>
                <td>
                  <Select v-model="param.dwsx">
                    <Option v-for="item in dwsxs" :value="item.value" :key="item.label">{{ item.label }}</Option>
                  </Select>
                </td>
              </tr>
              <tr v-for="(value,key) in paramsData">
                <td>{{key}}</td>
                <td>{{value}} </td>
              </tr>
            </table>
            <!-- <Table class="flex layout-column" :show-header='false' stripe :columns="paramsCol" :data="paramsData"></Table> -->
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
          <mytree class="flex layout-column" :other="showDz" v-for="menuItem in mxTree" :model="menuItem"></mytree>
          <!-- <Tree class="flex layout-column" v-dragTree="showDz" :data="mxTree"></Tree> -->
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
      param:{
        zbgj:[],
        dwsx:''
      },
      dwsxs:[{
        value: '蓝方',
        label: '蓝方'
      },{
        value: '红方',
        label: '红方'
      }],
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
      //场景所有信息
      scenesData:[],
      paramsData:{},
      /*当前场景*/
      scene:'',
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
      //d3数据
      carryNodes: [],
      //创建新场景返回数据
      newSceneData:{}
    }
  },
  computed:{
    scenes:function(){
      let data = [];
      this.scenesData.forEach(item=>{
        data.push({
          "label":item.Name,
          "value":item.Id
        })
      })
      return data;
    },
    sceneData:function(){
      let data=[];
      for(let i=0;i<this.scenesData.length;i++){
        if(this.scenesData[i].Id == this.scene){
          data=[{
                "key": '场景编号',
                "value": this.scenesData[i].Id,
            },
            {
                "key": '场景名称',
                "value": this.scenesData[i].Name,
            },{
                "key": '创建时间',
                "value": moment(this.scenesData[i].CreateTime).format('YYYY-MM-DD HH:mm:ss'),
          }]
          break;
        }
      }
      return data;
    }
  },
  mounted(){
      this.init();
  },
  methods:{
    init(){
      //获取模型树
      this.getmxTree();
      //获取场景树
      this.getAllscene();
    },
    drawForce(){
      drawforce('d3box',this.carryNodes,this);
    },
    //场景切换
    sceneChange(data){
      debugger
      this.$http.get(`/Scenes/GetScene/${id}`).then(res=>{
        this.sceneTree = res.data;
      },err=>{
        this.$Notice.error({desc: '获取场景失败！'});
      })
    },
    //获取全部场景信息
    getAllscene(){
      this.$http.get('/Scenes/GetScenes').then(res=>{
        this.scenesData = res.data;
      },err=>{
        this.$Notice.error({desc: '获取全部场景失败！'});
      })
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
      // this.drawForce();
      this.$http.get('/Template/GetTree').then(res=>{
        this.mxTree = res.data;
        this.drawForce();
      },err=>{

        this.$Notice.error({desc: '获取模型库失败！'});
      })
    },
    //新建保存场景
    addScene(data){
      let name = '';
      this.$Modal.confirm({
          title: '添加场景',
          onOk:(val)=>{
            let data = {
              "Name": name,
              "CreateTime": moment().format('YYYY-MM-DD HH:mm:ss'),
              "Target": null
            }
            debugger
            this.$http.post('/Scenes/PostScene',data).then(res=>{
              this.newSceneData = res.data;
              //todo
              //更新场景，选中新建场景
            },err=>{

            })
          },
          render: (h) => {
            return h('div', [
                    h('label', {

                    }, '场景名称：'),
                  h('Input', {
                      props: {
                          autofocus: true,
                          placeholder: '请输入场景名称'
                      },
                      class:'re-input',
                      on: {
                          input: (val) => {
                            name = val.data;
                          }
                      }
                  })
                ]);
          }
      })
    },
    //获取模型配置参数
    getParam(code,position){
      //展开搭载
      this.showDz = false;
      this.$http.get(`/Template/GetModelByCode?code=${code}`).then(res=>{
        //装备国家，敌我属性
        let zbgjs = res.data['装备国家'];
        for (let i=2;i<zbgjs.length+1;i+=2) {
          this.param.zbgj.push(zbgjs.substr(0,i));
        }
        res.data['当前位置'] = `纬度: ${position[1]}, 经度: ${position[0]}`
        res.data['部署位置'] = `纬度: ${position[1]}, 经度: ${position[0]}`
        this.param.dwsx = res.data['敌我属性'];
        //删除需要修改的属性
        delete res.data['装备国家'];
        delete res.data['敌我属性'];
        this.paramsData = res.data;
      },err=>{

      })
    },
  }
}
</script>
<!--
   '<<<' 一般为scoped深度作用或'/deep/'
   转化为：  .a[data-v-f3f3eg9] .b
-->
<style lang="scss">
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
      height:100%;
      position:fixed;
      top:140px;
      padding-bottom: 140px;
      transition:all 1s linear;
    }
    table{
      .ivu-select,.ivu-select-selection,.ivu-select-placeholder,.ivu-input-wrapper,.ivu-select-selected-value,input{
        height: 25px !important;
        line-height:25px !important;
      }
      tr{
        height: 25px;
        td{
          width: 50%;
          text-align: center;
        }
        &:nth-child(2n){
          background-color: rgba(33,55,55,.5);
        }
      }
    }
  }
</style>
