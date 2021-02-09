<template>
  <main class="wrapper">
    <nav>
      <Button
        @click="
          save();
          $emit('close');
        "
        size="small"
        style="margin: 0 10px"
        >关闭</Button
      >
    </nav>
    <section>
      <Input
        v-if="isEditor"
        placeholder="此处输入标题"
        size="large"
        v-model="summitTitle"
      />
      <h1 class="title" v-else>{{ title }}</h1>
      <mavon-editor
        v-model="value"
        :editable="isEditor"
        :defaultOpen="isEditor ? 'edit' : 'preview'"
        :subfield="false"
        :shortCut="isEditor"
        :xssOptions="{}"
        :class="isEditor ? 'editor' : 'previewer'"
        :scrollStyle="false"
        :toolbarsFlag="isEditor"
        @save="save"
      ></mavon-editor>
    </section>
    <footer v-if="isEditor">
      <Button
        type="error"
        ghost
        @click="
          clear();
          $emit('close');
        "
        >删除</Button
      >
      <Button type="success" @click="SummitSolution">发布题解</Button>
    </footer>
  </main>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "TheSolutionComp",
  components: {
    mavonEditor,
  },
  props: {
    isEditor: {
      type: Boolean,
      default: false,
    },
    content: String,
    title: String,
    _id: String,
  },
  data: function () {
    return {
      value: this.content,
      summitTitle: "",
      xss: {},
      timerId: 0,
      index: this.$route.params.index,
    };
  },
  watch: {
    content: function (content) {
      // eslint-disable-next-line no-debugger
      debugger;
      this.value = content;
    },
    _id: async function (_id) {
      if (!this.isEditor) {
        await this.$WatchSolution(this.$route.params.index, _id);
      }
    },
  },
  methods: {
    SummitSolution: async function () {
      if (this.value && this.summitTitle) {
        try {
          await this.$SummitSolution(this.$route.params.index, {
            content: this.value,
            title: this.summitTitle,
          });
          this.clear();
          this.$emit("summit");
        } catch (e) {
          this.$Message.error(e.response.data);
        }
      } else {
        this.$Message.error("标题和内容不能为空");
      }
    },
    // eslint-disable-next-line no-unused-vars
    save: function (value, render) {
      if (this.isEditor) {
        localStorage.setItem(this.index + "solution", this.value);
        localStorage.setItem(
          this.index + "title" + "solution",
          this.summitTitle
        );
      }
    },
    clear: function () {
      if (this.isEditor) {
        localStorage.setItem(this.index + "solution", "");
        localStorage.setItem(this.index + "title" + "solution", "");
        this.value = "";
        this.summitTitle = "";
      }
    },
  },
  created: function () {
    if (this.isEditor) {
      const value = localStorage.getItem(this.index + "solution");
      const summitTitle = localStorage.getItem(
        this.index + "title" + "solution"
      );
      if (this.content == null && value != null) {
        this.value = value;
      }
      if (summitTitle) {
        this.summitTitle = summitTitle;
      }
      this.timerId = setInterval(() => {
        this.save();
        this.$Message.success("内容已保存");
      }, 5000);
    } else {
      this.$WatchSolution(this.$route.params.index, this._id);
    }
  },
  beforeDestroy: function () {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: calc(100% - 5px);
  position: relative;
  left: 5px;
  nav {
    height: 32px;
    line-height: 32px;
  }
  section {
    background: white;
    height: calc(100% - 84px);
    overflow-y: auto;
    border: 1px solid rgb(226, 226, 226);
  }
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    padding: 0 20px;
  }
  .title {
    background: white;
    width: 100%;
    text-align: center;
    font-size: 36px;
  }
  .editor {
    height: calc(100% - 40px);
  }
  .previewer {
    height: calc(100% - 54px);
  }
}
</style>
<style>
.wrapper .v-note-wrapper {
  z-index: 100;
}
</style>