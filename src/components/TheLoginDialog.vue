<template>
  <Modal v-model="isOpen" :width="480">
    <h1>
      {{ ["欢迎来到力厨", "账号密码登录", "邮箱注册"][loginDialogState] }}
    </h1>
    <div v-if="loginDialogState == 0">
      <i-input placeholder="输入手机号">
        <!-- <Select slot="prepend" v-model="countryNumber" style="width: 80px"> TODOS:会导致一些不可名状的bug，暂时注释
          <Option value="+86">+86</Option>
          <Option value="+1">+1</Option>
        </Select> -->
      </i-input>
      <i-input placeholder="验证码">
        <Button slot="append" type="text">获取验证码</Button>
      </i-input>

      <Button type="success" long>登录/注册</Button>
      <div class="small-button">
        <a @click="loginDialogState = 1">账号密码登录</a>
        <a @click="loginDialogState = 2">邮箱注册</a>
      </div>
    </div>
    <div v-if="loginDialogState == 1">
      <i-input placeholder="手机号/邮箱"></i-input>
      <i-input type="password" placeholder="输入密码"></i-input>
      <Button type="success" long>登录</Button>
      <div class="small-button">
        <a @click="loginDialogState = 0">验证码登录</a>
        <a>忘记密码</a>
      </div>
    </div>
    <div v-if="loginDialogState == 2">
      <i-input placeholder="输入邮箱"></i-input>
      <i-input type="password" placeholder="输入密码"></i-input>
      <i-input placeholder="你的称呼"></i-input>
      <Button type="success" long>注册</Button>
      <div class="small-button">
        <a @click="loginDialogState = 0">验证码登录</a>
      </div>
    </div>
    <div slot="footer" class="login-footer">
      <img src="../assets/qq.svg" alt="qq" />
      <img src="../assets/github.svg" alt="github" />
      <img src="../assets/weibo.svg" alt="weibo" />
      <img src="../assets/weixin.svg" alt="weixin" />
      <img src="../assets/baidu.svg" alt="baidu" />
      <p>登录注册即代表同意力厨 <a>用户协议</a> 和 <a>隐私协议 </a></p>
      <a>关于我们 </a>
      <a>问题反馈 </a>
      <a>帮助中心 </a>
    </div>
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
    ...mapMutations(["ShowLoginDialog"]),
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
.ivu-input-wrapper {
  margin-bottom: 20px !important;
}
</style>