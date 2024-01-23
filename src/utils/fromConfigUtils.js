

/**
 * 根据 __config__.tag,设置对应触发事件配置
 * @param {Array} fieldsList 表单config配置表
 * @param {Array} onParamList 参数如下：
 * [{
 *   tag: 'el-input',
 *   on:{
 *        change:"changeEvent_001"
 *    } 
 * }]
 * 表示所有__config__.tag为'el-input'的组件，都配置change事件，触发事件的函数为“changeEvent_001”
 * 
*/
export function setMethodsByConfigTag(fieldsList, onParamList) {
  fieldsList.forEach((item,i) => {
    for (let index = 0; index < onParamList.length; index++) {
      const element = onParamList[index];
      if ( item.__config__.tag === element.tag ){
        item.on = element.on
      }
    }
  });

  return fieldsList;
}


//表单配置模板对应的submit api接口
const apiList = {
  1: '/huanji/submit',//换机
  2: '/zhibao/submit',//质保
  3: '/yanbao/submit',//延保
  4: '/yanbao/submit'
}

//根据模板类型获取对应提交接口名称
export function getAPINameByFormType(n){
  return apiList[n]
}