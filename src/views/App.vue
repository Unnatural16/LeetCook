<template>
  <section class="app-wrapper">
    <aside class="img-aside" />
    <div class="main-content">
      <div class="inner">
        <div class="img"></div>
        <div class="content">
          <div>力厨 Leetcook</div>
          <div>全球厨师挚爱的算法做题平台</div>
          <img src="https://i.loli.net/2020/11/19/C8dZoKh5nUeAEwV.png" alt="QRcode" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
}
.img-aside {
  background: url(https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/bg-1.3b3956af.svg)
    center top / 100% repeat-y;
  height: 100%;
  width: 340px;
  float: left;
}
.main-content {
  height: 100%;
  margin-left: 340px;
  background: rgb(241, 241, 241);
  width: calc(100% - 340px);
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    width: 700px;
    height: 656px;
    display: flex;
    align-items: center;
    .img {
      min-width: 320px;
      height: 100%;
      margin-right: 45px;
      box-shadow: 0 4px 40px rgb(211, 211, 211);
      border-radius: 40px;
      background: url(https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/phone-1@3x.2eab0d33.png)
        center center / cover no-repeat;
    }
    .content {
      div:nth-child(1) {
          font-size: 48px;
          font-weight:bold;
      }
      div:nth-child(2) {
          font-size: 16px;
          margin: 20px 0;
      }
    }
  }
}
</style>