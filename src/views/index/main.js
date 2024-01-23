/* eslint-disable camelcase */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import '@/styles/common.css'
import '@/styles/index.scss'
import '@/icons'
import axios from 'axios'
import Tinymce from '@/components/tinymce/index.vue'

//使用引入方式
import ElementUI from 'element-ui'
import '@/styles/element-ui-oss-themes/index.css';//OSS 色调
import i18n from '@/i18n'

import xhb from '@/utils/xhb.plugin.js'

import com from '@/utils/common.js'


import store from '@/store/store.js';

import {
requestLocal, requestSelf, requestRoot,request3
} from '@/utils/request.js';

//防止注入尖括号
xhb.inputPreventXssEvent();

Vue.prototype.$request = request3;
Vue.prototype.$requestSelf = requestSelf;
Vue.prototype.$requestLocal = requestLocal;
Vue.prototype.$requestRoot = requestRoot;


//定义公用js
Vue.prototype.$xhb = xhb;//私有插件
Vue.prototype.$store = store;
Vue.prototype.$com = com;

Vue.component('tinymce', Tinymce)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

//全局赋值
Vue.prototype.$i8n = i18n;
//设置 element ui国际化组件同步跟随i18n更新
Vue.use(ElementUI, {
  size: 'default',
  i18n: (key, value) => i18n.t(key, value)
})

//定义是否本地开发
console.info('读取当前系统环境：',window.OSSFormDesigner);

Vue.prototype.isDevelopment = (window.OSSFormDesigner === 'development');
if(!Vue.prototype.isDevelopment) window.console.log = function(){}


new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
