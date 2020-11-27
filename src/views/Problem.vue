<template>
  <Split class="problem-wrapper" v-model="splitModel" min="480">
    <template v-slot:left>
      <aside>
        <Tabs type="card" :animated="false" class="tab" v-model="mainTab">
          <TabPane label="题目描述" name="description">
            <div class="tab-inner">
              <h4 class="title">
                {{ problemData.index + ". " + problemData.name }}
              </h4>
              <div class="second-line">
                难度 <span ref="difficulty">{{ problemData.difficulty }}</span>
                <Button type="text">
                  <Icon type="md-thumbs-up" />{{ problemData.liked }}</Button
                >
                <Button type="text"><Icon type="md-star-outline" />收藏</Button>
                <Button type="text"><Icon type="md-share" />分享</Button>
              </div>
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
              <div>
                通过次数 {{ problemData.passes }} | 提交次数
                {{ problemData.commits }}
              </div>
              <div class="question">
                在真实的Cook中遇到过这道题？<Button size="small">是</Button
                ><Button size="small">否</Button>
              </div>
              <Divider />
              <div>力厨(LeetCook)版权没有</div>
            </div>
          </TabPane>
          <TabPane label="评论" disabled>评论区(待完成)</TabPane>
          <TabPane label="题解" disabled>题解(待完成)</TabPane>
          <TabPane label="提交记录" name="record">提交记录(待完成)</TabPane>
        </Tabs>
        <footer>
          <Button><Icon type="md-list" />题目列表</Button>
          <Button><Icon type="md-shuffle" />随机一题</Button>
          <Button><Icon type="md-arrow-dropleft" />上一题</Button>
          <Button>下一题<Icon type="md-arrow-dropright" /></Button>
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
          <span :style="{ color: 'green' }"
            ><Icon type="md-timer" />模拟面试</span
          >
          <span @click="code = problemData.template">
            <Icon type="md-return-left" />还原模板</span
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
              :style="{ padding: '10px' }"
            />
          </TabPane>
          <TabPane label="代码执行结果" name="result">
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
export default {
  name: "Problem",
  data: function () {
    return {
      problemData: {},
      splitModel: "480px",
      code: "",
      mainTab:"description",
      lang: "Javascript",
      testSample: "",
      testResult: "",
      sampleTestResult: "",
      costTime: 0,
      codeOptions: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true /*自动补全*/,
        fontSize: 16,
      },
      tab: "test",
      //测试四大状态,["pending", "succeed", "error", "overtime"]
      testStatus: "pending",

      //参数转换表
      argsTransformMap: {
        Number: (number) => parseInt(number),
        String: (string) => {
          string.trim().slice(1, -1);
        },
        Boolean: (boolean) => boolean.toLowerCase() == "true",
        Numbers: (array) => array.trim().slice(1, -1).split(",").map(Number),
        Strings: (array) => array.trim().slice(1, -1).split(",").map(String),
        Booleans: (array) => array.trim().slice(1, -1).split(",").map(Boolean),
      },
    };
  },
  components: {
    editor: require("vue2-ace-editor"),
  },
  methods: {
    editorInit: function () {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/javascript"); //language
      require("brace/snippets/javascript"); //snippet
      require("brace/theme/github");
    },
    //测试示例
    test: function () {
      this.tab="result"
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
      for (let i = 0; i < args.length; i++) {
        args[i] = this.argsTransformMap[type[i]](args[i]);
      }
      return args;
    },
  },
  created: async function () {
    this.problemData = await this.$GetProblemData(this.$route.params.index);
    let tempMap = {
      easy: "green",
      medium: "yellow",
      hard: "red",
    };
    this.$refs.difficulty.style.color = tempMap[this.problemData.difficulty];
    this.code = this.problemData.template;
    this.testSample = this.problemData.testSample;
    //与iframe通信
    let self = this;
    window.onmessage = (e) => {
      if (e.source === self.$refs.testCode.contentWindow) {
        if (e.data.fullTest) {
          console.log(e.data)
          this.mainTab="record"
        } else {
          self.testResult = e.data.result || "undefined";
          self.costTime = e.data.cost;
          self.sampleTestResult = e.data.sampleResult;
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
  .tab {
    height: calc(100% - 52px);
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
  flex-direction: column;
  display: flex;
  .main-coder {
    flex: 1;
  }
}

//题目描述信息部分
.tab-inner {
  background: white;
  height: 100%;
  padding: 20px;
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
  .question {
    margin: 10px 0;
    button {
      margin: 0 10px;
    }
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
}
</style>