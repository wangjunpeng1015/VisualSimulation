<template>
  <div class="login">
    <div class="form-box">
      <div class="form">
        <h1>欢迎登陆仿真模拟系统</h1>
        <Form ref="user" :rules="ruleValidate" :model="user" >
          <FormItem  prop="name">
              <Input name="name" v-model="user.UserName" placeholder="账号">
              <span slot="prepend">
                <Icon type="android-person" size="24"></Icon>
              </span>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input name="password" v-model="user.Password" placeholder="密码">
              <span slot="prepend">
                <Icon type="ios-locked" size="24"></Icon>
              </span>
              </Input>
          </FormItem>
          <Checkbox v-model="checked">记住密码</Checkbox>
          <div class="buttons">
            <Button @click="submit('user')"></Button>
          </div>
        </Form>
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
        checked:false,
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
  @keyframes rotateIn{
    0%{transform:rotate(0deg)}
    25%{transform:rotate(90deg)}
    50%{transform:rotate(180deg)}
    750%{transform:rotate(270deg)}
    100%{transform:rotate(360deg)}
  }
  @keyframes rotateOut{
    0%{transform:rotate(0deg)}
    25%{transform:rotate(-90deg)}
    50%{transform:rotate(-180deg)}
    750%{transform:rotate(-270deg)}
    100%{transform:rotate(-360deg)}
  }
  .login{
    display:flex;
    align-items: center;
    background:url('../assets/image/login/bg.png') no-repeat 0 0/100% 100%;
    .form-box{
      display:flex;
      position:relative;
      align-items: center;
      background:url('../assets/image/login/不转圆.png') no-repeat;
      width:637px;
      height:626px;
      margin:0 auto;
      &:before{
        content:'';
        position: absolute;
        transform-origin:left;
        animation:rotateIn 5s linear infinite;
        right:32px;
        width:282px;
        height:564px;
        display:inline-block;
        background:url('../assets/image/login/转圆2.png');
      }
      &:after{
        content:'';
        position: absolute;
        top:-15px;
        right:-15px;
        animation:rotateOut 7s linear infinite;
        transform-origin: 135px 77%;
        width:472px;
        height:432px;
        display:inline-block;
        background:url('../assets/image/login/转圆1.png');
      }
      .form{
        margin:0 auto;
        width:300px;
        .buttons{
          margin-top: 15px;
          text-align:center;
          button{
            outline:none;
            border:none;
            width:153px;
            height:50px;
            background:url('../assets/image/login/登录按钮.png');
          }
        }
        h1{
          text-align:center;
          margin: 20px 0;
          letter-spacing: 2px;
        }
        i.ivu-icon{
          padding:0 10px;
          border-right-width:2px;
          border-right-style:solid;
          border-right-color:rgba(145,255,255,0.5);
        }
      }
      .ivu-input-group-prepend{
        background-color:transparent;
      }
      .ivu-input-wrapper{
        height: 52px;
        background:url("../assets/image/login/登录框.png") no-repeat;
        .ivu-input-group-append, .ivu-input-group-prepend{
          border:none;
        }
        input{
          height: inherit;
          border:none;
          box-shadow: none;
        }
      }
    }
    .input{
      border:2px solid #69c1e2;
    }
  }
</style>
