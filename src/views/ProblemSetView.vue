<template>
<div>
  <Row :style="{ margin: '0 10px', minWidth: '650px' }" :gutter="16">
    <i-col :lg="18" :md="24" :sm="24" :xs="24">
      <h2 class="title">
        <Icon type="ios-apps" />力厨 (LeetCook) -
        {{ problemMenu[problemType.indexOf($route.params.type)] || "全部" }}
      </h2>
      <div class="problem-menu">
        <router-link
          v-for="(item, index) in problemMenu"
          :key="item"
          :to="{
            params: {
              //若与当前路由相同（再次点击）则返回all
              type:
                problemType[index] == $route.params.type
                  ? 'all'
                  : problemType[index],
            },
          }"
          >{{ item }}</router-link
        >
      </div>
      <div class="hr" />
      <div class="tag-bar">
        <Tag color="primary"
          >已解决{{ solvedCount["all"] || 0 + "/" + problems.length }}</Tag
        >-
        <Tag color="success">简单{{ difficultyCount["easy"] }}</Tag>
        <Tag color="warning">中等{{ difficultyCount["medium"] }}</Tag>
        <Tag color="error">困难{{ difficultyCount["hard"] }}</Tag>
        <Button
          @click="
            $router.push({
              name: 'Problem',
              params: {
                index: Math.floor(Math.random() * $store.state.problems.length),
              },
            })
          "
        >
          <Icon type="md-create" />随机开始</Button
        >
      </div>
      <div class="hr" />
      <TheProblemTable />
    </i-col>
    <i-col :lg="6" class="aside" :md="0" :sm="0" :xs="0">
      <img
        src="http://image.limshung.site/pics/av2.jpg"
        class="advertisement-img"
        alt="广告"
      />
      <img
        src="http://image.limshung.site/pics/av1.png"
        class="advertisement-img"
        alt="广告"
      />
      <!-- <TheCalendar /> -->
      <TheProgress
        :difficultyCount="difficultyCount"
        :solvedCount="solvedCount"
      />
      <List>
        <template v-slot:header>
          <Icon type="md-bonfire" size="36" />
          <h2 :style="{ display: 'inline-block' }">热门推荐</h2>
        </template>
        <ListItem :style="{ 'padding-left': '20px' }">
          🔥 LeetCode 热题 HOT 100
        </ListItem>
        <ListItem :style="{ 'padding-left': '20px' }">
          💙 LeetCode 精选数据库 70 题
        </ListItem>
        <ListItem :style="{ 'padding-left': '20px' }">
          🧡 LeetCode 精选算法 200 题
        </ListItem>
        <ListItem :style="{ 'padding-left': '20px' }">
          🏆 力扣杯 - 竞赛合集
        </ListItem>
        <ListItem :style="{ 'padding-left': '20px' }">
          🐧 腾讯精选练习 50 题
        </ListItem>
        <ListItem :style="{ 'padding-left': '20px' }">
          👨‍💻 LeetCode 精选 TOP面试题
        </ListItem>
        <template v-slot:footer>
          <p
            :style="{ fontSize: '20px', cursor: 'pointer' }"
            @click="$router.push({ name: 'NewProblem' })"
          >
            <Icon
              type="md-heart"
              size="24"
              :style="{ color: 'rgb(160, 51, 51)' }"
            />贡献题目
          </p>
        </template>
      </List>
      <div>
        <Icon type="md-bookmark" size="36" />
        <h2 :style="{ display: 'inline-block' }">热门推荐</h2>
        <br />
        <Tag
          size="large"
          class="problem-tag"
          v-for="[key, number] in problemsTagCount"
          :key="key.toString()"
          @click.native="$router.push({query:{tag:key.toString()}})"
          >{{ key }}<span class="inner-tag">{{ number }}</span></Tag
        >
      </div>
    </i-col>
  </Row>
</div>
</template>

<script>
import TheProblemTable from "../components/ThePrblemTable";
import TheProgress from "../components/TheProgress";
import { mapState } from "vuex";

