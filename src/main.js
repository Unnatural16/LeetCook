import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import Common from './Common.js'

Vue.config.productionTip = false
Vue.use(Common)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
