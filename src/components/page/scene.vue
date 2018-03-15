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
        <div class="contain-head layout-row" style="justify-content: space-between;align-items:center;">
          <h3>场景搭载</h3>
          <div class="buttons">
            <Button class="btn" @click="save">保存</Button>
          </div>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex-60 layout-column">
          <div class="title">群、搭载关系</div>
          <div id="d3box" class="flex"></div>
          
        </div>
        <div class="flex layout-column">
          <div class="title">参数设置</div>
          <div class="flex layout-column">
            <table class="wjptable">
              <tr>
                <td>装备国家</td>
                <td><Cascader :data="$baseData" trigger="hover" v-model="zbgj"></Cascader></td>
              </tr>
              <tr>
                <td>敌我属性</td>
                <td>
                  <Select v-model="dwsx">
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
      dwsxs:[{
        value: 0,
        label: '敌方'
      },{
        value: 1,
        label: '我方'
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
      paramsData:{},
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
      //d3数据
      carryNodes: [],
    }
  },
  computed:{
    contrys(){
      return this.$baseData;
    }
  },
  mounted(){
      this.init();
      this.getParam();
  },
  methods:{
    init(){
      this.getmxTree();
    },
    drawForce(){
      drawforce('d3box',this.carryNodes,this);
    },
    //场景切换
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
      this.drawForce();
      this.$http.get('/Template/GetTree').then(res=>{
        this.mxTree = res.data;
        this.drawForce();
      },err=>{

        this.$Notice.error({desc: '获取模型库失败！'});
      })
    },
    //添加场景
    addScene(data){
      this.$Modal.confirm({
          title: '添加场景',
          onOk:(val)=>{
            //展开搭载
            this.showDz = false;
            // let nodes = Object.assign(nodes,data);
            // this.$http.post('/Scenes/PostScene',data).then(res=>{

            // },err=>{

            // })
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
                              this.newSceneData.name = val.data;
                          }
                      }
                  })
                ]);
          }
      })
    },
    //获取模型配置参数
    getParam(code){
      code = '02010101';
      this.$http.get(`/Template/GetModelByCode?code=${code}`).then(res=>{
        //装备国家，敌我属性
        this.zbgj = res.data['装备国家'];
        this.dwsx = res.data['敌我属性'];
        delete res.data['装备国家'];
        delete res.data['敌我属性'];
        this.paramsData = res.data;
      },err=>{

      })
    },
    //保存
    save(){
      this.$http.post('').then(res=>{

      },err=>{

      })
    }
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
      height:100%;
      position:fixed;
      top:140px;
      padding-bottom: 140px;
      transition:all 1s linear;
    }
  }
</style>
