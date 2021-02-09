const path = require("path");
const PrerenderSpaPlugin = require("prerender-spa-plugin");
module.exports = {
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('iview')
            .loader('iview-loader')
            .options({ prefix: false })
        config.when(process.env.NODE_ENV === 'production', config => {
            externalCDN(config),
            config.plugin('prerender').use(
                // 预渲染插件配置
                new PrerenderSpaPlugin({
                  // 静态资源路径
                  staticDir: path.join(__dirname, "dist"),
                  // 预渲染路由
                  routes: ["/home","/app","/problemset/all"],
                })
              );
        },
            config => {//开发模式
                externalCDN(config)
                config.devServer.proxy({
                    '/api': {
                        target: 'http://localhost:7001',
                        changeOrigin: true,
                        ws: true,
                    }
                })
            })
    }
}

function externalCDN(config) {
    config.externals({
        vue: 'Vue',
        axios: 'axios',
        vuex: 'Vuex',
        'view-design': 'iview',
        'vue-router': 'VueRouter',
        // brace: 'ace',
        // 'mavon-editor': 'MavonEditor',
    })
    const cdn = {
        css: [
            'https://cdn.bootcdn.net/ajax/libs/view-design/4.4.0/styles/iview.min.css'
        ],
        js: [
            // vue
            'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
            // vue-router
            'https://cdn.bootcdn.net/ajax/libs/vue-router/3.4.8/vue-router.min.js',
            // vuex
            'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',
            // axios
            'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
            // iview.js
            'https://cdn.bootcdn.net/ajax/libs/view-design/4.4.0/iview.min.js',
            // //brace
            // 'https://cdn.jsdelivr.net/npm/brace@0.11.1/index.min.js',
            // 'https://cdn.jsdelivr.net/combine/npm/brace@0.11.1/ext/language_tools.min.js,npm/brace@0.11.1/mode/javascript.min.js,npm/brace@0.11.1/snippets/javascript.min.js,npm/brace@0.11.1/theme/chrome.min.js',
            // //mavon-editor  
            // "https://cdn.jsdelivr.net/npm/mavon-editor@2.9.1/dist/mavon-editor.min.js",
        ]
    }
    // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
    config.plugin('html')
        .tap(args => {
            args[0].cdn = cdn
            return args
        })
}