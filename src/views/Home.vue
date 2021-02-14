<template>
  <main>
    <Row class="upper" :gutter="16">
      <i-col :md="8" span="24">
        <img
          src="http://image.limshung.site/pics/leetcook-icon.jpg"
          alt="LeetCook图标"
          width="214px"
        />
      </i-col>
      <i-col :md="16" span="24">
        <h1>Leetcook</h1>
        <h3>渐进式仿leetcode网站</h3>
        <div class="footer-button">
          <Button to="/problemset/all" size="large" type="success">开始做题</Button
          ><Button
            size="large"
            target="_blank"
            to="https://github.com/Unnatural16/LeetCook"
            >前往Github</Button
          ><Button
            size="large"
            target="_blank"
            to="http://limshung.site/"
            type="info"
            >阅读博客</Button
          >
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
  max-width: 720px;
  margin: 20px auto !important;
  text-align: center;
  h1 {
    font-size: 64px;
  }
  h3 {
    font-size: 24px;
    color: rgb(131, 131, 131);
  }
  .footer-button {
    padding: 20px 0;
    a{
      margin: 10px;
    }
  }
}
</style>
