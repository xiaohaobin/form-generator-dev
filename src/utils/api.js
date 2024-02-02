// import Cookies from 'js-cookie'
import {
  requestLocal, requestSelf, requestRoot,request3
} from '@/utils/request.js';
// import store from '@/store/store.js';
// import axios from "axios";
import {
    resetDataType
  } from '@/utils/common.js';


const isDev = window.OSSFormDesigner === 'development';//开发环境
const Resquest = isDev ? requestLocal : request3;

/**
 * 柯里化 axios請求成功返回輸出請求數據================================================================================================================================
 * 需要依賴Axios
 */
/**
 * 柯里化函数
 * @param {function} fn 需要要执行的函数
 * @param {boolean} isLoading 页面导航栏是否展示loading条
 * @returns function
 */
let promisify = function promisify(fn) {
    let isLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  
    return async function () {
      let obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const resFn = await fn(obj)
      return resFn
    };
  };
  
  
  
  const PA_Request = promisify(Resquest, true);
  // const PA_Request = promisify2(requestLocal, true);
  const PA_request_fn = async (url, data, options = {}) => {  
      const defaultOptions = {
        // 请求方法, 默认get
        method: 'GET',
        // 是否显示loading
        isShowLoading: true,
        // 接口报错是否展示toast
        isShowToast: true,
      };
      const _options = { ...defaultOptions, ...options};
      
      const params = {
        url,
        data,
        method: _options.type,
        noVerify : _options.noVerify,
      };
      //noVerify 参数存在的情况，无需校验后端返回数据格式
      try{
          const res = await PA_Request(params);
        //   console.log('request:', res, params);
          
          if (res.result !== 0 && _options.noVerify === undefined) {
            console.warn(`运行时错误提示,接口为${url}`);
            // eslint-disable-next-line no-throw-literal
            throw {
              status: -1,
              msg: `系统错误${res.msg}，请稍后再试～`,//打印的是後臺的msg字段
            };
          }
          
          return Promise.resolve(res);
      }catch(e){
          //TODO handle the exception
          console.warn('request请求后报错', e);
          
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            msg: `调用接口失败,接口为${url}, ${JSON.stringify(e)}`,
            error:e,
          });
      // eslint-disable-next-line no-empty
      }finally {
     
      }
  }
  //=======================================================================================================================================================================
  // const hostName = 'http://20.60.5.235:54467/json/form-generator/';
  // const response = await axios.get(hostName + '/regular/allList.json', { 
  //   params:{ page: 1, limit: 20 },
  //   headers: {'X-Custom-Header': 'mmp'}, 
  // });
  // console.log(response,"..................")


  //定义接口调用==================================================================== =================================================

  //请求正则所有列表
  export const getRegularListApi = data => PA_request_fn('regular/allList.json', data, { type: 'GET' });
  //请求正则分页列表
  export const getRegularListApiByPage = data => PA_request_fn('regular/list.json', data, { type: 'GET' });
  //正则删除
  export const delRegular = data => PA_request_fn('regular/delRegular', data, { type: 'POST' });
  //正则新增
  export const addRegular = data => PA_request_fn('regular/addRegular', data, { type: 'POST' });
  //正则编辑
  export const updateRegular = data => PA_request_fn('regular/updateRegular', data, { type: 'POST' });


  //请求字段所有列表
  export const getFieldListApi = data => PA_request_fn('field/allList.json', data, { type: 'GET' });
  //请求字段分页列表
  export const getFieldListApiByPage = data => PA_request_fn('field/list.json', data, { type: 'GET' });
  
    // 请求数据库表列表
  export const getDatabaseTableList = data => PA_request_fn('field/databaseTableList.json', data, { type: 'GET' });  
  //字段删除
  export const delField = data => PA_request_fn('field/delField', data, { type: 'POST' });
  //字段新增
  export const addField = data => PA_request_fn('field/addField', data, { type: 'POST' });
  //字段编辑
  export const updateField = data => PA_request_fn('field/updateTemplate', data, { type: 'POST' });


  //请求模板分页列表
  export const getTemplateListApiByPage = data => PA_request_fn('template/list.json', data, { type: 'GET' });
  //模板删除
  export const delTemplate = data => PA_request_fn('template/delTemplate', data, { type: 'POST' });
  //模板新增
  export const addTemplate = data => PA_request_fn('template/addTemplate', data, { type: 'POST' });
  //模板编辑
  export const updateTemplate = data => PA_request_fn('template/updateTemplate', data, { type: 'POST' });


  //请求公共API所有列表
  export const getCommonAPIListApi = data => PA_request_fn('commonAPI/allList.json', data, { type: 'GET' });
  //请求公共API分页列表
  export const getCommonAPIListApiByPage = data => PA_request_fn('commonAPI/list.json', data, { type: 'GET' });  
  //公共API删除
  export const delCommonAPI = data => PA_request_fn('commonAPI/delCommonAPI', data, { type: 'POST' });
  //公共API新增
  export const addCommonAPI = data => PA_request_fn('commonAPI/addCommonAPI', data, { type: 'POST' });
  //公共API编辑
  export const updateCommonAPI = data => PA_request_fn('commonAPI/updateCommonAPI', data, { type: 'POST' });


  //无需验证的公共接口
  //请求国家列表
  export const getCountryListApi = data => PA_request_fn('common/country.json', data, { type: 'GET', noVerify: true});

  //请求城市列表
  export const getCityListApi = data => PA_request_fn('common/city.json', data, { type: 'GET', noVerify: true});


  