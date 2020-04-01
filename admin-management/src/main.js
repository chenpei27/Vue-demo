// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { post, get } from './utils/http'
import 'lib-flexible'
import '@vant/touch-emulator';
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
// Vue.config.productionTip = false

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
