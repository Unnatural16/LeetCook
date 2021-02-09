<template>
  <div class="leet-book-wrapper">
    <div class="leet-book-header">
      <div class="inner">
        <h3 :style="{ padding: '20px 10px' }">精选推荐:</h3>
        <div class="leet-book-recommended-wrapper">
          <Icon
            @click="ScrollTo(true)"
            class="arrow-button left"
            size="36"
            type="md-arrow-round-back"
            v-if="showArrowButton"
          /><Icon
            @click="ScrollTo(false)"
            class="arrow-button right"
            size="36"
            type="md-arrow-round-forward"
            v-else
          />
          <div class="leet-book-recommended" ref="leetBookRecommended">
            <a
              class="leet-book"
              v-for="book in leetBooksRecommended"
              :key="book.title"
            >
              <div
                class="image"
                :style="{
                  background: `url(${book.image}) center / cover`,
                }"
              >
                <div class="image-shadow">
                  <div>{{ book.chapter }}章/{{ book.section }}节</div>
                  <div>{{ book.readed }}已读</div>
                </div>
                <span class="price" v-if="book.price > 0"
                  >￥{{ book.price }}</span
                >
              </div>
              <h3>{{ book.title }}</h3>
              <div class="author">{{ book.author }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="leet-book-content">
      <div class="line" />
      <Tabs class="leet-book-tab inner" v-model="tabSelected" :animated="false">
        <template v-slot:extra>
          <Button
            type="success"
            ghost
            icon="md-book"
            size="small"
            class="my-book"
          >
            我的书架</Button
          >
        </template>
        <TabPane label="全部" name="全部"> </TabPane>
        <TabPane label="面试" name="面试"></TabPane>
        <TabPane label="数据结构" name="数据结构"></TabPane>
        <TabPane label="算法" name="算法"></TabPane>
        <TabPane label="会员专区" name="会员专区" icon="md-person"></TabPane>
        <div class="leet-book-flex">
          <a
            class="leet-book"
            v-for="book in filterLeetBooks"
            :key="book.title"
          >
            <div
              class="image"
              :style="{
                background: `url(${book.image}) center / cover`,
              }"
            >
              <div class="image-shadow">
                <div>{{ book.chapter }}章/{{ book.section }}节</div>
                <div>{{ book.readed }}已读</div>
              </div>
              <span class="price" v-if="book.price > 0"
                >￥{{ book.price }}</span
              >
            </div>
            <h3>{{ book.title }}</h3>
            <div class="author">{{ book.author }}</div>
          </a>
        </div>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeetBook",
  data: function () {
    return {
      leetBooks: [],
      leetBooksRecommended: [],
      tabSelected: "",
      showArrowButton: false,
    };
  },
  methods: {
    ScrollTo: function (direction) {
      this.showArrowButton = !direction;
      this.$refs.leetBookRecommended.scrollLeft = direction ? 0 : 2000;
    },
  },
  computed: {
    filterLeetBooks: function () {
      if (this.tabSelected == "全部") {
        return this.leetBooks;
      } else {
        return this.leetBooks.filter((item) =>
          item.tag.includes(this.tabSelected)
        );
      }
    },
  },
  created: async function () {
    this.leetBooks = await this.$GetLeetBooks();
    this.leetBooksRecommended = await this.$GetLeetBooksRecommended();
  },
};
</script>

<style lang="scss" scoped>
.leet-book-wrapper {
  width: 100%;
}
.leet-book-header {
  background: linear-gradient(
    to right,
    transparent,
    rgb(236, 242, 243) 20%,
    rgb(236, 242, 243) 80%,
    transparent
  );
  height: 400px;
}
.inner {
  max-width: 1200px;
  min-width: 992px;
  padding: 0 48px;
  margin: 0 auto;
}
.leet-book-content {
  position: relative;
  .line {
    background: rgb(194, 194, 194);
    height: 1px;
    width: 100%;
    position: absolute;
    z-index: 10;
    top: 35px;
  }
  .my-book {
    position: relative;
    top: 6px;
  }
}
.leet-book-flex {
  display: flex;
  flex-wrap: wrap;
}
.leet-book-recommended-wrapper {
  position: relative;
  overflow: hidden;
  height: 282px;
  .arrow-button {
    opacity: 0.5;
    position: absolute;
    z-index: 20;
    background: white;
    border-radius: 40px;
    top: 40%;
    transform: translateY(-50%);
    &:hover {
      opacity: 0.75;
      cursor: pointer;
    }
  }
  .left {
    left: 10px;
  }
  .right {
    right: 10px;
  }
}
.leet-book-recommended {
  position: relative;
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  height: calc(100% + 300px);
}
.leet-book {
  width: 16.6%;
  flex-shrink: 0;
  padding: 10px;
  color: black;
  .image {
    color: white;
    height: 200px;
    border-radius: 5px;
    position: relative;
    transition: all 0.5s;
    &:hover {
      box-shadow: 0 0 10px;
      transform: translateY(-10px);
      .image-shadow {
        opacity: 1;
      }
    }
    .image-shadow {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.164);
      transition: all 0.5s;
    }
    .price {
      position: absolute;
      bottom: 5px;
      right: 10px;
    }
  }
  .author {
    color: rgb(165, 165, 165);
  }
}
</style>