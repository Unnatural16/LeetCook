<template>
  <nav class="wrapper">
    <div class="inner-wrapper">
      <ul class="nav left">
        <li><a >探索</a></li>
        <li><a >题库</a></li>
        <li><a >讨论</a></li>
        <li><a >竞赛</a></li>
        <li><a >企业</a></li>
        <li><a :style="{'color':'orange'}">商店</a></li>
      </ul>
      <Button type="success" ghost>下载App</Button>
      <Button type="warning" ghost>Plus会员</Button>
      <ul class="nav" right>
        <li>
          <Dropdown
            ><a>
              语言
              <Icon type="ios-arrow-down"></Icon
            ></a>
            <DropdownMenu slot="list">
              <DropdownItem>题目以中文显示</DropdownItem>
              <DropdownItem>题目以英文显示</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li>
          <Dropdown
            ><a> <Icon type="md-folder-open" /></a>
            <DropdownMenu slot="list">
              <DropdownItem>新建Playground</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li>
          <a ><Icon type="md-notifications-outline" /></a>
        </li>
        <li>
          <a ><Icon type="md-person" /></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavagator",
};
</script>

<style lang="scss" scoped>
.wrapper {
  .inner-wrapper {
    display: flex;
    max-width: 1440px;
    margin: 0 auto;
    gap: 20px;
    justify-content: center;
    padding: 5px;
    align-items: center;
    .nav {
      display: flex;
      list-style: none;
      a {
        color: black;
        display: inline-block;
        padding: 0 10px;
      }
    }
    .left {
      margin-right: auto;
    }
    .right {
      margin-left: auto;
    }
  }
  box-shadow: 0 0 5px gray;
}
</style>