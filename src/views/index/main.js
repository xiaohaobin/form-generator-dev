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
// import '@/styles/element-ui-oss-themes/index.css';//OSS 色调
import '@/oss-theme/index.css';//OSS 色调
import i18n from '@/i18n'

import xhb from '@/utils/xhb.plugin.js'

import com from '@/utils/common.js'


import store from '@/store/store.js';

import {
requestLocal, requestSelf, requestRoot,request3
} from '@/utils/request.js';

//初始api接口
import {getRegularListApi, getFieldListApi} from '@/utils/api.js'

//防止注入尖括号
// xhb.inputPreventXssEvent();
//定义是否本地开发
console.info('读取当前系统环境：',window.OSSFormDesigner);

Vue.prototype.isDevelopment = (window.OSSFormDesigner === 'development');
if(!Vue.prototype.isDevelopment) window.console.log = function(){}

Vue.prototype.$request3 = request3;
Vue.prototype.$requestSelf = requestSelf;
Vue.prototype.$requestLocal = requestLocal;
Vue.prototype.$requestRoot = requestRoot;
//开发环境使用本地local接口，生产环境使用第三方接口
Vue.prototype.$request = Vue.prototype.isDevelopment ? requestLocal : request3;


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



//初始化所有字典数据
async function initAllLibData(){ 
  try {
    //使用await同步操作代替then回调异步操作，直接输出数据
    
    const regularListRes = await getRegularListApi( com.resetDataType({lang:'cn'}) );// com.resetDataType设置输入数据类型（参数1，为要传输的数据，参数2位数据类型,'json','formData',不传为键值对）
    if(regularListRes.result === 0) Vue.prototype.$store.commit('updateRegList', regularListRes.obj);
    // console.log(regularListRes,"regularListRes")

    //getFieldListApi
    //使用await同步操作代替then回调异步操作，直接输出数据
    const fieldListRes = await getFieldListApi();//直接接受一个对象，是传递json格式
    if(fieldListRes.result === 0) Vue.prototype.$store.commit('updateFieldList', fieldListRes.obj);
    // console.log(fieldListRes,"fieldListRes")
  } catch (error) {
    console.warn('request请求后报错', error);
  }
}

//初始化所有字典数据之后进行挂载APP
initAllLibData().then((res)=>{
  console.log('init...................')
  new Vue({
    router,
    i18n,
    render: h => h(App)
  }).$mount('#app')
})





// new Vue({
//   router,
//   i18n,
//   render: h => h(App)
// }).$mount('#app')
