<template>
  <Split class="problem-wrapper" v-model="splitModel" min="480">
    <template v-slot:left>
      <aside>
        <Tabs type="card" :animated="false" class="tab" v-model="mainTab">
          <TabPane label="题目描述" name="description" class="description">
            <div class="tab-inner">
              <h4 class="title">
                {{ problemData.index + ". " + problemData.name }}
              </h4>
              <div class="second-line">
                难度
                <span :style="{ color: difficultyColor }">{{
                  problemData.difficulty
                }}</span>
                <div class="like-favorite-button" @click="like(!liked)">
                  <Icon
                    :type="liked ? 'ios-thumbs-up' : 'ios-thumbs-up-outline'"
                  />{{ problemData.liked }}
                </div>
                <div class="like-favorite-button" @click="favorite(!favorited)">
                  <Icon :type="favorited ? 'md-star' : 'md-star-outline'" />收藏
                </div>
                <Button type="text"><Icon type="md-share" />分享</Button>
              </div>
              <Tag color="blue" v-for="tag in problemData.tags" :key="tag">{{
                tag
              }}</Tag>
              <Divider />
              <div class="description">{{ problemData.description }}</div>
              <h4>示例:</h4>
              <div
                class="sample"
                v-for="sample in problemData.samples"
                :key="sample"
              >
                {{ sample }}
              </div>
              <h4 v-if="tips.length">提示:</h4>
              <ul style="margin: 0 0 20px 40px">
                <li v-for="tip in tips" :key="tip">{{ tip }}</li>
              </ul>
              <div>
                通过次数 {{ problemData.passes }} | 提交次数
                {{ problemData.commits }}
              </div>
              <!-- <div class="question">
                在真实的Cook中遇到过这道题？<Button size="small">是</Button
                ><Button size="small">否</Button>
              </div> -->
              <Divider />
              <div>力厨(LeetCook)版权没有</div>
            </div>
          </TabPane>
          <TabPane label="评论">
            <div class="tab-inner">
              <CommentComp
                @on-comment="comment"
                :comments="problemData.comments"
              />
            </div>
          </TabPane>
          <TabPane label="题解" disabled>题解(待完成)</TabPane>
          <TabPane label="提交记录" name="record">
            <TheSummitRecord
              :current-result="summitResult"
              :SummitRecordData="summitRecordData"
              :Percentage="percentage"
            />
          </TabPane>
        </Tabs>
        <Spin fix v-if="spinTab" />
        <footer>
          <Button @click="$router.push({ name: 'ProblemSet' })"
            ><Icon type="md-list" />题目列表</Button
          >
          <Button
            @click="
              $router.push({
                params: {
                  index: Math.floor(
                    Math.random() * $store.state.problems.length
                  ),
                },
              })
            "
          >
            <Icon type="md-shuffle" />随机一题</Button
          >
          <Button
            @click="
              $router.push({ params: { index: $route.params.index - 1 } })
            "
            ><Icon type="md-arrow-dropleft" />上一题</Button
          >
          <Button
            @click="
              $router.push({ params: { index: $route.params.index + 1 } })
            "
            >下一题<Icon type="md-arrow-dropright"
          /></Button>
        </footer>
      </aside>
    </template>
    <template v-slot:right>
      <div class="right-wrapper">
        <nav class="coder-control">
          <Select size="small" v-model="lang" class="lang-select">
            <Option key="javascript" value="Javascript">Javascript</Option>
            <Option key="vanillaJs" value="VanillaJs">VanillaJs</Option>
          </Select>
          <a @click="code = problemData.template" class="small-button">
            <Icon type="md-return-left" />还原模板</a
          >
          <a @click="editProblem" v-if="userMessage.admin" class="small-button">
            <Icon type="md-construct" />编辑题目</a
          >
          <a
            @click="deleteProblem"
            v-if="userMessage.admin"
            class="small-button"
          >
            <Icon type="md-construct" />删除题目</a
          >
        </nav>
        <div class="main-coder">
          <editor
            v-model="code"
            @init="editorInit"
            lang="javascript"
            theme="github"
            :options="codeOptions"
          ></editor>
        </div>
        <Tabs
          type="card"
          v-model="tab"
          :animated="false"
          :style="{ margin: '0 10px 0 6px' }"
        >
          <TabPane label="测试用例" name="test">
            <Input
              v-model="testSample"
              type="textarea"
              :rows="5"
              placeholder="输入测试用例"
              class="test-input"
            />
          </TabPane>
          <TabPane label="代码执行结果" name="result">
            <Spin fix v-if="testSpin" />
            <div v-if="testStatus == 'pending'" class="pending">
              请先运行您的代码
            </div>
            <div v-else class="succeed">
              <div>
                <span class="finish">已完成</span> 运行用时{{ costTime }}ms
              </div>
              <div class="test-line">
                <div class="test-label">输入</div>
                <div class="test-inner">{{ testSample }}</div>
              </div>
              <div class="test-line">
                <div class="test-label">输出</div>
                <div class="test-inner">{{ testResult }}</div>
              </div>
              <div class="test-line">
                <div class="test-label">预期结果</div>
                <div class="test-inner">{{ sampleTestResult }}</div>
              </div>
            </div>
          </TabPane>
          <template v-slot:extra>
            <iframe
              sandbox="allow-scripts"
              id="resultFrame"
              ref="testCode"
              src="/static/testCode.html"
              title="testCode"
              :style="{ display: 'none' }"
            ></iframe>
            <Button @click="test">测试</Button>
            <Button type="success" @click="summit">提交</Button>
          </template>
        </Tabs>
      </div>
    </template>
  </Split>
