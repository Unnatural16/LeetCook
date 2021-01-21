<template>
  <div class="wrapper">
    <div class="table-setter">
      <Input
        v-model="searchContent"
        placeholder="搜索题目 名称、内容或编号"
        class="input"
        search
        @on-search="ChangeFilter($event, 'search')"
      />
      <Icon type="md-document" class="solving-icon" />
      <Dropdown
        @on-click="ChangeFilter($event, 'difficulty')"
        :style="{ cursor: 'pointer' }"
      >
        难度
        <Icon type="ios-arrow-down" />
        <DropdownMenu slot="list">
          <DropdownItem name="easy">简单</DropdownItem>
          <DropdownItem name="medium">中等</DropdownItem>
          <DropdownItem name="hard">困难</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        @on-click="ChangeFilter($event, 'solved')"
        :style="{ cursor: 'pointer' }"
      >
        状态
        <Icon type="ios-arrow-down" />
        <DropdownMenu slot="list">
          <DropdownItem name="unsolved">未做</DropdownItem>
          <DropdownItem name="solved">已解答</DropdownItem>
          <DropdownItem name="tried">尝试过</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown :style="{ cursor: 'pointer' }">
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
      <Dropdown
        @on-click="ChangeFilter($event, 'tag')"
        :style="{ cursor: 'pointer' }"
      >
        标签
        <Icon type="ios-arrow-down" />
        <DropdownMenu slot="list" class="tag-list">
          <DropdownItem v-for="item in problemsTagList" :key="item">{{
            item
          }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Table
      stripe
      :columns="problemsTableHeader"
      :data="filtedProblemsTableData"
      :loading="tableLoading"
    >
      <template v-slot:solved="{ row }">
        <Icon
          type="md-checkmark"
          color="green"
          size="24"
          v-if="
            userMessage.PassRecord &&
            userMessage.PassRecord[row.index] == 'solved'
          "
        />
        <Icon
          type="md-clock"
          color="orange"
          size="24"
          v-if="
            userMessage.PassRecord &&
            userMessage.PassRecord[row.index] == 'tried'
          "
        />
      </template>
      <template v-slot:name="{ row }">
        <router-link :to="{ name: 'Problem', params: { index: row.index } }">{{
          row.name
        }}</router-link>
      </template>
      <template v-slot:pass-rate="{ row }">
        {{ ((row.passes / row.commits || 0) * 100).toFixed(2) + "%" }}
      </template>
      <template v-slot:frequency>
        <Icon type="md-lock" color="orange" size="24" />
      </template>
      <template v-slot:difficulty="{ row }">
        <Tag color="lime" v-if="(row.difficulty == 'easy')">简单</Tag>
        <Tag color="orange" v-else-if="(row.difficulty == 'medium')">中等</Tag>
        <Tag color="red" v-else-if="(row.difficulty == 'hard')">困难</Tag>
      </template>
    </Table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TheProblemTable",
  data: function () {
    return {
      searchContent: "",
      problemsTagList: [],
      problemsTableHeader: [
        {
          title: " ",
          slot: "solved",
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
          title: "难度",
          slot: "difficulty",
        },
        {
          title: "通过率",
          slot: "pass-rate",
        },
        {
          title: "出现频率",
          slot: "frequency",
        },
      ],
      tableLoading: true,
    };
  },
  computed: {
    ...mapState(["userMessage", "problems"]),
    filtedProblemsTableData: function () {
      if (this.problems.length==null) {
        return [];
      }
      return this.problems.filter((data) => {
        if (
          this.$route.query.search &&
          data.name.indexOf(this.$route.query.search) == -1
        ) {
          return false;
        }
        if (
          this.$route.query.difficulty &&
          this.$route.query.difficulty != data.difficulty
        ) {
          return false;
        }
        return true;
      });
    },
  },
  created: async function () {
    this.problemsTagList = await this.$GetProblemsTag();
    this.tableLoading = false;
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    ChangeFilter: function (value, key) {
      let query = JSON.parse(JSON.stringify(this.$route.query));
      if (value == null || value.length == 0) {
        delete query[key];
      } else {
        query[key] = value;
      }
      this.$router.push({ query });
    },
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