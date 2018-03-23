<template>
  <div class="scene layout-row">
    <!-- 左 -->
    <div class="containbox flex-20">
      <div>
        <div class="contain-head layout-row" style="align-items:center;justify-content: space-between;">
          <h3>场景模型列表</h3>
          <Button class="btn" @click="addScene"><Icon type="plus-round"></Icon></Button>
          <Button class="btn" @click="deleteScene"><Icon type="minus-round"></Icon></Button>
          <Select v-model="scene.Id" filterable @on-change='sceneChange' style="width:150px">
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
            <Button class="btn" @click="save">保存</Button>
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
      //场景options
      scenes:[],
      //场景所有信息
      scenesData:[],
      paramsData:{},
      /*当前场景*/
      scene:{},
      /*场景树*/
      sceneTree: [],
      mxTree:[],
      //d3数据
      carryNodes: [],
      //创建新场景数据
      newSceneData:{
        "Targets": []
      },
      isadd:false
    }
  },
  computed:{
    sceneData:function(){
      let data=[];
      for(let i=0;i<this.scenesData.length;i++){
        if(this.scenesData[i].Id == this.scene.Id){
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
      this.drawForce([]);
    },    
    drawForce(data){
      let nodes=[];
      //转为d3force需要数据
      function changechild(data){
        data.forEach(item=>{
          nodes.push(item);
          if(item['搭载模型']){
            changechild(item['搭载模型']);
          }
        })
      }
      function changeRoot(data){
        data.forEach(item=>{
          item.isRoot = true;
          nodes.push(item);
          if(item['搭载模型']){
            changechild(item['搭载模型']);
          }
        })
      }
      changeRoot(data);
      this.carryNodes = nodes;
      drawforce('d3box',this.carryNodes,this);
    },
    //场景切换
    sceneChange(id){
      //场景树
      let newTree = (array)=>{
        let data = [];
        array.forEach(item=>{
          let nodes={};
          nodes.title = item['名称'];
          nodes.expand = true;
          if(item['搭载模型'] && item['搭载模型'].length>0){
            nodes.children = newTree(item['搭载模型']);
          }
          data.push(nodes);
        })
        return data;
      }
      for(let i=0;i<this.scenesData.length;i++){
        let node=this.scenesData[i]
        if(node.Id == this.scene.Id && node.Targets.length>0){
          this.scene = node;
          this.sceneTree = newTree(node.Targets);
          //渲染d3图
          this.drawForce(node.Targets)
          break;
        }else{
          this.sceneTree = [];
        }
      }
    },
    //获取全部场景信息
    getAllscene(){
      this.$http.get('/Scenes/GetScenes').then(res=>{
        this.scenesData = res.data;
        //转换为下拉框格式
        let data = [];
        this.scenesData.forEach(item=>{
          data.push({
            "label":item.Name,
            "value":item.Id
          })
        })
        //选中最新场景
        this.$set(this,'scenes',data);
        if(data.length>0){
          this.scene.Id = data[data.length-1].value;
        }
      },err=>{
        this.$Notice.error({desc: '获取全部场景失败！'});
      })
    },
    //获取模型库数据
    getmxTree(){
      this.$http.get('/Template/GetTree').then(res=>{
        this.mxTree = res.data;
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
            this.showDz = true;
            this.isadd = true;
            this.newSceneData.name = name
            this.drawForce(this.newSceneData.Targets);
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
                          blur: (val) => {
                            name = val.currentTarget.value;
                          }
                      }
                  })
                ]);
          }
      })
    },
    //删除场景
    deleteScene(){
      this.$http.post(`/Scenes/DeleteScene/${this.scene.Id}`).then(res=>{
        this.getAllscene();
        this.$Notice.success({desc: `删除场景${this.scene.Name}成功！`});
      },err=>{
        this.$Notice.error({desc: `删除场景${this.scene.Name}失败！`});
      })
    },
    //保存场景信息
    save(){
      let tempdata;
      if(!this.isadd){//修改
        tempdata = this.scene;
      }else{//新增
        this.newSceneData = Object.assign(this.newSceneData,{
          "CreateTime": moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        tempdata = this.newSceneData;
      }
      let target = _.cloneDeep(this.carryNodes);
      tempdata.Targets = [];
      tempdata.CreateTime = moment(tempdata.CreateTime).format('YYYY-MM-DD HH:mm:ss');
      let temp=[];
      for(let i=0;i<target.length;i++){
        delete target[i].index;
        delete target[i].vx;
        delete target[i].vy;
        delete target[i].x;
        delete target[i].y;
        delete target[i].fx;
        delete target[i].fy;
        delete target[i].isRoot;
        if(i>0){
          temp.push(target[i]);
        }else{
          tempdata.Targets.push(target[i]);
         tempdata.Targets[0]['搭载模型'] = temp;
        }
      }
      debugger
      this.$http.post('/Scenes/PostScene',tempdata).then(res=>{
        this.getAllscene();
        this.isadd = false;
        this.$Notice.success({desc: '保存成功！'});
      },err=>{
        this.isadd = false;
        this.$Notice.error({desc: '保存失败！'});
      })
    },
    //获取模型配置参数
    getParam(code,position=[0,0]){
      //展开搭载
      this.showDz = false;
      this.$http.get(`/Template/GetModelByCode?code=${code}`).then(res=>{
        //装备国家，敌我属性
        let zbgjs = res.data['装备国家'];
        for (let i=2;i<zbgjs.length+1;i+=2) {
          this.param.zbgj.push(zbgjs.substr(0,i));
        }
        // res.data['当前位置'] = `纬度: ${position[1]}, 经度: ${position[0]}`
        // res.data['部署位置'] = `纬度: ${position[1]}, 经度: ${position[0]}`
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
