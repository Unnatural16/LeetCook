const axios = require('axios')
const host = process.env.NODE_ENV == 'development' ? 'http://localhost:8080' : 'http://leetcook.limshung.site'
//此文件定义了全局变量、方法和api,同时模拟后台发送的数据
//以后将会实现与后台联动
exports.install = function (Vue) {
    //问题系列apu
    Vue.prototype.$GetProblems = async function () {
        return (await axios.get(host + '/api/problems')).data;
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

    //登录系列api
    Vue.prototype.$GetUserMessage = async function () {
        return (await axios.get(host + '/api/GetUserMessage')).data;
    }
    Vue.prototype.$Account = async function () {
        try {
            this.$store.commit('Login', (await axios.get(host + '/api/account')).data)
            this.$store.commit('MutateUserMessage', await this.$GetUserMessage())
            // eslint-disable-next-line no-empty
        } catch { }
    }
    Vue.prototype.$Login = async function (username, password) {
        try {
            await axios.post(host + '/api/login', { username, password })
            this.$store.commit('Login', username);
            this.$store.commit('MutateUserMessage', await this.$GetUserMessage())
            return true
        } catch (e) {
            this.$store.commit('Login', '');
            return false
        }
    }
    Vue.prototype.$Register = async function (username, password) {
        return (await axios.post(host + '/api/register', { username, password })).data
    }
    Vue.prototype.$Logout = async function () {
        await axios.post(host + '/api/logout')
        this.$store.commit('Login', '');
        this.$store.commit('MutateUserMessage', {})
    }

    //问题系列api
    Vue.prototype.$SummitProblem = async function (index, cost) { //发送题目序号和时间花费,返回值是超越了多少百分比的人
        return (await axios.post(host + '/api/SummitProblem', { index, cost })).data
    }
    Vue.prototype.$GetSummitRecord = async function (index) {
        if (this.$store.state.username) {
            return (await axios.get(host + '/api/GetSummitRecord', { params: { index } })).data.reverse();
        }
    }
    Vue.prototype.$like = async function (index, isLike) { //发送题目序号,以及点赞或取消点赞
        return (await axios.post(host + '/api/like/' + index, { isLike })).data
    }
    Vue.prototype.$favorite = async function (index, isFavorite) {
        return (await axios.post(host + '/api/favorite/' + index, { isFavorite })).data
    }
    Vue.prototype.$comment = async function (index, data) {
        return (await axios.post(host + '/api/comment/' + index, data)).data
    }

    //编辑问题系列api
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
    //根据日期渲染时间
    Vue.prototype.$RenderTime = function (date) {
        date = new Date(date);
        let ms = (new Date() - date) / 1000;
        if (ms < 1) {
            return "刚刚";
        } else if (ms < 60) {
            return Math.round(ms) + "秒前";
        } else if (ms < 60 * 60) {
            return Math.round(ms / 60) + "分钟前";
        } else if (ms < 60 * 60 * 24) {
            return Math.round(ms / 3600) + "小时前";
        } else {
            return date.toLocaleDateString();
        }
    }
    Vue.prototype.$SummitSolution = async function (index, data) { //发送题目序号和时间花费,返回值是超越了多少百分比的人
        return (await axios.post(host + '/api/summitSolution/' + index, data)).data
    }
    Vue.prototype.$WatchSolution = (function () {//闭包防抖，合并阅读量增加请求，减少网络开销
        let timer;
        let map = Object.create(null);
        return function (index, _id) {
            if (timer) {
                clearTimeout(timer)
            }
            map[_id] = (map[_id] || 0) + 1
            timer = setTimeout(async () => {
                await axios.post(host + '/api/watchSolution/' + index, { _id: map })
                map = Object.create(null)
            }, 1000)
        }
    })()
    Vue.prototype.$Avatar = 'https://i.loli.net/2021/02/01/cd5lUVsiO623DZ9.png'
};
function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}
//LeetBook电子书模型
class LeetBook {
    constructor(data) {
        Object.assign(this, data)
    }
}
let leet_books = []

const leetBookTitle = ['计算机网络', '数据结构与算法', '数据库', '队列与栈', '深度学习', '高级数据结构', '图论']
const leetBookAuthor = '刘一 陈二 张三 李四 王五 赵六 孙七 周八 吴九 郑十'.split(' ')
const leetBookTag = ["面试", "数据结构", "算法", "会员专区"]
const leetBookImage = `http://image.limshung.site/pics/hash-table.jpeg
http://image.limshung.site/pics/Question-Medium.jpeg
http://image.limshung.site/pics/linked-list.jpeg
http://image.limshung.site/pics/Data_Structure_Binary_Tree.jpeg
http://image.limshung.site/pics/Top_Interview_Questions.jpeg
http://image.limshung.site/pics/arraystring.jpeg
http://image.limshung.site/pics/queue-stack.jpeg
http://image.limshung.site/pics/Questions-Easy.jpeg`.split('\n')
//模拟书目
const map = Object.create(null)
for (let i = 0; i < 40; i++) {
    let title = getRandom(leetBookTitle);
    if (map[title]) {
        map[title]++
        title += `(${map[title]})`
    } else {
        map[title] = 1
    }
    leet_books.push(new LeetBook({
        title: title,
        author: getRandom(leetBookAuthor),
        chapter: Math.floor(Math.random() * 20) + 1,
        section: Math.floor(Math.random() * 100) + 1,
        tag: getRandom(leetBookTag),
        read: Math.floor(Math.random() * 20000),
        price: Math.floor((Math.random() * 100 - 75) / 10),
        image: getRandom(leetBookImage)
    }))
}