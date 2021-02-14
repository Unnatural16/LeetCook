<template>
  <div class="problem-form-wrapper" style="padding: 5px 50px">
    <Form
      :model="formItem"
      :label-width="200"
      :rules="formValidate"
      :style="{ width: '100%' }"
      ref="problemForm"
    >
      <Tabs :animated="false" type="card" style="padding: 0 0 100px 0">
        <TabPane label="题目信息">
          <i-col span="10">
            <FormItem label="题目" prop="name">
              <i-input v-model="formItem.name" placeholder="输入题目"></i-input>
            </FormItem>
            <FormItem label="难度" prop="difficulty">
              <Select v-model="formItem.difficulty" placeholder="选择一个难度">
                <Option value="easy">简单</Option>
                <Option value="medium">中等</Option>
                <Option value="hard">困难</Option>
              </Select>
            </FormItem>
            <FormItem label="描述" prop="description">
              <i-input
                v-model="formItem.description"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="输入题目的描述"
              ></i-input>
            </FormItem>
            <FormItem label="示例1" prop="sampleOne">
              <i-input
                v-model="formItem.samples[0]"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="输入示例"
              ></i-input>
            </FormItem>
            <FormItem label="示例2(可选)">
              <i-input
                v-model="formItem.samples[1]"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="输入示例"
              ></i-input>
            </FormItem>
            <FormItem label="示例3(可选)">
              <i-input
                v-model="formItem.samples[2]"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="输入示例"
              ></i-input>
            </FormItem>
            <FormItem label="默认测试用例" prop="testSample">
              <i-input
                v-model="formItem.testSample"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="输入默认测试用例"
              ></i-input>
            </FormItem>
            <FormItem label="提示">
              <i-input
                v-model="formItem.tips"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="输入提示，以回车键分隔"
              ></i-input>
            </FormItem>
          </i-col>
          <i-col span="10">
            <FormItem label="函数名字" prop="funcName">
              <i-input
                v-model="formItem.funcName"
                placeholder="输入函数名"
              ></i-input>
            </FormItem>
            <FormItem label="模板" prop="template">
              <i-input
                v-model="formItem.template"
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 100 }"
                placeholder="输入模板"
              ></i-input>
            </FormItem>
            <FormItem label="验证代码" prop="func">
              <i-input
                v-model="formItem.func"
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 100 }"
                placeholder="输入代码"
              ></i-input>
            </FormItem>
            <FormItem label="标签">
              <i-input
                v-model="formItem.tags"
                placeholder="输入标签，以逗号分隔"
              ></i-input>
            </FormItem>
          </i-col>
        </TabPane>
        <TabPane label="测试用例">
          <FormItem
            :label="'参数' + index"
            v-for="(arg, index) in formItem.args"
            :key="'arg' + index"
            :prop="'arg' + index"
          >
            <Select v-model="arg.value" style="width: 200px">
              <Option value="Number">Number</Option>
              <Option value="String">String</Option>
              <Option value="Boolean">Boolean</Option>
              <Option value="Numbers">Numbers</Option>
              <Option value="Strings">Strings</Option>
              <Option value="Booleans">Booleans</Option>
            </Select>
            <Button @click="DeleteArg(index)">删除参数</Button>
          </FormItem>
          <FormItem>
            <Button type="dashed" icon="md-add" @click="AddArg"
              >添加参数</Button
            >
          </FormItem>
          <FormItem
            :label="'测试用例' + index"
            v-for="(sample, index) in formItem.testSamples"
            :key="'sampel' + index"
            :prop="'sample' + index"
          >
            <i-input
              v-model="sample.value"
              type="textarea"
              placeholder="输入测试用例"
              autosize
            ></i-input>
            <Button @click="DeleteSample(index)">Delete</Button>
          </FormItem>
          <FormItem>
            <Button type="dashed" icon="md-add" @click="AddSample"
              >添加测试用例</Button
            >
          </FormItem>
          <FormItem>
            <Upload
              type="drag"
              accept=".json"
              :format="['json']"
              icon="md-cloud-upload"
              :before-upload="handleUpload"
              action
              show-upload-list
            >
              上传测试用例
            </Upload>
          </FormItem>
        </TabPane>
      </Tabs>
      <i-col span="24">
        <FormItem class="summit-button">
          <Button type="primary" size="large" @click="SummitProblem"
            >提交</Button
          >
          <Button size="large" @click="Reset">清空</Button>
        </FormItem>
      </i-col>
    </Form>
  </div>
