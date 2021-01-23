<template>
  <div class="progress-wrapper">
    <h2 :style="{ 'padding-left': '20px' }">当前进度</h2>
    <div class="progress-inner">
      <Circle :percent="rate" class="circle">
        {{ rate }}%<br />
        完成率
      </Circle>
      <div class="pass-rate">
        <div>
          <p class="easy title">简单</p>
          <p>{{ solvedCount.easy }}</p>
          <div class="hr" />
          <p>{{ difficultyCount.easy }}</p>
        </div>
        <div>
          <p class="medium title">中等</p>
          <p>{{ solvedCount.medium }}</p>
          <div class="hr" />
          <p>{{ difficultyCount.medium }}</p>
        </div>
        <div>
          <p class="hard title">困难</p>
          <p>{{ solvedCount.hard }}</p>
          <div class="hr" />
          <p>{{ difficultyCount.hard }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheProgress",
  props: ["difficultyCount", "solvedCount"],
  computed: {
    //完成率
    rate: function () {
      return (
        (
          (this.solvedCount.all || 0) / (this.difficultyCount.all || Infinity)
        ).toFixed(4) * 100
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-wrapper {
  height: 150px;
}
.progress-inner {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
  .circle {
    width: 100px !important;
    height: 100px !important;
  }
}
.pass-rate {
  display: flex;
  gap: 10px;
  text-align: space-between;
  justify-content: center;
  .easy {
    color: green;
  }
  .medium {
    color: orange;
  }
  .hard {
    color: red;
  }
  .title {
    margin-bottom: 20px;
  }
}
</style>