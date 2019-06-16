// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.prototype.$axios = axios

import Config from './components/config'//引用文件
Vue.prototype.Config = Config//挂载到Vue实例上面

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
