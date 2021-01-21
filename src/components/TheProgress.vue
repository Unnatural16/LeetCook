<template>
  <div class="progress-wrapper">
    <h2 :style="{ 'padding-left': '20px' }">当前进度</h2>
    <div class="progress-inner">
      <Circle :percent="rate" class="circle">
        {{rate}}%<br />
        完成率
      </Circle>
      <div class="pass-rate">
        <div>
          <p class="easy title">简单</p>
          <p>{{easySolved}}</p>
          <div class="hr" />
          <p>{{easyCount}}</p>
        </div>
        <div>
          <p class="medium title">中等</p>
          <p>{{mediumSolved}}</p>
          <div class="hr" />
          <p>{{mediumCount}}</p>
        </div>
        <div>
          <p class="hard title">困难</p>
          <p>{{hardSolved}}</p>
          <div class="hr" />
          <p>{{hardCount}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheProgress",
  props:[
    'easyCount',
    'mediumCount',
    'hardCount',
    'easySolved',
    'mediumSolved',
    'hardSolved',
  ],
  computed:{
    //完成率
    rate: function(){
      return ((this.easySolved+this.mediumSolved+this.hardSolved)/(this.easyCount+this.mediumCount+this.hardCount)).toFixed(4)*100
    }
  }
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