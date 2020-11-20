<template>
  <div class="problem-wrapper">
    <aside>
      <Tabs type="card" :animated="false" class="tab">
        <TabPane label="题目描述">
          <div class="tab-inner">
            <h4>{{ problemData.index + "." + problemData.name }}</h4>
            <div class="second-line">
              难度 <span>{{ problemData.difficulty }}</span>
              <Button type="text">
                <Icon type="md-thumbs-up" />{{ problemData.liked }}</Button
              >
              <Button type="text"><Icon type="md-star-outline" />收藏</Button>
              <Button type="text"><Icon type="md-share" />分享</Button>
            </div>
            <Divider />
            <div>{{ problemData.description }}</div>
            <h5>示例</h5>
            <div
              class="sample"
              v-for="sample in problemData.samples"
              :key="sample"
            >
              {{ sample }}
            </div>
            <div>
              通过次数 {{ problemData.passes }} | 提交次数{{
                problemData.commits
              }}
            </div>
            <div>
              在真实的Cook中遇到过这道题？<Button size="small">是</Button
              ><Button size="small">否</Button>
            </div>
            <Divider/>
            <div>力厨(LeetCook)版权没有</div>
          </div>
        </TabPane>
        <TabPane label="评论">评论区(待完成)</TabPane>
        <TabPane label="题解">题解(待完成)</TabPane>
        <TabPane label="提交记录">提交记录(待完成)</TabPane>
      </Tabs>
      <footer>
        <Button><Icon type="md-list" />题目列表</Button>
        <Button><Icon type="md-shuffle" />随机一题</Button>
        <Button><Icon type="md-arrow-dropleft" />上一题</Button>
        <Button>下一题<Icon type="md-arrow-dropright" /></Button>
      </footer>
    </aside>
    <div class="main-coder"></div>
  </div>
</template>

<script>
export default {
  name: "Problem",
  data: function () {
    return {
      problemData: {},
    };
  },
  created: async function () {
    this.problemData = await this.GetProblemData(this.$route.params.index);
  },
};
</script>

<style lang="scss" scoped>
.problem-wrapper {
  display: flex;
  width: 100%;
  background: linear-gradient(rgb(236, 236, 236), white);
}
aside {
  height: 100%;
  width: 480px;
  min-width: 480px;
  margin-left: 0;
  .tab {
    height: calc(100% - 52px);
    border: 1px solid rgb(236, 236, 236);
  }
  footer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
}
.main-coder {
  height: 100%;
  flex: 1;
}
.tab-inner {
  background: white;
  height: 100%;
  padding: 20px;
}
</style>

<style lang="scss">
.problem-wrapper {
  .ivu-tabs-bar {
    margin: 0;
  }
  .ivu-tabs-content,.ivu-tabs-tabpane,.tab-inner{
    height: 100%;
  }
}
</style>