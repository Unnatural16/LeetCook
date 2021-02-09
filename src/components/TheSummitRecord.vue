<template>
  <div class="the-summit-result">
    <div class="header" v-if="currentResult.type == 'pass'">
      <div>执行结果: <Tag color="success">通过</Tag></div>
      <div>
        执行用时:<span class="strong"> {{ RenderCost(currentResult.cost) }} </span>在所有
        JavaScript 提交中击败了<span class="strong"> {{ Percentage }}% </span
        >的用户
      </div>
      <div>炫耀一下:</div>
      <Button long type="success" @click="$emit('writeSolution')">写题解，分享你的解题思路</Button>
    </div>
    <div class="header" v-else-if="currentResult.type == 'error'">
      <div>执行结果: <Tag color="error">错误</Tag></div>
      <div>输入:</div>
      <div class="content">{{ currentResult.currentSample }}</div>
      <div>输出:</div>
      <div class="content">{{ currentResult.result }}</div>
      <div>预期结果:</div>
      <div class="content">{{ currentResult.sampleResult }}</div>
    </div>
    <div class="header" v-else-if="currentResult.type == 'overtime'">
      <div>执行结果: <Tag color="error">超时</Tag></div>
      <div>输入:</div>
      <div class="content">aaa</div>
    </div>
    <Table
      :columns="summitRecord"
      :data="SummitRecordData.slice((currentPage - 1) * 7, currentPage * 7)"
    >
      <template v-slot:SummitResult="{ row }">
        <Tag color="green" v-if="row.SummitResult">成功</Tag>
        <Tag color="red" v-else>失败</Tag>
      </template>
      <template v-slot:SummitTime="{ row }">
        {{ $RenderTime(row.SummitTime) }}
      </template>
      <template v-slot:ProgramCost="{ row }">
        {{ RenderCost(row.ProgramCost) }}
      </template>
    </Table>
    <Page
      :total="SummitRecordData.length"
      :page-size="7"
      :current.sync="currentPage"
      :style="{ textAlign: 'center', padding: '10px' }"
    />
  </div>
</template>

<script>
export default {
  name: "TheSummitRecord",
  props: {
    currentResult: {
      type: Object,
      default: () => new Object(),
    },
    SummitRecordData: {
      type: Array,
      default: () => [],
    },
    Percentage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentPage: 1,
      summitRecord: [
        {
          title: "提交时间",
          slot: "SummitTime",
        },
        {
          title: "提交结果",
          slot: "SummitResult",
        },
        {
          title: "运行时间",
          slot: "ProgramCost",
        },
        {
          title: "语言",
          key: "ProgramLanguage",
        },
      ],
    };
  },
  methods: {
    RenderCost: function (cost) {
      if (cost == null) {
        return "";
      } else if (cost < 1) {
        return "<1ms";
      } else {
        return cost + "ms";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.the-summit-result {
  min-width: 500px;
  height: 100%;
  background: white;
  overflow: hidden;
  color: gray;
  .header {
    border-radius: 4px;
    border: 1px solid rgb(235, 235, 235);
    margin: 10px;
    padding: 10px;
    .strong {
      font-weight: bold;
      font-size: 1.5em;
    }
    .content {
      margin: 5px;
      background: rgb(248, 248, 248);
      border: 1px solid rgb(233, 233, 233);
      border-radius: 4px;
      padding: 5px;
    }
  }
}
</style>