import { baseURL } from '@/config'
import axios from "axios";
import xhb from "@/utils/xhb.plugin.js";//自定义的
// console.log("request.js",xhbCom)
import Cookies from 'js-cookie'
import { Loading,Message } from 'element-ui';//element UI

import i18n from '@/i18n'
// console.log(i18n.messages[i18n.locale],"i18n")
let t = i18n.messages[i18n.locale];//語言配置




function premiseFn(fn){
  return new Promise((resolve, reject)=>{
    let obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // Axios
    fn(obj).then((res)=>{  
      resolve(res);
    }).err((err)=>{
      reject(err);
    })
  }) 
}

const getLanguageFn = function (){
  let lang = Cookies.get('language') || 'zh-CN';
  if(lang == 'zh-CN'){
    lang = 0;
  }else if(lang == 'zh-TW'){
     lang = 1;
  }else if(lang == 'en-US'){
     lang = 2;
  }
  return lang;
}
//封装axios请求函数
/**
 * 相关配置参考：
 *
 {
   // `url` 是用于请求的服务器 URL
   url: "/user",

   // `method` 是创建请求时使用的方法
   method: "get", // 默认是 get

   // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
   // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
   baseURL: "https://some-domain.com/api/",

   // `transformRequest` 允许在向服务器发送前，修改请求数据
   // 只能用在 "PUT", "POST" 和 "PATCH" 这几个请求方法
   // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
   transformRequest: [function (data) {
     // 对 data 进行任意转换处理

     return data;
   }],

   // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
   transformResponse: [function (data) {
     // 对 data 进行任意转换处理

     return data;
   }],

   // `headers` 是即将被发送的自定义请求头
   headers: {"X-Requested-With": "XMLHttpRequest"},

   // `params` 是即将与请求一起发送的 URL 参数
   // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
   params: {
     ID: 12345
   },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
   // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
   paramsSerializer: function(params) {
     return Qs.stringify(params, {arrayFormat: "brackets"})
   },

   // `data` 是作为请求主体被发送的数据
   // 只适用于这些请求方法 "PUT", "POST", 和 "PATCH"
   // 在没有设置 `transformRequest` 时，必须是以下类型之一：
   // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
   // - 浏览器专属：FormData, File, Blob
   // - Node 专属： Stream
   data: {
     firstName: "Fred"
   },

   // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
   // 如果请求花费了超过 `timeout` 的时间，请求将被中断
   timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
   withCredentials: false, // 默认的

   // `adapter` 允许自定义处理请求，以使测试更轻松
   // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
   adapter: function (config) {

   },

   // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
   // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
   auth: {
     username: "janedoe",
     password: "s00pers3cret"
   },

   // `responseType` 表示服务器响应的数据类型，可以是 "arraybuffer", "blob", "document", "json", "text", "stream"
   responseType: "json", // 默认的

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
   xsrfCookieName: "XSRF-TOKEN", // default

   // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
   xsrfHeaderName: "X-XSRF-TOKEN", // 默认的

   // `onUploadProgress` 允许为上传处理进度事件
   onUploadProgress: function (progressEvent) {
     // 对原生进度事件的处理
   },

   // `onDownloadProgress` 允许为下载处理进度事件
   onDownloadProgress: function (progressEvent) {
     // 对原生进度事件的处理
   },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
   maxContentLength: 1500,

   // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
   validateStatus: function (status) {
     return status &gt;= 200 &amp;&amp; status &lt; 300; // 默认的
   },

   // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
   // 如果设置为0，将不会 follow 任何重定向
   maxRedirects: 5, // 默认的

   // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
   // `keepAlive` 默认没有启用
   httpAgent: new http.Agent({ keepAlive: true }),
   httpsAgent: new https.Agent({ keepAlive: true }),

   // "proxy" 定义代理服务器的主机名称和端口
   // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
   // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
   proxy: {
     host: "127.0.0.1",
     port: 9000,
     auth: : {
       username: "mikeymike",
       password: "rapunz3l"
     }
   },

   // `cancelToken` 指定用于取消请求的 cancel token
   // （查看后面的 Cancellation 这节了解更多）
   cancelToken: new CancelToken(function (cancel) {
   })
 }
 */
// eslint-disable-next-line func-names
let errorMessageLayer = function (){
  Message({
    type:"error",
    message:i18n.messages[i18n.locale].utils.requestError,
    duration:1500
  });

}

