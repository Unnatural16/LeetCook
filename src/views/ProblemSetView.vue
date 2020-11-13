<template>
  <main class="wrapper">
    <article>
      <h2 class="title">
        <Icon type="ios-apps" />力厨 (LeetCook) -
        {{ problem_menu[problem_type.indexOf($route.params.type)] || "全部" }}
      </h2>
      <div class="problem-menu">
        <router-link
          v-for="(item, index) in problem_menu"
          :key="item"
          :to="{
            params: {
              //若与当前路由相同（再次点击）则返回all
              type:
                problem_type[index] == $route.params.type
                  ? 'all'
                  : problem_type[index],
            },
          }"
          >{{ item }}</router-link
        >
      </div>
      <div class="hr" />
      <div class="tag-bar">
        <Tag color="primary">已解决</Tag>-
        <Tag color="success">简单</Tag>
        <Tag color="error">困难</Tag>
        <Tag color="warning">中等</Tag>
        <Button><Icon type="md-create" />随机开始</Button>
      </div>
      <div class="hr" />
      <TheProblemTable />
    </article>
    <aside>
      <img
        src="https://pic.leetcode-cn.com/1604653052-XVsDjW-侧边栏广告位 @2x.png"
        class="advertisement"
        alt="广告"
      />
      <img
        src="https://pic.leetcode-cn.com/1604902939-qAiwGp-04 侧边栏广告位-京东.png"
        class="advertisement"
        alt="广告"
      />
      <TheCalendar />
      <TheProgress />
      <List>
        <template slot="header">
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
        <template slot="footer">
          <p :style="{ fontSize: '20px' }">
            <Icon type="md-heart" size="24" />贡献题目
          </p>
        </template>
      </List>
      <div>
        <Icon type="md-bookmark" size="36"/>
        <h2 :style="{ display: 'inline-block' }">热门推荐</h2><br>
        <Tag
          size="medium"
          class="problem-tag"
          v-for="[key, number] in Object.entries(tag_number)"
          :key="key.toString()"
          >{{ key }}<span class="inner-tag">{{ number }}</span></Tag
        >
      </div>
    </aside>
  </main>
</template>

<script>
import TheProblemTable from "../components/ThePrblemTable";
import TheCalendar from "../components/TheCalendar";
import TheProgress from "../components/TheProgress";

export default {
  name: "ProblemSetView",
  components: {
    TheProblemTable,
    TheCalendar,
    TheProgress,
  },
  data: function () {
    return {
      problem_menu: [
        "算法",
        "数据库",
        "shell",
        "多线程",
        "程序员面试经典",
        "剑指offer",
      ],
      problem_type: [
        "algorithms",
        "database",
        "shell",
        "concurrency",
        "lcci",
        "lcof",
      ],
      tag_number: {},
    };
  },
  created: async function () {
    this.tag_number = await this.GetProblemsTagNumber();
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  article {
    width: 70%;
  }
  aside {
    width: 30%;
    padding: 50px;
  }
}
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
        background-image: url(https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/algorithm_bg.90562ce29.png);
      }
      background: linear-gradient(orange 0%, red 100%);
    }
    &:nth-child(2) {
      &::before {
        background-image: url(https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/database_bg.f3bec933a.png);
      }
      background: linear-gradient(cyan 0%, blue 100%);
    }
    &:nth-child(3) {
      &::before {
        background-image: url(https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/shell_bg.c91db4414.png);
      }
      background: linear-gradient(chartreuse 0%, darkgreen 100%);
    }
    &:nth-child(4) {
      &::before {
        background-image: url(https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/concurrency_bg.6ea4e46e1.png);
      }
      background: linear-gradient(fuchsia 0%, blueviolet 100%);
    }
    &:nth-child(5) {
      &::before {
        background-image: url(https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/lcci_bg.7bfafcf36.png);
        background-repeat: no-repeat;
        background-position: 50% -10%;
        background-size: 90% auto;
      }
      background: linear-gradient(red 0%, purple 100%);
    }
    &:nth-child(6) {
      &::before {
        background-image: url(https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/lcof_bg.bee1a4f81.png);
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

.advertisement {
  width: 100%;
  border-radius: 5px;
  transition: transform 0.5s;
  &:hover {
    transform: translateY(-10px);
  }
}
aside > div {
  //侧边栏通用样式
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px, rgba(0, 0, 0, 0.08) 0px 2px 8px;
}
.problem-tag {
  border-radius: 20px;
  .inner-tag {
    padding: 1px 3px;
    background: #17807d;
    color: white;
    border-radius: 10px;
  }
}
</style>
