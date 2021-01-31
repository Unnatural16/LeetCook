<template>
  <div>
    <div v-if="root">
      <i-input
        v-model="inputComment"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5 }"
        :placeholder="placeholders"
      >
      </i-input>
      <div style="text-align: right; margin-top: 10px">
        <Button @click="cancel" style="margin-right: 10px">取消</Button>
        <Button type="primary" round @click="commitComment">确定</Button>
      </div>
    </div>
    <List item-layout="vertical" size="small" :split="false">
      <ListItem v-for="item in comments" :key="item._id">
        <ListItem>
          <Avatar size="small" :src="item.avatar" icon="ios-person"></Avatar
          >&nbsp;<span style="color: #2d9aff">{{ item.username }}</span>
          <li style="margin-left: 26px">{{ item.content }}</li>
          <template slot="action">
            <li style="cursor:default">
              <Icon type="ios-calendar-outline" />
              {{ $RenderTime(item.createTime) }}
            </li>
            <li v-if="item.replyComments.length > 0" class="action-button">
              <span @click="unfold(item._id)"
                ><Icon
                  :type="
                    unfold_id == item._id
                      ? 'md-arrow-dropup'
                      : 'md-arrow-dropdown'
                  "
                />{{
                  unfold_id == item._id
                    ? "隐藏"
                    : "显示" + item.replyComments.length + "条"
                }}回复</span
              >
            </li>
            <li class="action-button">
              <span @click="showCommentInput(item)"
                ><Icon type="ios-chatbubbles-outline" /> 回复</span
              >
            </li>
          </template>
        </ListItem>

        <div
          v-if="item.replyComments && item._id == unfold_id"
          style="margin: 0 0 0 30px"
        >
          <CommentComp
            :root="false"
            :comments="item.replyComments"
            @showCommentInput="showCommentInput"
          ></CommentComp>
        </div>
        <Divider v-if="root" />
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  name: "CommentComp",
  props: {
    root: {
      type: Boolean,
      default: true,
    },
    comments: Array,
  },
  data() {
    return {
      //评论内容
      inputComment: "",
      //输入框默认内容
      placeholders: "写下你的评论",
      unfold_id: "",
    };
  },

  methods: {
    /**
     * 点击取消按钮
     */
    cancel() {
      this.inputComment = "";
      this.placeholders = "写下你的评论";
      this.parent_id = null;
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
            parent_id: this.parent_id,
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
    showCommentInput(reply) {
      if (this.root == true) {
        if (reply) {
          this.placeholders = "@" + reply.username + " ";
        } else {
          this.inputComment = "";
        }
        this.parent_id = reply._id;
      } else {
        this.$emit("showCommentInput", reply); //向根组件传递
      }
    },
    unfold(_id) {
      this.unfold_id = _id == this.unfold_id ? "" : _id;
    },
  },
};
</script>

<style lang="scss" scoped>
.action-button{
  &:hover{
    color:black;
  }
}
</style>