</template>

<script>
import TheSummitRecord from "../components/TheSummitRecord";
import { mapState, mapMutations } from "vuex";
import CommentComp from "../components/CommentComp";

export default {
  name: "Problem",
  data: function () {
    return {
      problemData: {}, //题目数据
      splitModel: "480px",
      code: "", //用户代码
      mainTab: "description",
      lang: "Javascript",
      testSample: "", //测试集
      testResult: "", //测试结果
      sampleTestResult: "", //预期结果
      costTime: 0, //代码运行时间
      codeOptions: {
        //用于代码编辑器
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true /*自动补全*/,
        fontSize: 16,
      },
      tab: "test",
      testStatus: "pending", //等待代码运行
      summitResult: {}, //添加后结果，传递给TheSummitRecord子组件
      percentage: "",
      summitRecordData: [], //从服务器上获取的用户提交记录数据，传递给子组件

      spinTab: true,
      testSpin: false,
    };
  },
  components: {
    editor: require("vue2-ace-editor"),
    TheSummitRecord,
    CommentComp,
  },
  computed: {
    ...mapState(["userMessage", "username"]),
    tips: function () {
      return this.problemData.tips?.split("\n") ?? [];
    },
    difficultyColor: function () {
      let map = {
        easy: "green",
        medium: "orange",
        hard: "red",
      };
      return map[this.problemData.difficulty];
    },
    liked: function () {
      return this.userMessage.liked?.includes(this.problemData.index);
    },
    favorited: function () {
      return this.userMessage.favorite?.includes(this.problemData.index);
    },
  },
  methods: {
    ...mapMutations(["LikeProblem", "FavoriteProblem"]),
    editorInit: function () {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/javascript"); //language
      require("brace/snippets/javascript"); //snippet
      require("brace/theme/github");
    },
    //测试示例
    test: function () {
      this.testSpin = true;
      this.tab = "result";
      this.testStatus = "succeed";
      this.$refs.testCode.contentWindow.postMessage(
        {
          code: this.code, //用户代码
          func: this.problemData.func, //校验函数
          funcName: this.problemData.funcName, //函数名
          testSample: this.argsTransform(
            this.testSample,
            this.problemData.args
          ), //测试例子
        },
        "*"
      );
    },
    //完整测试
    summit: function () {
      this.spinTab = true;
      this.mainTab = "record";
      this.$refs.testCode.contentWindow.postMessage(
        {
          fullTest: true,
          code: this.code, //用户代码
          func: this.problemData.func, //校验函数
          funcName: this.problemData.funcName, //函数名
          testSamples: this.problemData.testSamples,
        },
        "*"
      );
    },
    //按参数列表类型将字符串序列化
    argsTransform: function (args, type) {
      args = args.split("\n");
      for (let i = 0; i < type.length; i++) {
        args[i] = this.$argsTransformMap[type[i]](args[i]);
      }
      return args;
    },
    editProblem: function () {
      this.$router.push({
        name: "NewProblem",
        query: { index: this.problemData.index },
      });
    },
    deleteProblem: async function () {
      this.$Modal.confirm({
        title: "警告",
        content: "是否要删除此题目？此操作不可还原",
        onOk: function () {
          try {
            this.$DeleteProblem(this.problemData.index);
            this.$router.replace({ name: "ProblemSet" });
          } catch (e) {
            this.$Message.error(e);
          }
        },
      });
    },
    like: async function (isLike) {
      if (this.username == null) return;
      this.problemData.liked += isLike ? 1 : -1;
      this.LikeProblem({ isLike, index: this.problemData.index });
      await this.$like(this.problemData.index, isLike);
    },
    favorite: async function (isFavorite) {
      if (this.username == null) return;
      this.FavoriteProblem({ isFavorite, index: this.problemData.index });
      await this.$favorite(this.problemData.index, isFavorite);
    },
    comment: async function (data) {
      await this.$comment(this.$route.params.index, data);
      this.problemData = await this.$GetProblemData(this.$route.params.index);
    },
  },
  beforeRouteUpdate: async function (to, from, next) {
    this.spinTab = true;
    const data = await this.$GetProblemData(to.params.index);
    if (data) {
      this.problemData = data;
      this.code = this.problemData.template;
      this.testSample = this.problemData.testSample;
      this.summitRecordData = await this.$GetSummitRecord(to.params.index);
      next();
    }
    this.spinTab = false;
  },
  created: async function () {
    this.problemData = await this.$GetProblemData(this.$route.params.index);
    this.summitRecordData = await this.$GetSummitRecord(
      this.$route.params.index
    );
    this.spinTab = false;
    this.code = this.problemData.template;
    this.testSample = this.problemData.testSample;
    //与iframe通信
    window.onmessage = async (e) => {
      if (e.source === this.$refs.testCode.contentWindow) {
        if (e.data.summit) {
          this.summitResult = e.data;
          this.mainTab = "record";
          let percentage = await this.$SummitProblem(
            this.problemData.index,
            e.data.cost
          );
          this.percentage =
            percentage != null ? (percentage * 100).toFixed(2) : null;
          this.summitRecordData = await this.$GetSummitRecord(
            this.$route.params.index
          );
          this.spinTab = false;
        } else {
          this.testSpin = false;
          this.testResult = e.data.result || "undefined";
          this.costTime = e.data.cost;
          this.sampleTestResult = e.data.sampleResult;
        }
      }
    };
  },
  beforeDestroy: function () {
    window.onmessage = null;
  },
};
</script>

