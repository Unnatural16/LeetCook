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
        <h2>渐进式仿leetcode网站</h2>
        <div class="footer-button">
          <Button to="/problemset/all" size="large" type="success"
            >开始做题</Button
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
    <div class="banner" align="middle" type="flex" justify="center">
      <div>在线编辑 享受算法</div>
        <img
          src="http://image.limshung.site/pics/view.PNG"
          alt="网站截图"
          class="screenshot"
        />
    </div>
    <Row class="point">
      <i-col :md="8" span="24">
        <div class="card">
          <h3>能用</h3>
          <div>LeetCook是一个能用的网站，又不是不能用！理解万岁！</div>
        </div>
      </i-col>
      <i-col :md="8" span="24">
        <div class="card">
          <h3>趣味</h3>
          <div>LeetCook充满了各种奇怪的题目，取决于作者的恶趣味</div>
        </div>
      </i-col>
      <i-col :md="8" span="24">
        <div class="card">
          <h3>成长性</h3>
          <div>
            LeetCook是一个充满了各种难以名状的bug的网站。你可以将这些问题提交给作者，帮助他成长。
          </div>
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
  h2 {
    font-size: 24px;
    color: rgb(131, 131, 131);
  }
  .footer-button {
    padding: 20px 0;
    a {
      margin: 10px;
      border-radius: 30px;
    }
  }
}
@media screen and (max-width:500px) {
  .banner{
    display:none!important;
  }
}
.banner {
  background: #eeeeee;
  display:flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap:wrap;
  padding:40px;
  div{
    flex: 1 0;
    min-width: 200px;
    font-size:48px;
    font-weight: bold;
    color:white;
    text-shadow: 0 0 5px black;
  }
  .screenshot {
    margin:0 80px;
    height:393px;
    max-width: 100%;
    object-fit: cover;
  }
}
.point {
  text-align: center;
  margin: 50px 0;
  .card {
    font-size: 20px;
    width: 260px;
    margin: 20px auto !important;
    h3 {
      color: #42b983;
    }
  }
}
</style>
