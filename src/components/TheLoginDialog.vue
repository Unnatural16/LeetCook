<template>
  <Modal v-model="isOpen" :width="480" class="login-wrapper">
    <h1>
      {{ ["欢迎来到力厨", "账号密码登录", "注册"][loginDialogState] }}
    </h1>
    <Form v-if="loginDialogState == 0">
      <FormItem>
        <i-input placeholder="输入手机号" key>
          <Select slot="prepend" style="width: 80px">
            <Option value="+86">+86</Option>
            <Option value="+1">+1</Option>
          </Select>
        </i-input>
      </FormItem>
      <FormItem>
        <i-input placeholder="验证码" key>
          <template v-slot:append>
            <Button type="text" @click="$Message.error('尚未完成QAQ')"
              >获取验证码</Button
            >
          </template>
        </i-input>
      </FormItem>
      <FormItem>
        <Button type="success" @click="$Message.error('尚未完成QAQ')" long
          >登录/注册</Button
        >
      </FormItem>

      <div class="small-button">
        <a @click="loginDialogState = 1">账号密码登录</a>
        <a @click="loginDialogState = 2">注册</a>
      </div>
    </Form>
    <Form v-if="loginDialogState == 1" :model="formLogin" ref="login">
      <FormItem prop="username">
        <i-input
          placeholder="请输入用户名"
          v-model="formLogin.username"
          @keyup.enter.native="handleSubmit('login')"
        ></i-input>
      </FormItem>
      <FormItem prop="password">
        <i-input
          type="password"
          placeholder="输入密码"
          v-model="formLogin.password"
          @keyup.enter.native="handleSubmit('login')"
        ></i-input>
      </FormItem>
      <FormItem>
        <Button type="success" @click="handleSubmit('login')" long>登录</Button>
      </FormItem>

      <div class="small-button">
        <a @click="loginDialogState = 0">验证码登录</a>
        <a @click="$Message.error('尚未完成QAQ')">忘记密码</a>
      </div>
    </Form>
    <Form v-if="loginDialogState == 2">
      <FormItem>
        <i-input placeholder="输入邮箱(暂时不需要)"></i-input>
      </FormItem>

      <FormItem>
        <i-input
          type="password"
          placeholder="输入密码"
          v-model="formRegister.password"
          @keyup.enter.native="handleSubmit('register')"
        ></i-input>
      </FormItem>
      <FormItem>
        <i-input
          placeholder="你的用户名"
          v-model="formRegister.username"
          @keyup.enter.native="handleSubmit('register')"
        ></i-input>
      </FormItem>

      <FormItem>
        <Button type="success" long @click="handleSubmit('register')"
          >注册</Button
        >
      </FormItem>
      <div class="small-button">
        <a @click="loginDialogState = 0">验证码登录</a>
      </div>
    </Form>
    <template v-slot:footer>
      <div class="login-footer">
        <img src="../assets/qq.svg" alt="qq" />
        <img src="../assets/github.svg" alt="github" />
        <img src="../assets/weibo.svg" alt="weibo" />
        <img src="../assets/weixin.svg" alt="weixin" />
        <img src="../assets/baidu.svg" alt="baidu" />
        <p>登录注册即代表同意力厨 <a>用户协议</a> 和 <a>隐私协议 </a></p>
        <a>关于我们 </a>
        <a>问题反馈 </a>
        <a>帮助中心 </a>
      </div></template
    >
  </Modal>
</template>

<script>
//此对话框为全局对话框，全局仅有一个，通过vuex控制，与组件解耦
import { mapState, mapMutations } from "vuex";
export default {
  name: "TheLoginDialog",
  data: function () {
    return {
      loginDialogState: 0, //分别代表手机、账号密码、邮箱
      formRegister: {
        username: "",
        password: "",
      },
      formLogin: {
        username: "",
        password: "",
      },
      number: "",
    };
  },
  computed: {
    ...mapState(["showDialog"]),
    isOpen: {
      get: function () {
        return this.showDialog;
      },
      set: function (value) {
        this.ShowLoginDialog(value);
      },
    },
  },
  methods: {
    ...mapMutations(["ShowLoginDialog", "Login"]),
    handleSubmit: async function (name) {
      switch (name) {
        case "login":
          {
            if (
              await this.$Login(
                this.formLogin.username,
                this.formLogin.password
              )
            ) {
              this.isOpen = false;
            } else {
              this.$Message.error("用户名或密码错误");
            }
          }
          break;
        case "register":
          {
            try {
              let result = await this.$Register(
                this.formRegister.username,
                this.formRegister.password
              );
              if (result) {
                this.Login(result);
                this.isOpen = false;
              }
            } catch (e) {
              if(e.response.data.error.includes('duplicate')) {
                this.$Message.error('用户名已注册');
              }else if(e.response.data.error.includes('不能为空')) {
                this.$Message.error('用户名和密码必须为由数字、26个英文字母或者下划线组成的字符串');
              }else{
                this.$Message.error('其他错误');
              }
            }
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 20px 0;
}
.login-footer {
  text-align: center;
  color: rgb(167, 167, 167);
  a {
    color: gray;
    transition: color 0.5s;
    &:hover {
      color: rgb(66, 199, 199);
    }
  }
  img {
    margin: 10px;
  }
}
.small-button {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  a {
    color: gray;
    &:hover {
      color: rgb(13, 174, 223);
    }
  }
}
</style>

<style lang="scss">
</style>