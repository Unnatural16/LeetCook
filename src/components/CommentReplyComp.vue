<template>
  <div>
    <List item-layout="vertical" :split="false" size="small">
      <ListItem v-for="item in replyComment" :key="item.index" class="reply">
        <ListItem>
          <Avatar size="small" :src="item.avatar" icon="ios-person"></Avatar
          >&nbsp;<span style="color: #2d9aff">{{ item.username }}&nbsp;</span
          >回复: &nbsp;<span style="color: #2d9aff">{{
            parentComment.username
          }}</span>
          <li style="margin-left: 26px">{{ item.content }}</li>

          <template slot="action">
            <li>
              <Icon type="ios-calendar-outline" />
              {{ $RenderTime(item.createTime) }}
            </li>
            <li>
              <span @click="toParent(parentComment, item)">
                <Icon type="ios-chatbubbles-outline" /> 回复
              </span>
            </li>
          </template>
        </ListItem>
        <div v-if="item.replyComments" class="reply">
          <CommentReplyComp
            :replyComment="item.replyComments"
            :parentComment="item"
            v-bind="$attrs"
            v-on="$listeners"
          ></CommentReplyComp>
        </div>
      </ListItem>
    </List>
  </div>
</template>
<script>
export default {
  name: "CommentReplyComp",
  props: {
    parentComment: {},
    replyComment: Array,
  },
  data() {
    return {};
  },
  methods: {
    toParent(parentComment, item) {
      this.$emit("showCommentInput", parentComment, item);
    },
  },
};
</script>

<style scoped>
.reply {
  margin-left: 10px;
}
</style>