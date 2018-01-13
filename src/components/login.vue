<template>
  <div class="login">
    <div class="form-box">
      <div class="form">
        <h3>欢迎登陆仿真模拟系统</h3>
        <Form ref="user" :rules="ruleValidate" :model="user" >
          <FormItem  prop="name">
              <Input name="name" v-model="user.UserName" placeholder="请输入用户名">
                <span slot="prepend">账户：</span>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input name="password" v-model="user.Password" placeholder="请输入密码">
                <span slot="prepend">密码：</span>
              </Input>
          </FormItem>
          <Button @click="submit('user')">登录</Button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        user:{
          UserName:'',
          Password:''
        },
        ruleValidate:{
          UserName: [
              {
                required: true, 
                message: '请输入用户名！', 
                trigger: 'blur' 
              }
          ],
          Password: [
              { 
                required: true, 
                message: '请输入要密码！', 
                trigger: 'blur' 
              }
          ],
        }
      }
    },
    mounted(){

    },
    methods:{
      /*登录*/
      submit(name){
        this.$refs[name].validate((valid) => {
           if(valid) {
            console.log(this.user)
            debugger
             this.$http.post('/users',this.user).then(res=>{
              console.log('登录成功')
              debugger
             });
           } 
         })
      }
    }
  }
</script>

<style lang="scss">
  .login{
    display:flex;
    align-items: center;
    background:url('../assets/image/login/bg.png') no-repeat 0 0/100% 100%;
    .form-box{
      display:flex;
      align-items: center;
      background:url('../assets/image/login/不转圆.png') no-repeat;
      width:637px;
      height:626px;
      margin:0 auto;
      .form{
        margin:0 auto;
        width:300px;
        height:200px;
        h3{
          text-align:center;
          font-size:20px;
          margin-bottom: 20px;
          letter-spacing: 5px;
        }
      }
      .ivu-input-group-prepend{
        background-color:transparent;
      }
    }
    .input{
      border:2px solid #69c1e2;
    }
  }
</style>
