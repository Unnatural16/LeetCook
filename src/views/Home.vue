<template>
  <main class="home">
    <article>登录后显示</article>
    <aside>
      <img
        src="https://i.loli.net/2020/11/16/jTJnx6VwdbySA3H.jpg"
        class="advertisement-img"
        alt="广告"
      />
      <img
        src="https://i.loli.net/2020/11/16/K3DJVGakL25gwQW.png"
        class="advertisement-img"
        alt="广告"
      />
      <div class="home-card">
        <span class="title">力厨 LeetCode 竞赛</span>
        <span class="inner">参与竞赛，便有机会赢取奖品</span>
        <Button> 报名参赛</Button>
        <img
          alt="力扣 LeetCode 竞赛"
          src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/LeetCode_Cup.2c93ecec.png"
        />
      </div>
      <div class="hr" />
      <div class="home-card">
        <span class="title">力厨圈子</span>
        <span class="inner">极客云集、技术讨论、分享经验的交流圈</span>
        <Button> 打开圈子</Button>
        <img
          alt="力扣 LeetCode 竞赛"
          src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/circle.c3e8e192.svg"
        />
      </div>
      <div class="hr" />
      <div class="home-card">
        <span class="title">使用力厨积分</span>
        <span class="inner">在力厨商店使用你的力扣积分</span>
        <Button> 前往兑换</Button>
        <img
          alt="力扣 LeetCode 竞赛"
          src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/LeetCoin.afe16c16.png"
        />
      </div>
      <div class="hr" />
      <ul class="problem-type">
        <li>
          <Icon type="md-shuffle" /><router-link :to="'problemset/all'"
            >随机开始</router-link
          >
        </li>
        <li v-for="problem in problemMenu" :key="problem">
          <Icon type="md-document" /><router-link :to="'problemset/all'">{{
            problem
          }}</router-link>
        </li>
      </ul>
    </aside>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  data: function () {
    return {
      problemMenu: [
        "算法",
        "数据库",
        "shell",
        "多线程",
        "程序员面试经典",
        "剑指offer",
      ],
    };
  },
  methods: {
    ...mapMutations(["ShowLoginDialog"]),
  },
  computed: {
    ...mapState(["username"]),
  },
  beforeRouteEnter: function (to, from, next) {
    next((vm) => {
      if (vm.username.length == 0) {
        vm.ShowLoginDialog(true);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  article {
    width: 666px;
  }
  aside {
    width: 331px;
    padding: 20px;
  }
}

article {
  //登录内容还没做，临时做一个css
  background: rgb(196, 196, 196);
  text-align: center;
  font-weight: bold;
  font-size: 72px;
  margin: 10px;
  height: 900px;
  line-height: 900px;
}
.home-card {
  position: relative;
  height: 150px;
  padding: 10px;
  overflow: hidden;
  .inner {
    display: block;
    width: 60%;
    white-space: pre-wrap;
  }
  img {
    position: absolute;
    right: 0;
    top: 25%;
    width: 90px;
    height: 93px;
  }
  .title {
    display: block;
    margin: 10px 0;
    font-size: 20px;
  }
  button {
    position: absolute;
    bottom: 10px;
    left: 20px;
  }
}
.problem-type {
  list-style: none;
  i {
    color: green;
    margin-right: 10px;
  }
  li {
    width: 100%;
    padding: 11px;
    border-radius: 5px;
    a {
      color: black;
    }
    &:hover {
      a {
        color: rgb(0, 153, 255);
      }
      background: rgb(194, 194, 194);
    }
  }
}
</style>
