<template>
  <div class="wrapper">
    <div class="header">
      <img
        alt="竞赛"
        src="http://image.limshung.site/pics/LeetCode_Cup.2c93ecec.png"
      />
      <h1>LeetCook竞赛</h1>
      <h3>快来参加LeetCook竞赛，提升你的算法和厨艺水平</h3>
    </div>
    <div class="content">
      <div class="flex-wrapper-head">
        <div class="card main shadow">
          <h3 class="card-title">第216场周赛</h3>
          <div class="card-time">2030-11-22：10:30 ~ 12:00</div>
          <a class="card-tile"><Icon type="md-calendar" />添加到日程表</a>
          <div class="card-footer">距离开始还有:</div>
          <Icon class="img-icon" type="md-lock" />
        </div>
        <div class="card right shadow">
          <h3 class="card-title">第 40 场双周赛</h3>
          <div class="card-time">2030-11-28 / 22:30 ~ 2020-11-29 / 00:00</div>
          <a class="card-tile"><Icon type="md-calendar" />添加到日程表</a>
          <div class="card-footer">距离开始还有:</div>
          <Icon class="img-icon" type="md-arrow-round-forward" />
        </div>
      </div>
      <div class="flex-wrapper-content">
        <div class="rank">
          <h1>全国排名</h1>
          <div class="gold shadow">
            <div class="inner">
              <span class="username">Alpha</span>
            </div>
          </div>
          <div class="silver shadow">
            <div class="inner">
              <span class="username">Beta</span>
            </div>
          </div>
          <div class="copper shadow">
            <div class="inner">
              <span class="username">Gamma</span>
            </div>
          </div>
        </div>
        <div class="history shadow">
          <h1>往届竞赛回顾</h1>
          <a>我的虚拟竞赛记录 ></a>
          <Table :columns="tableHeader" :data="tableData"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contest",
  data: function () {
    return {
      tableHeader: [
        {
          title: "以往竞赛",
          key: "history",
        },
        {
          title: "时长",
          key: "time",
        },
      ],
      tableData: [
        {
          history: "第215场周赛",
          time: "1小时30分",
        },
        {
          history: "第39场双周赛",
          time: "1小时30分",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  min-width: 900px;
  background: rgb(233, 233, 233);
}
.header {
  padding-bottom: 100px;
  height: 489px;
  text-align: center;
  background-image: linear-gradient(
    -150deg,
    #222222 15%,
    #373737 70%,
    #3c4859 94%
  );
  color: white;
  img {
    height: 150px;
    margin-top: 100px;
    margin-bottom: 50px;
  }
  h3 {
    margin: 10px 0;
    color: gray;
  }
}
.content {
  margin: 0 auto;
  max-width: 870px;
  .flex-wrapper-head {
    display: flex;
    justify-content: space-between;
    margin-top: -100px;
    color: white;
    .card {
      height: 240px;
      border-radius: 20px;
      display: inline-block;
      position: relative;
      padding: 20px;
      &:hover {
        cursor: pointer;
      }
      &:hover .img-icon {
        transform: scale(2);
      }
      .img-icon {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: rgba(128, 128, 128, 0.5);
        font-size: 60px;
        transform-origin: bottom right;
        transition: transform 0.5s;
      }
      h3 {
        font-size: 30px;
      }
      a {
        color: white;
        display: block;
        margin: 10px 0;
      }
      .card-footer {
        position: absolute;
        bottom: 20px;
      }
    }
    .main {
      width: 60%;
      background: url(http://image.limshung.site/pics/card_img.jpg) plum;
      background-size: cover;
    }
    .right {
      width: 35%;
      background-image: linear-gradient(rgb(79, 227, 248), rgb(14, 153, 208));
    }
  }
  .flex-wrapper-content {
    display: flex;
    justify-content: space-between;
    .rank {
      width: 35%;
      margin: 20px;
      padding: 20px;
      position: relative;
      div {
        height: 90px;
        width: 90px;
        border-radius: 45px;
        overflow: hidden;
        .inner {
          margin: 5px;
          height: 80px;
          width: 80px;
          border-radius: 40px;
          line-height: 80px;
          text-align: center;
          font-size: 36px;
          .username {
            position: relative;
            bottom:-15px;
            color:orange;
            font-size:16px;
            background: white;
            padding:2px 5px;
            border-radius: 5px;
            box-shadow:0 0 5px;
          }
        }
      }
      .gold {
        background: linear-gradient(#feea88, #d7a807);
        margin: 20px auto;
        .inner {
          background: url("http://image.limshung.site/pics/avatar1.png")
            #e9e9e9;
        }
      }
      .silver {
        background-image: linear-gradient(white, rgb(171, 171, 171));
        display: inline-block;
        .inner {
          background: url("http://image.limshung.site/pics/avatar2.jpg")
            #e9e9e9;
        }
      }
      .copper {
        background-image: linear-gradient(
          rgb(250, 207, 163),
          rgb(215, 124, 68)
        );
        display: inline-block;
        position: absolute;
        right: 20px;
        .inner {
          background: url("http://image.limshung.site/pics/avatar3.png")
            #e9e9e9;
        }
      }
    }
    .history {
      width: 60%;
      margin: 20px;
      background: white;
      border-radius: 10px;
      h1 {
        padding: 30px 20px 10px;
      }
      a {
        display: block;
        padding: 10px 20px;
        color: gray;
        transition: box-shadow 0.2s;
        &:hover {
          color: rgb(255, 86, 255);
        }
      }
    }
  }
  .shadow {
    transition: box-shadow 0.5s;
    &:hover {
      box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.15);
    }
  }
}
</style>