</template>
<script>
export default {
  name: "NewProblem",
  data() {
    return {
      file: [],
      formItem: {
        name: "",
        difficulty: "",
        description: "",
        samples: [],
        testSample: "",
        testSamples: [],
        funcName: "",
        func: "",
        args: [],
        template: "",
        tips: "",
      },
      formValidate: {
        name: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur",
          },
        ],
        difficulty: [
          {
            required: true,
            message: "选择一个难度",
            trigger: "change",
          },
        ],
        description: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "blur",
          },
        ],
        testSample: [
          {
            required: true,
            message: "需要默认测试用例",
            trigger: "blur",
          },
        ],
        funcName: [
          {
            required: true,
            message: "需要函数名",
            trigger: "blur",
          },
        ],
        template: [
          {
            required: true,
            message: "模板不能为空",
            trigger: "blur",
          },
        ],
        func: [
          {
            required: true,
            message: "需要验证代码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    AddArg: function () {
      this.formItem.args.push({ value: "" });
    },
    DeleteArg: function (index) {
      this.formItem.args.splice(index, 1);
    },
    AddSample: function () {
      this.formItem.testSamples.push({ value: "" });
    },
    DeleteSample: function (index) {
      this.formItem.testSamples.splice(index, 1);
    },

    Reset: function () {
      this.formItem = {
        name: "",
        difficulty: "",
        description: "",
        samples: [],
        testSample: "",
        testSamples: [],
        funcName: "",
        func: "",
        args: [],
        template: "",
        tags: "",
      };
    },
    handleUpload: function (file) {
      let fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      let that = this;
      fileReader.onload = function (e) {
        that.file = JSON.parse(e.target.result);
      };
      return false;
    },
    SummitProblem: async function () {
      try {
        let flag = false;
        this.$refs["problemForm"].validate((valid) => {
          flag = valid;
        });
        if (flag == false) {
          throw "数据验证不通过";
        }
        let data = Object.assign(this.formItem); //先复制data
        if (this.$route.query.index != null) {
          //如果是编辑（有index），则加上
          data.index = this.$route.query.index;
        }
        if (data.tags) {
          data.tags = data.tags
            .split(",")
            .filter((tag) => tag.trim().length > 0); //将标签解析为数组
        }
        for (let i = 0; i < data.args.length; i++) {
          //将对象数组还原为数组
          data.args[i] = data.args[i].value;
        }
        for (let i = 0; i < data.testSamples.length; i++) {
          //将对象还原为数组，同时根据参数类型解析参数
          let args = data.testSamples[i].value.split("\n");
          let result = [];
          for (let j = 0; j < data.args.length; j++) {
            result[j] = this.$argsTransformMap[data.args[j]](args[j]);
          }
          data.testSamples[i] = result;
        }
        if (this.file.length > 0) {
          data.testSamples.push(...this.file);
        }
        let index = await this.$PostProblem(data);
        this.$router.replace({ name: "Problem", params: { index } });
      } catch (e) {
        this.$Message.error(e.toString());
      }
    },
  },
  created: async function () {
    if (this.$route.query.index == null) {
      return;
    }
    let data = await this.$GetProblemData(this.$route.query.index);
    data.tags =data.tags.join(",");
    data.args=data.args.map((arg) => ({ value: arg }));
    const that=this;
    data.testSamples = data.testSamples.map((testSample)=>{
      let args = [];
      for (let key in testSample) {
        let type = data.args[key];
        args.push(that.$argsToString[type.value](testSample[key]));
      }
      return {value: args.join("\n")}
    })
    Object.assign(this.formItem,data)
  },
};
</script>
<style lang="scss">
.problem-form-wrapper {
  width: 100%;
}
</style>
