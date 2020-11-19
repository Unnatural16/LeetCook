<template>
  <div class="wrapper">
    <div class="interview-wrapper">
      <div class="title">企业搜索</div>
      <Input
        v-model="searchContent"
        placeholder="搜索上千家企业面试题库、招聘信息"
        search
        size="large"
        @on-search="$router.push({ query: { search: searchContent } })"
      />
      <div :style="{ display: 'inline-block', color: ' rgb(228, 228, 228)' }">
        热门搜索:
      </div>
      <router-link
        class="search-tag"
        tag="div"
        v-for="search in popularSearch"
        :key="search"
        :to="{ query: { search: search } }"
        >{{ search }}</router-link
      >
    </div>
    <div class="content">
      <img src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/null_light.53585615.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "Interview",
  data: function () {
    return {
      searchContent: "",
      popularSearch: ["Indeed", "Microsoft", "Baidu", "Tencent", "Huawei"],
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper{
    width: 100%;
}
.interview-wrapper {
  width: 780px;
  margin: 0 auto;
}
.title {
  font-size: 28px;
  color: gray;
  text-align: center;
  margin: 20px;
}
.search-tag {
  cursor: pointer;
  display: inline-block;
  margin: 10px;
  padding: 1px 3px;
  border: 1px solid rgb(247, 247, 247);
  &:hover {
    background: rgba(128, 128, 128, 0.089);
  }
}
.content{
  background:rgb(238, 238, 238);
  height: calc(100% - 167px);
  display:flex;
  justify-content:center;
  align-items:center;
  img{
    width:200px;
  }
}
</style>