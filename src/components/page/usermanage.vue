<template>
  <div class="usermanage layout-column">
    <div class="containbox flex">
      <div class="contain-head">
        <h3>用户管理</h3>
      </div>
      <div class="container layout-column">
        <div class="search layout-row">
          <div class="title">系统用户</div>
          <div class="func flex">
            <div class="inputs">
              <Input v-model="username" style="width:250px" placeholder="请输入用户名"></Input>
            </div>
            <div class="buttons">
              <Button class="btn" :class="{'del':choose}" @click="remove(gridSelected)">删除</Button>
            </div>
          </div>
        </div>
        <div class="container-box flex layout-column">
          <Table ref='table' class="flex layout-column" @on-selection-change="selectedGrid" stripe :columns="gridCol" :data="filtergridData"></Table>
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
              key: 'UserName'
          },
          {
              title: '部门',
              sortable: true,
              key: 'Department',
              width:'200'
          }, 
          {
              title: '权限',
              sortable: true,
              key: 'Role',
              width:'120',
              render: (h, params) => {
                  return h('div', [
                     h('span', {
                      }, params.row.Role=='0'?'管理员':params.row.Role=='1'?'普通用户':'开发人员')
                  ]);
              }
          },
          {
              title: '手机号',
              sortable: true,
              key: 'PhoneNumber'
          },
          {
              title: '性别',
              sortable: true,
              key: 'Sex',
              width:'120',
              render: (h, params) => {
                  return h('div', [
                     h('span', {
                      }, params.row.Sex=='male'?'男':'女')
                  ]);
              }
          },
          {
              title: '是否授权',
              sortable: true,
              key: 'Adopt',
              render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'text',
                              size: 'small'
                          },
                          style: {
                            display: function(){
                              return params.row.Adopt=='0'?'none':''
                            }()
                          }
                      },params.row.Adopt!='0'?'已授权':''),
                      h('Button', {
                          props: {
                              type: 'text',
                              size: 'small',
                          },
                          style: {
                            display: function(){
                              return params.row.Adopt!='0'?'none':''
                            }()
                          },
                          on: {
                              click: () => {
                                  this.pass(params.row.UserName)
                              }
                          }
                      },params.row.Adopt=='0'?'授权':'')

                  ]);
              }
          },
          {
              title: '上次操作时间',
              sortable: true,
              key: 'LastLoginDateTime'
          },
          {
              title: '注册时间时间',
              sortable: true,
              key: 'LastLoginDateTime'
          }
        ],
        gridData:[
        ],
        //搜索用户名字
        username:'',
        //表格选中数据
        gridSelected:[],
        //判断表格是否有选中数据控制按钮
        choose:false
      }
    },
    watch:{
      gridSelected:function(newVal,oldVal){
        this.choose = !_.isEmpty(newVal);
      }
    },
    computed:{
      //赛选人员
      filtergridData(){
        let ins = this;
        if(ins.username){
          return ins.gridData.filter(item=>{
            return item.UserName.includes(ins.username);
          })
        }
        return ins.gridData;
      }
    },
    mounted(){
      this.getUsers();
    },
    methods:{
      //获取全部用户
      getUsers(){
        this.$http.get('/users/GetUsers').then(res=>{
          this.gridData = res.data;
        },err=>{
          this.$Notice.error({desc: '获取用户失败！'});
        })
      },
      //删除用户
      remove(params){
        this.$Modal.confirm({
            title: '提示',
            content: '确认删除？',
            onOk: () => {
              let delData = this.gridSelected.map(item=>{
                return item.UserName;
              });

              this.$http.post('/Users/Delete',delData).then(res=>{
                this.$Notice.success({desc: '成功删除'+delData.length+'个用户！'});
                //重新获取全部用户
                this.getUsers();
              },err=>{
                this.$Notice.error({desc: '删除失败！'});
              })
            }
        });
      },
      //通过用户
      pass(name){
        this.$http.get(`/Users/AuthorityUser/${name}`).then(res=>{
          this.$Notice.success({desc: name+'已经通过！'});
          this.getUsers();
        },err=>{
          this.$Notice.error({desc: `通过用户${name}失败！`});
        })
      },
      //表格选中事件
      selectedGrid(){
        this.gridSelected = this.$refs.table.getSelection();
      }
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
