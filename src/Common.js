//此文件定义了全局变量、方法和api,同时模拟后台发送的数据
//以后将会实现与后台联动
exports.install = function (Vue) {
    Vue.prototype.GetProblemTag = function () {
        return ProblemTag
    };
};
const ProblemTag = ['栈', '堆', '贪心算法'
    , '位运算'
    , '树'
    , '深度优先搜索'
    , '广度优先搜索'
    , '并查集'
    , '图'
    , '设计'
    , '拓扑排序'
    , '字典树'
    , '树状数组'
    , '线段树'
    , '二叉搜索树'
    , '递归'
    , '脑筋急转弯'
    , '记忆化'
    , '队列'
    , '极小化极大'
    , '蓄水池抽样'
    , '几何'
    , 'Map'
    , '数组'
    , '哈希表'
    , '链表'
    , '数学'
    , '双指针'
    , '字符串'
    , '二分查找'
    , '分治算法'
    , '动态规划'
    , '回溯算法'
    , 'Random'
    , 'Rejection Sampling'
    , 'Sliding Window'
    , 'Ordered Map'
    , ' Line Sweep']