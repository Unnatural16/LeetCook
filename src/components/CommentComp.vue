<template>
  <div style="background: white">
    <List item-layout="vertical" size="small" :split="false">
      <ListItem v-for="item in commentTree" :key="item.index">
        <ListItem>
          <Avatar size="small" :src="item.avatar" icon="ios-person"></Avatar
          >&nbsp;<span style="color: #2d9aff">{{ item.username }}</span>
          <li style="margin-left: 26px">{{ item.content }}</li>
          <template slot="action">
            <li>
              <Icon type="ios-calendar-outline" />
              {{ $RenderTime(item.createTime) }}
            </li>
            <li>
              <span @click="showCommentInput(item, item)"
                ><Icon type="ios-chatbubbles-outline" /> 回复</span
              >
            </li>
          </template>
        </ListItem>

        <div v-if="item.replyComments" class="reply">
          <CommentReplyComp
            :replyComment="item.replyComments"
            :parentComment="item"
            @showCommentInput="showCommentInput"
          ></CommentReplyComp>
        </div>
        <Divider />
      </ListItem>
    </List>

    <div>
      <i-input
        v-model="inputComment"
        type="textarea"
        :rows="3"
        :placeholder="placeholders"
      >
      </i-input>
      <div style="text-align: right; margin-top: 10px">
        <Button @click="cancel" style="margin-right: 10px">取消</Button>
        <Button type="primary" round @click="commitComment">确定</Button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentReplyComp from "./CommentReplyComp";

export default {
  components: {
    CommentReplyComp,
  },
  name: "CommentComp",
  props: {
    commentList: {
      type: Array,
      default: () => [
        {
          index: 0,
          username: "张三",
          content: "你们好",
          createTime: "2020-04-12T06:32:20.613+0000",
        },
        {
          index: 1,
          parentIndex: 0,
          username: "李四",
          content: "你好",
          createTime: "2020-04-12T06:32:31.699+0000",
        },
        {
          index: 2,
          username: "王五",
          content: "猪吗？",
          createTime: "2020-04-12T06:34:37.146+0000",
        },
        {
          index: 3,
          parentIndex: 2,
          username: "赵六",
          content: "？？",
          createTime: "2020-04-12T07:03:47.873+0000",
        },
      ],
    },
  },
  computed: {
    commentTree: function () {//数组转树，方便数据库
      return Array.isArray(this.commentList)
        ? this.commentList.reduce((total,current)=>{
          current.replyComments=[]
          if(current.parentIndex==null){
            total.push(current)
          }else{
            this.commentList[current.parentIndex].replyComments.push(current)
          }
          return total
        },[])
        : [];
    },
  },
  data() {
    return {
      //评论内容
      inputComment: "",
      //输入框默认内容
      placeholders: "写下你的评论",
    };
  },

  methods: {
    /**
     * 点击取消按钮
     */
    cancel() {
      this.inputComment = "";
      this.placeholders = "写下你的评论";
      this.parentIndex = null;
    },
    /**
     * 提交评论
     */
    commitComment() {
      if (this.$store.state.username.length <= 0) {
        this.$Message.warning({
          background: true,
          content: "发表评论请先登录！",
        });
      } else {
        if (!this.inputComment) {
          this.$Message.warning({
            background: true,
            content: "评论信息不能为空！",
          });
        } else {
          this.$emit("on-comment", {
            content: this.inputComment,
            parentIndex: this.parentIndex,
          });
        }
      }
      this.inputComment = "";
    },
    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item, reply) {
      if (reply) {
        this.placeholders = "@" + reply.username + " ";
      } else {
        this.inputComment = "";
      }
      this.parentIndex = reply.index;
    },
  },
};
</script>

<style scoped lang="less">
.reply {
  margin-left: 15px;
}
</style>