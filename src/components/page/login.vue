<template>
  <div class="login">
    <div class="form-box" :class="{'regist':regist}">
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
      <transition name="fade">
        <!-- 登录 -->
        <div class="form" v-if="!regist">
          <h1>欢迎登陆仿真模拟系统</h1>
          <Form ref="user" :rules="ruleValidate" :model="user">
            <FormItem prop="UserName">
                <Input v-model="user.UserName" placeholder="账号">
                  <span slot="prepend">
                    <Icon type="android-person" size="24"></Icon>
                  </span>
                </Input>
            </FormItem>
            <FormItem prop="Password">
                <Input v-model="user.Password" placeholder="密码">
                  <span slot="prepend">
                    <Icon type="ios-locked" size="24"></Icon>
                  </span>
                </Input>
            </FormItem>
            <div class="middle layout-row">
              <Checkbox v-model="checked">记住密码</Checkbox>
              <p @click="registered">立即注册</p>
            </div>
            <div class="buttons">
              <Button @click="submit('user')"></Button>
            </div>
          </Form>
        </div>
        <!-- 注册 -->
        <div class="form" v-if="regist">
          <h1>欢迎注册仿真模拟系统</h1>
          <Form ref="reg" :rules="regruleValidate" :model="reg" >
            <FormItem prop="UserName">
              <Input v-model="reg.UserName" placeholder="账号">
                <span slot="prepend">
                </span>
              </Input>
            </FormItem>
            <FormItem prop="Password">
              <Input v-model="reg.Password" placeholder="密码">
                <span slot="prepend">
                </span>
              </Input>
            </FormItem>
            <FormItem prop="rePassword">
              <Input v-model="reg.rePassword" placeholder="确认密码">
                <span slot="prepend">
                </span>
              </Input>
            </FormItem>
            <FormItem prop="phone">
              <Input v-model="reg.phone" placeholder="手机号">
                <span slot="prepend">
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <RadioGroup v-model="reg.sex">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
              </RadioGroup>
            </FormItem>
            <div class="buttons">
              <Button @click="registered('user')"></Button>
            </div>
          </Form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        regist:false,//判断登录注册
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
                message: '请输入密码！',
                trigger: 'blur'
              }
          ]
        },
        reg:{
          UserName:'',
          Password:'',
          rePassword:'',
          phone:'',
          sex:'male'
        },
        regruleValidate:{
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
              message: '请输入密码！',
              trigger: 'blur'
            }
          ],
          rePassword: [
            {
              required: true,
              message: '请确认密码！',
              trigger: 'blur'
            }
          ]
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
             this.regist = false;
             this.$store.state.userName = this.user.UserName;
             this.$http.post('/users',this.user).then(res=>{
              //登录成功跳转主页
              this.$router.push('/main');
             });
           }
         })
      },
      /*注册*/
      registered(name){
        this.regist = true;
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
  /* 切换动画效果 */
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-active {
    padding-left: 20px;
    opacity: 0;
  }
  .login{
    height:100%;
    display:flex;
    align-items: center;
    background:url('../../assets/image/login/bg.png') no-repeat 0 0/100% 100%;
    /* 登录界面 */
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
      .list{
        li{
          position: absolute;
          opacity: 0;
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
      .form{
        margin:0 auto;
        width:300px;
        z-index:3;
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
        .middle{
          justify-content: space-between;
          p{
            font-size:12px;
            cursor:pointer;
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
        background:url("../../../static/image/input.png") no-repeat;
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
    /* 注册界面 */
    .regist{
      background:url('../../assets/image/login/不转圆1.png') no-repeat;
      width:797px;
      height:781px;
      &:before{
        right:45px;
        width:353px;
        height:704px;
        background:url('../../assets/image/login/转圆22.png');
      }
      &:after{
        transform-origin: 175px 76%;
        width:589px;
        height:540px;
        background:url('../../assets/image/login/转圆11.png');
      }
      .form{
        .buttons{
          button{
            width:173px;
            background:url('../../assets/image/login/注册按钮.png');
          }
        }
      }
      .list{
        .list1{
          left: -482px;
          top: -20px;
        }
        .list2{
          left: -480px;;
        }
        .list3{
          top: -15px;
        }
        .list4{
          right: -530px;
        }
        .list5{
          right: -350px;
          bottom: -90px;
        }
      }
    }
    .input{
      border:2px solid #69c1e2;
    }
  }
</style>