export default {
  name: "ProblemSetView",
  components: {
    TheProblemTable,
    // TheCalendar,
    TheProgress,
  },
  data: function () {
    return {
      problemMenu: [
        "算法",
        "数据库",
        "shell",
        "多线程",
        "程序员面试经典",
        "剑指offer",
      ],
      problemType: [
        "algorithms",
        "database",
        "shell",
        "concurrency",
        "lcci",
        "lcof",
      ],
    };
  },
  computed: {
    ...mapState(["userMessage", "problems"]),
    solvedCount: function () {
      return Array.isArray(this.userMessage.PassRecord)
        ? this.userMessage.PassRecord.reduce(
            (obj, current, index) => {
              if (current == "solved") {
                obj[this.problems[index]?.difficulty]++;
                obj.all++;
              }
              return obj;
            },
            {
              all: 0,
              easy: 0,
              medium: 0,
              hard: 0,
            }
          )
        : {};
    },
    difficultyCount: function () {
      return Array.isArray(this.problems)
        ? this.problems.reduce(
            (obj, current) => {
              obj[current?.difficulty]++;
              return obj;
            },
            { easy: 0, medium: 0, hard: 0, all: this.problems.length }
          )
        : {};
    },
    problemsTagCount: function () {
      return Array.isArray(this.problems)
        ? this.problems.reduce((total, current) => {
            if (Array.isArray(current.tags)) {
              for (let tag of current.tags) {
                if (total.has(tag)) {
                  total.set(tag, total.get(tag) + 1);
                } else {
                  total.set(tag, 1);
                }
              }
            }
            return total;
          }, new Map())
        : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 10px 0;
}
.problem-menu {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin: 20px 0;
  a {
    width: 15%;
    height: 96px;
    border-radius: 5px;
    line-height: 96px;
    color: white;
    text-align: center;
    display: inline-block;
    position: relative;
    transition: box-shadow 0.3s;
    &:hover {
      box-shadow: 0px 30px 50px rgba(128, 128, 128, 0.5);
    }
    &::before {
      //父相子绝，设置一个伪元素显示花纹
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-size: contain;
    }
    &:nth-child(1) {
      &::before {
        background-image: url(http://image.limshung.site/pics/algorithm_bg.90562ce29.png);
      }
      background: linear-gradient(orange 0%, red 100%);
    }
    &:nth-child(2) {
      &::before {
        background-image: url(http://image.limshung.site/pics/database_bg.f3bec933a.png);
      }
      background: linear-gradient(cyan 0%, blue 100%);
    }
    &:nth-child(3) {
      &::before {
        background-image: url(http://image.limshung.site/pics/shell_bg.c91db4414.png);
      }
      background: linear-gradient(chartreuse 0%, darkgreen 100%);
    }
    &:nth-child(4) {
      &::before {
        background-image: url(http://image.limshung.site/pics/concurrency_bg.6ea4e46e1.png);
      }
      background: linear-gradient(fuchsia 0%, blueviolet 100%);
    }
    &:nth-child(5) {
      &::before {
        background-image: url(http://image.limshung.site/pics/lcci_bg.7bfafcf36.png);
        background-repeat: no-repeat;
        background-position: 50% -10%;
        background-size: 90% auto;
      }
      background: linear-gradient(red 0%, purple 100%);
    }
    &:nth-child(6) {
      &::before {
        background-image: url(http://image.limshung.site/pics/lcof_bg.bee1a4f81.png);
        background-repeat: no-repeat;
        background-position: 50% -10%;
        background-size: 90% auto;
      }
      background: linear-gradient(khaki 0%, lightcoral 100%);
    }
  }
}
.tag-bar {
  margin: 10px;
  overflow: hidden;
  height: 32px;
  line-height: 32px;
  button {
    float: right;
  }
}
.aside {
  margin: 20px 0;
  div {
    //侧边栏通用样式
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px, rgba(0, 0, 0, 0.08) 0px 2px 8px;
  }
}
.problem-tag {
  border-radius: 100px!important;
  padding:0 5px!important;
  margin:2px 5px!important;
  cursor: pointer;
  .inner-tag {
    padding: 1px 4px;
    background: #17807d;
    color: white;
    border-radius: 10px;
  }
}
</style>
