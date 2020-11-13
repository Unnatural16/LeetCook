<template>
  <div class="progress-wrapper">
    <h2 :style="{ 'padding-left': '20px' }">当前进度</h2>
    <div class="progress-inner">
      <Circle :percent="20" class="circle">
        45.4%<br />
        提交通过率
      </Circle>
      <div class="pass-rate">
        <div>
          <p class="easy title">简单</p>
          <p>89</p>
          <div class="hr" />
          <p>524</p>
        </div>
        <div>
          <p class="medium title">中等</p>
          <p>54</p>
          <div class="hr" />
          <p>957</p>
        </div>
        <div>
          <p class="hard title">困难</p>
          <p>11</p>
          <div class="hr" />
          <p>380</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheProgress",
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
  margin-top:10px;
  .circle {
      width:100px!important;
      height: 100px!important;
  }
}
.pass-rate {
  display: flex;
  gap:10px;
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