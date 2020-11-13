//此文件定义了全局变量、方法和api,同时模拟后台发送的数据
//以后将会实现与后台联动
exports.install = function (Vue) {
    Vue.prototype.GetProblemsTag = async function () {
        return problems_tag
    };
    Vue.prototype.GetProblemsTableHeader= async function(){
        return problems_table_header
    }
    Vue.prototype.GetProblemsTableData= async function(){
        return problems_table_data
    }
    Vue.prototype.GetProblemsTagNumber= async function(){
        return problems_tag_number
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
const problems_tag_number={
    数组:322,
    动态规划:246,
    字符串:225,
    数字:210,
    树:175
}

const problems_table_header =[
    {
        title: '',
        key: 'is_solved'
    },
    {
        title: '#',
        key: 'index'
    },
    {
        title: '题名',
        key: 'name'
    },
    {
        title: '题解',
        key: 'solved'
    },
    {
        title: '通过率',
        key: 'pass_rate'
    },
    {
        title: '出现频率',
        key: 'frequency'
    },
]
const problems_table_data =[
    {
        is_solved: true,
        index: '1',
        name: '两数之和',
        solved:'7669',
        pass_rate:'49.6%',
        frequency: 'Lock'
    },
]