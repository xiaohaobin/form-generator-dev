import Cookies from 'js-cookie'
import {
  requestLocal, requestSelf, requestRoot,request3
} from '@/utils/request.js';
import store from '@/store/store.js';
// import Axios from 'axios';
import axios from "axios";

//重设数据类型
const resetDataType = function (obj,dataType){
    let param;
    let lang = Cookies.get('language') || 'zh-CN';
    if(lang == 'zh-CN'){
      lang = 0;
    }else if(lang == 'zh-TW'){
       lang = 1;
    }else if(lang == 'en-US'){
       lang = 2;
    }
    //'application/x-www-form-urlencoded','multipart/form-data','application/json'
    if(dataType == "json"){//,'application/json' json格式
      obj.language = lang;
       param = JSON.parse( JSON.stringify(obj) );
    }else if(dataType == "formData"){//'multipart/form-data' formData格式
        param = new FormData();
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for(let k in obj){
            param.append(''+k, obj[k] )
        }
       param.append('language',lang);
    }else{//'application/x-www-form-urlencoded'传统数据（键值对形式）
        param = new URLSearchParams();
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for(let k in obj){
          param.append(''+k, obj[k] )
        }
        param.append('language',lang);
    }
  
    return param;
}

//搜索建议函数匹配
const elAutocompleteFn = {
  queryProp:'value',//查询属性
  restaurants:[],//查询的数据字典
  hasInit:false,
  /**
   * 根据关键字搜索查询
   * @param {String} queryString 关键字
   * @param {Function} cb 匹配回调函数 
  */
  querySearch(queryString, cb) {
    let {restaurants} = this;
    let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
    // 调用 callback 返回建议列表的数据
    cb(results);
  },
  //过滤器查询
  createFilter(queryString) {
    return (restaurant) => {
      return (restaurant[this.queryProp].toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
    };
  },
  /**
   * 初始化过滤器
   * @param {String} queryString 关键字
   * @param {Function} cb 匹配回调函数 
   * @param {any[]} mapList 查询的数据字典
   * @param {string} [queryProp='value'] , 查询属性
   * 
  */
  querySearchInit(queryString, cb, mapList=[],queryProp='value'){
    if(!this.hasInit){
      this.restaurants = mapList;
      this.queryProp = queryProp;
    }    
    this.querySearch(queryString, cb);
    this.hasInit = true;
  },
  resetDataInit(mapList=[],queryProp='value'){
    this.restaurants = mapList;
    this.queryProp = queryProp;
  }
}

//国家数据处理成select 支持的数据{label,value}
function countryListTranslate(list){
  let countryList = [];
  list.forEach((item)=>{
    item.children.forEach((ele)=>{
      ele.label = ele.txt;
      ele.value = ele.id;
    });
    countryList = countryList.concat(item.children)
  });
  return countryList;
}

//城市数据处理成select 支持的数据{label,value}
function cityListTranslate(list){
  let res = [];
  list.forEach((item)=>{
    res.push({
      label:item,
      value:item
    })
  });
  return res;
}


  export default {
    resetDataType,
    localStorage:window.localStorage,
    sessionStorage:window.sessionStorage,
    elAutocompleteFn,
    countryListTranslate,
    cityListTranslate
}