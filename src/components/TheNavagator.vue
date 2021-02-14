<template>
  <div class="wrapper">
    <div class="inner-wrapper" :style="{maxWidth:$route.meta.fullScreen?'':'1200px'}" >
      <ul class="nav left">
        <li>
          <router-link :to="'/home'"
            ><img src="../assets/logo.jpg" alt="logo" class="logo" />
          </router-link>
        </li>
        <li class="md"><router-link :to="'/leetbook'">探索</router-link></li>
        <li><router-link :to="'/problemset/all'"> 题库 </router-link></li>
        <li class="md"><router-link :to="'/contest'"> 竞赛 </router-link></li>
        <li class="lg"><router-link :to="'/interview'"> 企业 </router-link></li>
        <li class="lg">
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
      <Button class="lg" type="warning" ghost>Plus会员</Button>
      <ul class="nav" right>
        <li class="lg">
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
        <li class="lg">
          <Dropdown
            ><a> <Icon type="md-folder-open" />收藏夹</a>
            <DropdownMenu slot="list">
              <DropdownItem v-if="userMessage.favorite==null||userMessage.favorite.length<=0">暂无内容</DropdownItem>
              <DropdownItem
                v-for="favoriteProblem in userMessage.favorite"
                :key="favoriteProblem"
              >
                <router-link
                  :to="{ name: 'Problem', params: { index: favoriteProblem } }"
                  >{{
                    problems[favoriteProblem]
                      ? problems[favoriteProblem].name
                      : ""
                  }}</router-link
                >
              </DropdownItem>
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
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "TheNavagator",
  components: {},
  computed: {
    ...mapState(["username", "userMessage", "problems"]),
  },
  methods: {
    ...mapMutations(["ShowLoginDialog", "Login"]),
    logout: async function () {
      await this.$Logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  min-width: 360px;
  z-index:1000;
  .inner-wrapper {
    display: flex;
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

  @media screen and (max-width:820px){
    .lg {
      display:none!important;
    }
  }
  @media screen and (max-width:460px){
    .md {
      display:none!important;
    }
  }
}
.logo {
  transform: translateY(10%);
  height: 24px;
}
</style>
