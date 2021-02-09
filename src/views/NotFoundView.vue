<template>
  <h1>此页面似乎不存在,3秒后返回主页</h1>
</template>

<script>
export default {
  name: "NotFoundView",
  created: function () {
    this.timerId = setTimeout(() => {
      this.$router.push({ name: "ProblemSet", params: { type: "all" } });
    }, 3000);
  },
  beforeDestroy: function () {
    clearTimeout(this.timerId);
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 54px;
}
</style>