<style lang="scss" scoped>
//整体布局部分
.problem-wrapper {
  display: flex;
  width: 100%;
  background: linear-gradient(rgb(236, 236, 236), white);
}
aside {
  height: 100%;
  min-width: 480px;
  display:flex;
  flex-direction: column;
  .tab {
    flex: 1;
    border: 1px solid rgb(236, 236, 236);
  }
  footer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
}
.right-wrapper {
  height: 100%;
  min-width: 480px;
  flex-direction: column;
  display: flex;
  .main-coder {
    flex: 1;
  }
}

//题目描述信息部分
.tab-inner {
  &::after{
    content:".";
  }
  background: white;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  .title {
    color: black;
  }
  .second-line {
    button {
      margin: 0 20px;
    }
  }
  .sample {
    background: rgb(235, 235, 235);
    padding: 10px;
    font-weight: 500;
    color: black;
  }
  .description,
  .sample {
    margin-bottom: 60px;
    white-space: pre-wrap;
  }
  .like-favorite-button {
    display: inline-block;
    margin: 0 20px;
    cursor: pointer;
  }
}
//代码控制台部分
.coder-control {
  display: flex;
  align-items: center;
  height: 36px;
  gap: 5px;
  font-size: 24px;
  .lang-select {
    width: 200px;
    margin: 0 10px;
  }
  span {
    cursor: pointer;
  }
  .small-button {
    font-size: 16px;
    color: gray;
    transition: background 0.2s;
    transition: color 0.5s;
    &:active {
      background: rgb(204, 204, 204);
    }
    &:hover {
      color: black;
    }
  }
}
.pending {
  height: 135px;
  line-height: 135px;
  text-align: center;
  font-size: 36px;
  color: gray;
  background: rgb(235, 235, 235);
}
.succeed {
  padding: 10px;
  .finish {
    color: green;
    font-weight: bold;
    font-size: 16px;
    margin: 10px;
  }
  .test-line {
    margin: 5px;
  }
  .test-label {
    display: inline-block;
    width: 80px;
  }
  .test-inner {
    border-radius: 3px;
    border: 1px solid rgb(184, 184, 184);
    display: inline-block;
    background: rgb(230, 230, 230);
    padding: 5px;
    width: calc(100% - 100px);
    word-break: break-all;
  }
}
</style>

<style lang="scss">
//被改变的默认样式
.problem-wrapper {
  .ivu-tabs-bar {
    margin: 0;
  }
  .ivu-tabs-content,
  .ivu-tabs-tabpane,
  .tab-inner {
    height: 100%;
  }
  .description {
    overflow-y: auto;
  }
  .test-input {
    padding: 10px;
    textarea {
      resize: none !important;
    }
  }
}
</style>