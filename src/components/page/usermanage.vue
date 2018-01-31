<template>
  <div class="usermanage layout-column">
    <div class="containbox flex">
      <div class="contain-head">
        <h3>用户管理</h3>
      </div>
      <div class="container layout-column">
        <div class="search">
          <div class="title">系统用户</div>
          <div class="func">
            <div class="inputs">
              <Input v-model="username" style="width:250px" placeholder="请输入用户名"></Input>
            </div>
            <div class="buttons">
              <!-- <Button class="btn" @click="search">查 询</Button> -->
            </div>
          </div>
        </div>
        <div class="container-box flex layout-column">
          <Table class="flex layout-column" stripe :columns="gridCol" :data="filtergridData"></Table>
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
        gridCol:[
          {
              type: 'selection',
              width: 60,
              align: 'center'
          },
          {
              title: '用户名',
              sortable: true,
              key: 'name'
          },
          {
              title: '部门',
              sortable: true,
              key: 'name'
          },
          {
              title: '手机号',
              sortable: true,
              key: 'age'
          },
          {
              title: '性别',
              sortable: true,
              key: 'address'
          },
          {
              title: '上次操作时间',
              sortable: true,
              key: ''
          }
        ],
        gridData:[
          {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
          },
          {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
          },{
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
          },{
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
          },{
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
          },{
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
          },{
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
          },
        ],
        username:''
      }
    },
    computed:{
      filtergridData(){
        let ins = this;
        if(ins.username){
          return ins.gridData.filter(item=>{
            return item.name.includes(ins.username);
          })
        }
        return ins.gridData;
      }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style lang="scss">
  .usermanage{
  
  }
  .containbox{
    .container{
    }
  }
</style>
