<template>
  <div class="wrapper">
    <div class="table-setter">
      <Input
        v-model="searchContent"
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
          <DropdownItem v-for="item in problemsTagList" :key="item">{{
            item
          }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Table stripe :columns="problemsTableHeader" :data="problemsTableData">
      <template v-slot:name="{row}">
        <router-link :to="{ name: 'Problem', params: { index: row.index } }">{{
          row.name
        }}</router-link>
      </template>
      <template v-slot:pass-rate="{row}">
        {{row.passse/row.commits||0}}
      </template>
      <template v-slot:frequency>
        <Icon type="md-lock" color="orange" size="24" />
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: "TheProblemTable",
  data: function () {
    return {
      searchContent: "",
      problemsTagList: [],
      problemsTableHeader: [
        {
          title: " ",
          key: "is_solved",
        },
        {
          title: "#",
          key: "index",
        },
        {
          title: "题名",
          slot: "name",
        },
        {
          title: "题解",
          key: "solved",
        },
        {
          title: "通过率",
          slot: "pass-rate"
        },
        {
          title: "出现频率",
          slot: "frequency",
        },
      ],
      problemsTableData: [],
    };
  },
  created: async function () {
    this.problemsTagList = await this.$GetProblemsTag();
    this.problemsTableData = await this.$GetProblemsTableData();
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
    width: 45%;
    margin-right: auto;
  }
}
</style>