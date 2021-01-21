const axios = require('axios')
const host = 'http://localhost:8080'
//此文件定义了全局变量、方法和api,同时模拟后台发送的数据
//以后将会实现与后台联动
exports.install = function (Vue) {
    Vue.prototype.$GetProblemsTag = async function () {
        return problems_tag
    };
    Vue.prototype.$GetProblems = async function () {
        return (await axios.get(host + '/api/problems')).data;
    }
    Vue.prototype.$GetProblemsTagNumber = async function () {
        return problems_tag_number
    }
    Vue.prototype.$GetLeetBooks = async function () {
        return leet_books
    }
    Vue.prototype.$GetLeetBooksRecommended = async function () {
        return leet_books.slice(0, 12)
    }
    Vue.prototype.$GetProblemData = async function (index) {
        return (await axios.get(host + '/api/problems/' + index)).data
    }
    Vue.prototype.$Account = async function () {
        this.$store.commit('Login', (await axios.get(host + '/api/account')).data)
    }
    Vue.prototype.$Login = async function (username, password) {
        try {
            await axios.post(host + '/api/login', { username, password })
            this.$store.commit('Login', username);
        } catch (e) {
            this.$store.commit('Login', '');
        }

    }
    Vue.prototype.$Register = async function (username, password) {
        return (await axios.post(host + '/api/register', { username, password })).data
    }
    Vue.prototype.$Logout = async function () {
        await axios.post(host + '/api/logout')
        this.$store.commit('Login', '');
    }
    Vue.prototype.$SummitProblem = async function (index, cost) { //发送题目序号和时间花费,返回值是超越了多少百分比的人
        return (await axios.post(host + '/api/SummitProblem', { index, cost })).data
    }
    Vue.prototype.$GetSummitRecord = async function (index) {
        if (this.$store.state.username) {
            return (await axios.get(host + '/api/GetSummitRecord', { params: { index } })).data.reverse();
        }
    }
    Vue.prototype.$GetUserMessage = async function () {
        return (await axios.get(host + '/api/GetUserMessage')).data;
    }
    //返回题目序号
    Vue.prototype.$PostProblem = async function (data) {
        if (data.index == null) {
            return (await axios.post(host + '/api/CreateProblem', data)).data;
        } else {
            return (await axios.put(host + `/api/UpdateProblem/${data.index}`, data)).data;
        }
    }
    Vue.prototype.$DeleteProblem = async function (index) {
        return (await axios.delete(host + `/api/DeleteProblem/${index}`,)).data;
    }
    //参数转换表，负责将解析字符串形式的参数
    Vue.prototype.$argsTransformMap = {
        Number: (number) => parseInt(number),
        String: (string) => string.trim().slice(1, -1),
        Boolean: (boolean) => boolean.toLowerCase() == "true",
        Numbers: (array) => array.trim().slice(1, -1).split(",").map(Number),
        Strings: (array) => array.trim().slice(1, -1).split(",").map(String),
        Booleans: (array) => array.trim().slice(1, -1).split(",").map(Boolean),
    }
    Vue.prototype.$argsToString = {
        Number: (number) => number.toString(),
        String: (string) => `"${string}"`,
        Boolean: (boolean) => boolean.toString(),
        Numbers: (array) => '[' + array.map(Number).join(',') + ']',
        Strings: (array) => '[' + array.map(String).join(',') + ']',
        Booleans: (array) => '[' + array.map(Boolean).join(',') + ']',
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
    constructor(title, author, chapter, section, tags, read, price, image) {
        this.title = title;
        this.author = author;
        this.chapter = chapter;
        this.section = section;
        this.tags = tags;
        this.read = read;
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