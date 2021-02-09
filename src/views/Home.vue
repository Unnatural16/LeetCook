<template>
  <Row
    :style="{ margin: '0 10px', minWidth: '650px' }"
    :gutter="16"
    class="home"
  >
    <i-col :lg="18" :md="24" :sm="24" :xs="24">
      <div class="card main-content">讨论，热帖与话题</div>
    </i-col>
    <i-col :lg="6" class="aside" :md="0" :sm="0" :xs="0">
      <img
        src="http://image.limshung.site/pics/av1.png"
        class="advertisement-img"
        alt="广告"
      />
      <img
        src="http://image.limshung.site/pics/av2.jpg"
        class="advertisement-img"
        alt="广告"
      />
      <div class="home-card card">
        <span class="title">力厨 LeetCode 竞赛</span>
        <span class="inner">参与竞赛，便有机会赢取奖品</span>
        <Button> 报名参赛</Button>
        <img
          alt="力扣 LeetCode 竞赛"
          src="http://image.limshung.site/pics/LeetCode_Cup.2c93ecec.png"
        />
      </div>
      <div class="hr" />
      <div class="home-card card">
        <span class="title">力厨圈子</span>
        <span class="inner">极客云集、技术讨论、分享经验的交流圈</span>
        <Button> 打开圈子</Button>
        <img
          alt="力扣 LeetCode 竞赛"
          src="http://image.limshung.site/pics/circle.c3e8e192.svg"
        />
      </div>
      <div class="hr" />
      <div class="home-card card">
        <span class="title">使用力厨积分</span>
        <span class="inner">在力厨商店使用你的力扣积分</span>
        <Button> 前往兑换</Button>
        <img
          alt="力扣 LeetCode 竞赛"
          src="http://image.limshung.site/pics/LeetCoin.afe16c16.png"
        />
      </div>
      <div class="hr" />
      <ul class="problem-type card">
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
    </i-col>
  </Row>
</template>

<script>
import { mapMutations } from "vuex";
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
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}
.card {
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(139, 136, 136);
}
.main-content {
  padding: 50px;
  font-size: 54px;
}
.home-card {
  position: relative;
  height: 150px;
  padding: 10px;
  overflow: hidden;
  background: rgb(241, 241, 241);
  margin: 10px 0;

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
