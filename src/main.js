import Vue from 'vue'
// import App from './App.vue'
import App from './App'  // 导入时可以省略后缀
import router from './router'  // .代表相对路径的当前路径
// import store from '@/store.js'  // @表示src绝对路径
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import common from './common'   // 引入全局文件common.js
import dayjs from 'dayjs'
import * as echarts from 'echarts';

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.prototype.$common = common;    // 全局变量

Vue.prototype.echarts = echarts;
require('echarts-wordcloud');

new Vue({
  el: '#app',
  router: router,
  // store,
  render (fn) {  // 读取组件渲染给挂载点el
      return fn(App)
  }
});
