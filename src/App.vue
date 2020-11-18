<template>
  <div id="app">
    <TheNavagator />
    <router-view class="main-router" />
    <TheFooter class="main-footer" />
    <TheLoginDialog />
  </div>
</template>

<script>
import TheNavagator from "@/components/TheNavagator";
import TheFooter from "@/components/TheFooter";
import TheLoginDialog from "@/components/TheLoginDialog";
export default {
  name: "app",
  components: {
    TheNavagator,
    TheFooter,
    TheLoginDialog,
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  overflow: overlay;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .main-router {
    flex: 1;
    // max-width: 1440px;
    align-self: center;
  }
  .main-footer {
    max-width: 1440px;
    align-self: center;
  }
}
//通用分割线样式
.hr {
  background: rgba(128, 128, 128, 0.3);
  height: 1px;
  width: 100%;
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
</style>
