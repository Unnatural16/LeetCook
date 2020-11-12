<template>
  <div class="wrapper">
    <div class="table-setter">
      <Input
        v-model="search_content"
        placeholder="搜索题目 名称、内容或编号"
        class="input"
      />
      <Icon type="md-document" class="solving-icon" />
      <Dropdown>
        难度
        <Icon type="ios-arrow-down" />
        <DropdownMenu slot="list">
          <DropdownItem>简单</DropdownItem>
          <DropdownItem>中等</DropdownItem>
          <DropdownItem>困难</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        状态
        <Icon type="ios-arrow-down" />
        <DropdownMenu slot="list">
          <DropdownItem>未做</DropdownItem>
          <DropdownItem>已解答</DropdownItem>
          <DropdownItem>尝试过</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        列表
        <Icon type="ios-arrow-down" />
        <DropdownMenu slot="list">
          <DropdownItem>🔥 LeetCode 热题 HOT 100 </DropdownItem>
          <DropdownItem> 💙 LeetCode 精选数据库 70 题 </DropdownItem>
          <DropdownItem> 🧡 LeetCode 精选算法 200 题 </DropdownItem>
          <DropdownItem> 🏆 力扣杯 - 竞赛合集 </DropdownItem>
          <DropdownItem> 🐧 腾讯精选练习 50 题 </DropdownItem>
          <DropdownItem> 👨‍💻 LeetCode 精选 TOP面试题 </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        标签
        <Icon type="ios-arrow-down" />
        <DropdownMenu slot="list" class="tag-list">
          <DropdownItem v-for="item in problem_tag_list" :key="item">{{
            item
          }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Table stripe :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
export default {
  name: "TheProblemTable",
  data: function () {
    return {
      search_content: "",
      problem_tag_list: [],
      columns1: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Age",
          key: "age",
        },
        {
          title: "Address",
          key: "address",
        },
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],
    };
  },
  created: function () {
    this.problem_tag_list = this.GetProblemTag();
  },
};
</script>

<style lang="scss" scoped>
.tag-list {
  height: 500px;
  overflow-y: scroll;
}
.solving-icon:hover {
  position: relative;
  &::after {
    content: "题解";
    position: absolute;
    background: white;
    border-radius: 4px;
    padding: 10px;
    width: 60px;
    transform: translate(-35%, -120%);
    top: 0;
    left: 0;
    box-shadow: 0 0 5px;
  }
}
.table-setter {
  padding: 10px;
  gap: 20px;
  display: flex;
  align-items: center;
  .input {
    width: 60%;
    margin-right: auto;
  }
}
</style>