//请求失败错误处理
// eslint-disable-next-line func-names
let requestErrorTodo = function (aaa){
  if(aaa.data.result == "1"){//失败
    if(aaa.data.hint_txt){
      Message({
        type:"error",
        message:aaa.data.hint_txt,
        duration:1500
      });
    }else{
      errorMessageLayer();
    }
   
  }else if(aaa.data.result == "2"){//超时
    // Message.error('请求超时，请稍后再试')
    Message({
      type:"error",
      message:i18n.messages[i18n.locale].utils.requestOverTime,
      duration:1500
    });
  }

  if(aaa.data.result == '0' && aaa.data.hint_txt){
     Message({
       type:"success",
       message: aaa.data.hint_txt,
       duration:1500
     });
  }
};



let loading = null;
let loadingOption = {
    // lock: true,
    text: 'Loading',
    // spinner: 'el-icon-loading',
    // background: 'rgba(0, 0, 0, 0.7)',
    // fullscreen:true
  };

 //请求地址： “/api” 映射菜鸟地址的 “https://www.runoob.com/”
export async function request(config) {

  let instance = axios.create({
    baseURL: '/api', // 通过config/index.js文件中proxyTable配置映射代理
    timeout: 15 * 1000,
    headers: {'X-Custom-Header': 'mmp'},//设置请求头
    params:{//设置默认请求参数
      userId:333
    }
  })

  // axios的拦截器(类似python的中间件的request)
  instance.interceptors.request.use(aaa => {

      loading = Loading.service(loadingOption);
    // 多用于登录时的cookies判断
    return aaa
  }, err => {
    console.log(err);
  })
  // 数据返回拦截
  instance.interceptors.response.use(aaa => {
    // 多用于登录时的cookies判断

     loading.close();
    return aaa.data
  }, err => {
    loading.close();
    console.log(err);
  })
  const lastRes = await instance(config)
  // 直接返回
  return lastRes
}


/**
 * 请求地址：第三方地址
 * @param {Object} config
 * @param {*} noLoading 是否不显示加载圈
 */
export function request3(config,noLoading) {
  let instance = axios.create({
    baseURL: '/jianyong', // 通过config/index.js文件中proxyTable配置映射代理
    timeout: 15 * 1000,
    headers:{
      // 'Content-Type':'application/x-www-form-urlencoded',
      /**
       * application/x-www-form-urlencoded
       * 传统格式，例子如下
       * let param = new URLSearchParams()
        param.append('username', 'admin')
        param.append('pwd', 'admin')
        axios({
            method: 'post',
            url: '/api/lockServer/search',
            data: param
        })
       */
      // 'Content-Type': 'multipart/form-data',//表单上传formData格式数据
      // 'Content-Type': 'application/json',//json格式，默认
    },
    params:{//设置默认请求参数
      // userId:222
       language:getLanguageFn(),
    }
  })

  // axios的拦截器(类似python的中间件的request)
  instance.interceptors.request.use(aaa => {    
    if(noLoading === undefined) loading = Loading.service(loadingOption);    
    return aaa
  }, err => {
    console.log(err);
  })
  // 数据返回拦截
  instance.interceptors.response.use(aaa => {
    if(noLoading === undefined) loading.close();
    aaa.data = JSON.parse( JSON.stringify( aaa.data) );    
    if(config.noVerify === undefined)  requestErrorTodo(aaa);
    return aaa.data;
  }, err => {
    if(noLoading === undefined) loading.close();    
    errorMessageLayer();
  });

  // 直接返回
  return instance(config)
}

//请求本地cgi-bin下的文件
export async function requestLocal(config,noLoading) {
  let instance = axios.create({
    // baseURL: 'cgi-bin',
    baseURL: '/local',//项目外边的cgi-bin
    timeout: 15 * 1000,
    headers:{

    },
    params:{//设置默认请求参数
      // author:"xhb",
      language:getLanguageFn(),
    }
  })

  // axios的拦截器(类似python的中间件的request)
  instance.interceptors.request.use(aaa => {    
     if(noLoading === undefined) loading = Loading.service(loadingOption);
    return aaa
  }, err => {
    console.log(err);
  })
  // 数据返回拦截
  instance.interceptors.response.use(aaa => {    
    if(noLoading === undefined) loading.close();
    aaa.data = JSON.parse( JSON.stringify( aaa.data) );    
    if(config.noVerify === undefined)  requestErrorTodo(aaa);
    return aaa.data;
    
  }, err => {
     if(noLoading === undefined) loading.close();
     errorMessageLayer();
  });
  
  const lastRes = await instance(config)
  // 直接返回
  return lastRes
}


