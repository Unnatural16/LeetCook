<template>
  <section class="app-wrapper">
    <aside class="img-aside" />
    <div class="main-content">
      <div class="inner">
        <div class="img"></div>
        <div class="content">
          <div>力厨 Leetcook</div>
          <div>全球厨师挚爱的算法做题平台</div>
          <img
            src="http://image.limshung.site/pics/20210205023226.png"
            alt="QRcode"
          />
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
  min-height: 100%;
  display: flex;
  background: rgb(241, 241, 241);
}
.img-aside {
  background: url(http://image.limshung.site/pics/bg-1.3b3956af.svg)
    center top / 100% repeat-y;
  width: 340px;
}
.main-content {
  flex: 1;
  display: flex;
  overflow:auto;
  justify-content: center;
  align-items: center;
  .inner {
    width: 700px;
    min-height: 656px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .img {
      min-width: 320px;
      height: 656px;
      margin-right: 45px;
      box-shadow: 0 4px 40px rgb(211, 211, 211);
      border-radius: 40px;
      background: url(http://image.limshung.site/pics/phone-1@3x.2eab0d33.png)
        center center / cover no-repeat;
    }
    .content {
      div:nth-child(1) {
        font-size: 48px;
        font-weight: bold;
      }
      div:nth-child(2) {
        font-size: 16px;
        margin: 20px 0;
      }
    }
  }
}
@media screen and (max-width: 1050px) {
  .img-aside {
    display: none;
  }
  .inner {
    width: 100% !important;
  }
  .img{
    margin:10px 0!important;
  }
  .content{
    text-align: center;
  }
}
</style>