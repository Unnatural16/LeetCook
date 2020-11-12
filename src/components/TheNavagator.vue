<template>
  <div class="wrapper">
    <Menu mode="horizontal" active-name="1" class="navagator-left">
      <MenuItem name="1">
        <Icon type="ios-paper" />
        探索
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people" />
        题库
      </MenuItem>
      <MenuItem name="3">
        <Icon type="ios-people" />
        讨论
      </MenuItem>
      <MenuItem name="4">
        <Icon type="ios-people" />
        竞赛
      </MenuItem>
      <MenuItem name="5">
        <Icon type="ios-people" />
        企业
      </MenuItem>
      <Submenu name="6">
        <template slot="title">
          <Icon type="ios-stats" />
          商店
        </template>
        <MenuItem name="6-1">精品商城</MenuItem>
        <MenuItem name="6-2">力抠周边</MenuItem>
        <MenuItem name="6-3">Plus会员</MenuItem>
      </Submenu>
    </Menu>
    <Button type="success" ghost>下载App</Button>
    <Button type="warning" ghost>Plus会员</Button>
    <Menu mode="horizontal" active-name="1" class="navagator-right">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-stats" />
          语言
        </template>
        <MenuItem name="1-1">题目以中文显示</MenuItem>
        <MenuItem name="1-2">题目以英文显示</MenuItem>
      </Submenu>
      <MenuItem name="2">
        <Icon type="ios-people" />
        新建playground
      </MenuItem>
      <MenuItem name="3">
        <Icon type="ios-people" />
        通知
      </MenuItem>
      <MenuItem name="4">
        <Icon type="ios-people" />
        头像
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: "TheNavagator",
};
</script>

<style lang="scss" scoped>
.wrapper{
    display:flex;
    box-shadow: 0 0 5px gray;
    gap:5px;
    justify-content: end;
    align-items: center;
    .navagator-left{
      margin-right:auto;
    }
}
</style>