/**
 * 请求--模拟接口（主要接口）
 * ==========================================================================================
*/
export async function requestMock(config,noLoading) {
  let instance = axios.create({
    baseURL,
    timeout: 15 * 1000,
    headers:{

    },
    params:{//设置默认请求参数
      // author:"xhb",
      language:getLanguageFn(),
    }
  })

  // axios的拦截器(类似python的中间件的request)
  instance.interceptors.request.use(aaa => {    
     if(noLoading === undefined) loading = Loading.service(loadingOption);
    return aaa
  }, err => {
    console.log(err);
  })
  // 数据返回拦截
  instance.interceptors.response.use(aaa => {    
    if(noLoading === undefined) loading.close();
    aaa.data = JSON.parse( JSON.stringify( aaa.data) );    
    if(config.noVerify === undefined)  requestErrorTodo(aaa);
    return aaa.data;
    
  }, err => {
     if(noLoading === undefined) loading.close();
     errorMessageLayer();
  });
  
  const lastRes = await instance(config)
  // 直接返回
  return lastRes
}

// =========================================================================================

export async function requestRoot(config,noLoading) {
  let instance = axios.create({
    baseURL: '/root',
    // baseURL: '../cgi-bin',//项目外边的cgi-bin
    timeout: 15 * 1000,
    headers:{

    },
    params:{//设置默认请求参数
      // author:"xhb",
      language:getLanguageFn(),
    }
  })

  // axios的拦截器(类似python的中间件的request)
  instance.interceptors.request.use(aaa => {
    if(noLoading === undefined) loading = Loading.service(loadingOption);
    return aaa
  }, err => {
    console.log(err);
  })
  // 数据返回拦截
  instance.interceptors.response.use(aaa => {
    if(noLoading === undefined) loading.close();
    aaa.data = JSON.parse( JSON.stringify( aaa.data) );
    if(config.noVerify === undefined)  requestErrorTodo(aaa);
    return aaa.data;
  }, err => {
     if(noLoading === undefined) loading.close();
     errorMessageLayer();
  });

  // 直接返回
  const lastRes = await instance(config)
  // 直接返回
  return lastRes
}

//请求改项目内的
export async function requestSelf(config,noLoading) {
  let instance = axios.create({
    baseURL: '',
    // baseURL: '../cgi-bin',//项目外边的cgi-bin
    timeout: 15 * 1000,
    headers:{

    },
    params:{//设置默认请求参数
      // author:"xhb",
      language:getLanguageFn(),
    }
  })

  // axios的拦截器(类似python的中间件的request)
  instance.interceptors.request.use(aaa => {
    if(noLoading === undefined) loading = Loading.service(loadingOption);
    return aaa
  }, err => {
    console.log(err);
  })
  // 数据返回拦截
  instance.interceptors.response.use(aaa => {
    if(noLoading === undefined) loading.close();
    aaa.data = JSON.parse( JSON.stringify( aaa.data) );
    if(config.noVerify === undefined)  requestErrorTodo(aaa);
    return aaa.data;
  }, err => {
     if(noLoading === undefined) loading.close();
     errorMessageLayer();
  });

  const lastRes = await instance(config)
  // 直接返回
  return lastRes
}



//请求本地自主拼接下的文件
export async function request_local2(config) {
  let instance = axios.create({
    // baseURL: '/cgi-bin',
    baseURL: '',
    timeout: 15 * 1000,
    headers:{
      'X-Custom-Header': 'xhb'
    },
    params:{//设置默认请求参数
      author:"xhb"
    }
  })

  // axios的拦截器(类似python的中间件的request)
  instance.interceptors.request.use(aaa => {
    loading = Loading.service(loadingOption);
    // 多用于登录时的cookies判断
    return aaa
  }, err => {
    console.log(err);
  })
  // 数据返回拦截
  instance.interceptors.response.use(aaa => {
    // 多用于登录时的cookies判断


    loading.close();
    if(config.noVerify === undefined)  requestErrorTodo(aaa);
    return aaa.data
  }, err => {
    loading.close();
    errorMessageLayer();
  })
  const lastRes = await instance(config)
  // 直接返回
  return lastRes
}
