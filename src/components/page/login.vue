<template>
  <div class="login">
    <div class="form-box">
      <ul class="list">
        <li class="list1" :class="{'active':index==1}">
          <img src="../../assets/image/login/完整的模型.png" alt="">
          <img src="../../assets/image/login/完整的模型line.png" alt="">
        </li>
        <li class="list2" :class="{'active':index==2}">
          <img src="../../assets/image/login/复杂群目标.png" alt="">
          <img src="../../assets/image/login/复杂群目标line.png" alt="">
        </li>
        <li class="list3" :class="{'active':index==3}">
          <img src="../../assets/image/login/灵活的任务line.png" alt="">
          <img src="../../assets/image/login/灵活的任务.png" alt="">
        </li>
        <li class="list4" :class="{'active':index==4}">
          <img src="../../assets/image/login/精细化战场line.png" alt="">
          <img src="../../assets/image/login/精细化战场.png" alt="">
        </li>
        <li class="list5" :class="{'active':index==5}">
          <img src="../../assets/image/login/友好的可视化line.png" alt="">
          <img src="../../assets/image/login/友好的可视化.png" alt="">
        </li>
      </ul>
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
        index:1,
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
      setInterval(()=>{
        if(this.index>5){
          this.index = 1;
        }else{
          this.index++;
        }
      },3000)
    },
    methods:{
      /*登录*/
      submit(name){
        this.$refs[name].validate((valid) => {
           if(valid) {
             this.$store.state.userName = this.user.UserName;
             this.$http.post('/users',this.user).then(res=>{
              //登录成功跳转主页
              this.$router.push('/main');
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
    height:100%;
    display:flex;
    align-items: center;
    background:url('../../assets/image/login/bg.png') no-repeat 0 0/100% 100%;
    .list{
      li{
        position: absolute;
        opacity: .1;
        transition: all linear 3s;
        &.active{
          opacity: 1;
        }
      }
      .list1{
        left: -505px;
        top: -55px;
        :first-child{
          margin-bottom: 55px;
        }
      }
      .list2{
        left: -526px;
        bottom: -55px;
        :last-child{
          margin-bottom: 110px;
        }
      }
      .list3{
        right: -506px;
        top: -55px;
      }
      .list4{
        right: -530px;
        :first-child{
          margin-bottom: 55px;
        }
      }
      .list5{
        right: -250px;
        bottom:-160px;
        :first-child{
          margin-bottom: 55px;
        }
      }
    }
    .form-box{
      display:flex;
      position:relative;
      align-items: center;
      background:url('../../assets/image/login/不转圆.png') no-repeat;
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
        background:url('../../assets/image/login/转圆2.png');
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
        background:url('../../assets/image/login/转圆1.png');
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
            background:url('../../assets/image/login/登录按钮.png');
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
        background:url("../../assets/image/login/登录框.png") no-repeat;
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
