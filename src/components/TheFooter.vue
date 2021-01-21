<template>
  <div class="footer-wrapper">
    <div class="hr" />
    <div class="flex-wrapper">
      <p>© 2020 LeetCook网络有限公司版没有</p>
      <ul class="footer-menu">
        <li class="menu-item" v-for="item in footerMenu" :key="item">
          <a>{{ item }}</a><span>|</span>
        </li>
      </ul>
      <img src="@/assets/cn.svg" alt="China" /><span>中国</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheFooter",
  data: function () {
    return {
      footerMenu: [
        "企业服务",
        "品牌介绍",
        "关于我们",
        "问题反馈",
        "帮助中心",
        "加入我们",
        "使用条例",
        "隐私政策",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.footer-menu{
  display: inline-block;
  overflow: hidden;
}
.menu-item{
  list-style: none;
  float: right;
  span{
    padding:0 5px;
  }
  a{
    color:black;
  }
}
img{
  width:16px;
  height:16px;
}
p{
  display: inline-block;
}
.flex-wrapper{
  padding:0 20px;
  display: flex;
  gap: 5px;
  align-items: center;
  min-width:920px;
  p{
    margin-right:auto;
  }
}
</style>