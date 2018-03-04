<template>
  <div class="rwgh layout-row">
    <!-- 左 -->
    <div class="containbox flex-20">
      <div>
        <div class="contain-head layout-row">
          <h3>场景模型列表</h3>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex">
          <Tree @on-select-change="sceneChange" :data="sceneTree"></Tree>
        </div>
      </div>
    </div>
    <!-- 中 -->
    <div class="containbox flex-58">
      <div>
        <div class="contain-head layout-row">
          <h3>场景编辑</h3>
          <div class="func flex" style="justify-content: flex-end;">
            <div class="buttons">
              <Button class="btn" :class="{'del':choose}" @click="create(gridSelected)">新建规则</Button>
              <Button class="btn" :class="{'del':choose}" @click="remove(gridSelected)">删除规则</Button>
              <Button class="btn" :class="{'del':choose}" @click="save(gridSelected)">保存规则</Button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex">
          <div>
            <div class="layout-row">
              <div class="title">条件编辑</div>
              <div class="func flex">
                <div class="buttons">
                   <Button title="添加条件" class="btn" @click="addct"><Icon type="plus-round"></Icon></Button>
                </div>
              </div>
            </div>
            <!-- 编辑内容 -->
            <div>
              <div class="editlist" v-for='(item,index) in conditions'>
                <Checkbox v-model="ctcheck[index]"></Checkbox>
                <Select v-model="conditions[index].condition1">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="conditions[index].condition2">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="conditions[index].condition3">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="conditions[index].condition4">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button title="删除条件" class="btn" @click="ctremove(index)"><Icon type="minus-round"></Icon></Button>
              </div>
            </div>
          </div>
          <div>
            <div class="layout-row">
              <div class="title">动作编辑</div>
              <div class="func flex">
                <div class="buttons">
                   <Button title="添加条件" class="btn" @click="addaction"><Icon type="plus-round"></Icon></Button>
                </div>
              </div>
            </div>
            <!-- 编辑内容 -->
            <div>
              <div class="editlist" v-for='(item,index) in actions'>
                <Checkbox v-model="actioncheck[index]"></Checkbox>
                <Select v-model="actions[index].action1">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="actions[index].action2">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="actions[index].action3">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="actions[index].action4">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button class="btn" @click="actionRemove(index)"><Icon type="minus-round"></Icon></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div class="containbox flex-20">
      <div>
        <div class="contain-head layout-row">
          <h3>任务规则库</h3>
        </div>
      </div>
      <div class="flex container layout-column">
        <div class="flex">
          <Tree @on-select-change="rwgzChange" :data="rwgzTree"></Tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      //场景树
      sceneTree:[{
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
      //任务规则库树
      rwgzTree:[{
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
      //判断按钮状态
      choose:'',
      ctcheck:[],//条件编辑复选框
      conditions:[{
        condition1:'',
        condition2:'',
        condition3:'',
        condition4:''
      }],
      actioncheck:[],//动作编辑复选框
      actions:[{
        action1:'',
        action2:'',
        action3:'',
        action4:''
      }],
      cityList: [
          {
              value: 'New York',
              label: 'New York'
          },
          {
              value: 'London',
              label: 'London'
          },
          {
              value: 'Sydney',
              label: 'Sydney'
          },
          {
              value: 'Ottawa',
              label: 'Ottawa'
          },
          {
              value: 'Paris',
              label: 'Paris'
          },
          {
              value: 'Canberra',
              label: 'Canberra'
          }
      ],
    }
  },
  mounted(){
   window.qq = this;
  },
  methods:{
   sceneChange(){

   },
   rwgzChange(){

   },
   //添加条件
   addct(){
    this.conditions.push({
      condition1:'',
      condition2:'',
      condition3:'',
      condition4:''
    });
   },
   addaction(){
    this.actions.push({
      action1:'',
      action2:'',
      action3:'',
      action4:''
    });
   },
   //删除条件
   ctremove(index){
    this.conditions.splice(index,1);
   },
   actionRemove(index){
    this.actions.splice(index,1);
   }
  }
}
</script>
<!--
   '<<<' 一般为scoped深度作用或'/deep/'
   转化为：  .a[data-v-f3f3eg9] .b
-->
<style lang="scss" scoped>
  .rwgh{
    justify-content: space-between;
    .ivu-select.ivu-select-single{
      width:20%;
    }
    .container .func{
      justify-content: flex-end;
    }
    .editlist{
      margin-left:20px;
      padding:2px 0;
      >*{
        margin-right:10px;
      }
      &:nth-child(odd){
        background-color:rgba(50,78,78,.5);
      }
      button{
        margin-top:-9px;
        
      }
    }
  }
</style>
