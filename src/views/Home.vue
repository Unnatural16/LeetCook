<template>
  <main>
    <Row class="upper" :gutter="16">
      <i-col span="8">
        <img src="http://image.limshung.site/pics/leetcook-icon.jpg" alt="LeetCook图标" width="214px" height="214px" />
      </i-col>
      <i-col span="16">
        <h1>Leetcook</h1>
        <h3>渐进式仿leetcode网站</h3>
        <div class="footer-button">
          <Button>开始做题</Button><Button>前往Github</Button
          ><Button>阅读博客</Button>
        </div>
      </i-col>
    </Row>
  </main>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.upper {
  max-width: 960px;
  margin: 20px auto;
  h1 {
    font-size: 64px;
  }
  h3 {
    font-size: 24px;
    color: rgb(131, 131, 131);
  }
  .footer-button {
    padding:20px 0;
    display:flex;
  }
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
