<template>
  <nav class="wrapper">
    <div class="inner-wrapper">
      <ul class="nav left">
        <li>
          <router-link :to="'/home'"
            ><img src="../assets/logo.jpg" alt="logo" class="logo" />
          </router-link>
        </li>
        <li><router-link :to="'/leetbook'">探索</router-link></li>
        <li><router-link :to="'/problemset/all'"> 题库 </router-link></li>
        <li><router-link :to="'/circle'"> 讨论 </router-link></li>
        <li><router-link :to="'/contest'"> 竞赛 </router-link></li>
        <li><router-link :to="'/interview'"> 企业 </router-link></li>
        <li>
          <Dropdown class="shopping-menu">
            <a :style="{ color: 'orange' }">
              <Icon type="md-basket" />
              商城
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>精品商城</DropdownItem>
              <DropdownItem>力厨周边</DropdownItem>
              <DropdownItem>Plus会员</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
      <Button type="success" @click="$router.push({ name: 'App' })" ghost>
        <Icon type="md-phone-portrait" />
        下载App</Button
      >
      <Button type="warning" ghost>Plus会员</Button>
      <ul class="nav" right>
        <li>
          <Dropdown
            ><a>
              语言
              <Icon type="ios-arrow-down"></Icon
            ></a>
            <DropdownMenu slot="list">
              <DropdownItem>题目以中文显示</DropdownItem>
              <DropdownItem>题目以英文显示</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li>
          <Dropdown
            ><a> <Icon type="md-folder-open" /></a>
            <DropdownMenu slot="list">
              <DropdownItem>新建Playground</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
        <template v-if="username.length > 0">
          <a><Icon type="md-notifications-outline" /></a>
          <Dropdown>
            <a><Icon type="md-person" />{{ username }}</a>
            <template v-slot:list>
              <DropdownMenu>
                <DropdownItem @click.native="logout">登出</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        </template>
        <template v-else>
          <a @click="ShowLoginDialog(true)">登录</a>
          <span>或</span>
          <a @click="ShowLoginDialog(true)">注册</a>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "TheNavagator",
  components: {},
  computed: {
    ...mapState(["username"]),
  },
  methods: {
    ...mapMutations(["ShowLoginDialog", "Login"]),
    logout: async function () {
      await this.$Logout();
      this.Login("");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-width: 920px;
  .inner-wrapper {
    display: flex;
    max-width: 1440px;
    margin: 0 auto;
    gap: 20px;
    justify-content: center;
    padding: 5px;
    align-items: center;
    .nav {
      display: flex;
      align-items: center;
      list-style: none;
      a {
        color: black;
        display: inline-block;
        padding: 0 10px;
      }
    }
    .left {
      margin-right: auto;
    }
    .right {
      margin-left: auto;
    }
  }
  box-shadow: 0 0 5px gray;
}
.logo {
  transform: translateY(10%);
  height: 24px;
}
</style>
