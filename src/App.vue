<template>
  <div id="app">
    <TheNavagator />
    <div class="router-layout" >
      <router-view :style="{maxWidth:$route.meta.fullScreen?'':'1200px',width:'100%',margin:'0 auto'}"/>
    </div>
    <TheFooter :style="{maxWidth:$route.meta.fullScreen?'':'1200px',width:'100%'}" />
    <TheLoginDialog />
  </div>
</template>

<script>
import TheNavagator from "@/components/TheNavagator";
import TheFooter from "@/components/TheFooter";
import TheLoginDialog from "@/components/TheLoginDialog";
import { mapMutations } from "vuex";
export default {
  name: "app",
  components: {
    TheNavagator,
    TheFooter,
    TheLoginDialog,
  },
  methods: {
    ...mapMutations(["Login", "MutateProblems"]),
  },
  created: async function () {
    await this.$Account(); //如果session未过期，则登录
    this.MutateProblems(await this.$GetProblems());
  },
};
</script>

<style lang="scss" scoped>
.router-layout{
  flex: 1;
  width: 100%;
  overflow-x:auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display:flex;
  overflow-x:hidden;
  flex-direction: column;
  align-items: center;
}
</style>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  overflow-y: overlay;
}

//通用分割线样式
.hr {
  background: rgba(128, 128, 128, 0.3);
  height: 1px;
  width: 100%;
  margin:0 0 10px 0;
}
//通用图片广告样式
.advertisement-img {
  width: 100%;
  border-radius: 5px;
  transition: transform 0.5s;
  &:hover {
    transform: translateY(-10px);
  }
}
//替换PC下的滚动条
@media screen and (min-width: 768px) {
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
}
</style>