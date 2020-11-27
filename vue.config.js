module.exports = {
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('iview')
            .loader('iview-loader')
            .options({ prefix: false })
    },
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:7001',
                    changeOrigin: true,
                    ws: true,
                }
            }
        }
    }
}