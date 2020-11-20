//此文件定义了全局变量、方法和api,同时模拟后台发送的数据
//以后将会实现与后台联动
exports.install = function (Vue) {
    Vue.prototype.GetProblemsTag = async function () {
        return problems_tag
    };
    Vue.prototype.GetProblemsTableData = async function () {
        return problems_table_data
    }
    Vue.prototype.GetProblemsTagNumber = async function () {
        return problems_tag_number
    }
    Vue.prototype.GetLeetBooks = async function () {
        return leet_books
    }
    Vue.prototype.GetLeetBooksRecommended = async function () {
        return leet_books.slice(0, 12)
    }
    Vue.prototype.GetProblemData = async function (index) {
        return problem_data[index];
    }
};
const problems_tag = ['栈', '堆', '贪心算法'
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
//TODO: 此处使用了中文作键，在以后需要修改
const problems_tag_number = {
    数组: 322,
    动态规划: 246,
    字符串: 225,
    数字: 210,
    树: 175
}



//LeetBook电子书模型
class LeetBook {
    constructor(title, author, chapter, section, tags, readed, price, image) {
        this.title = title;
        this.author = author;
        this.chapter = chapter;
        this.section = section;
        this.tags = tags;
        this.readed = readed;
        this.price = price;
        this.image = image;
    }
}
let leet_books = []
//模拟书目
for (let i = 0; i < 40; i++) {
    leet_books.push(new LeetBook("书目" + i,
        "作者" +
        "abcdefghijklmn"[Math.floor(Math.random() * 12)],
        Math.round(Math.random() * 20) + 1,
        Math.round(Math.random() * 100) + 1,
        ["面试", "数据结构", "算法", "会员专区"][i % 4],
        Math.round(Math.random() * 20000),
        Math.round(Math.random() * 100 - 75) / 10))
}

const problems_table_data = [
    {
        is_solved: true,
        index: '1',
        name: '两数之和',
        solved: '7669',
        pass_rate: '49.6%',
        frequency: 'Lock',
    },
]

const problem_data = [null, {
    index: '1',
    name: '两数之和',
    solved: '7669',
    difficulty:'easy',
    liked:9657,
    description: 
    `给定一个整数数组nums和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

    你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。`,
    samples:[
    `给定 nums = [2, 7, 11, 15], target = 9

    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]`],
    passes:1552504,
    commits:3148124,

}]