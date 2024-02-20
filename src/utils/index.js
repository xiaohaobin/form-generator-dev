/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
export function indent(str, num, len = 2) {
  if (num === 0) return str
  const isLeft = num < 0; const result = []; let reg; let
    spaces = ''
  if (isLeft) {
    num *= -1
    reg = new RegExp(`(^\\s{0,${num * len}})`, 'g')
  } else {
    for (let i = 0; i < num * len; i++) spaces += ' '
  }

  str.split('\n').forEach(line => {
    line = isLeft ? line.replace(reg, '') : spaces + line
    result.push(line)
  })
  return result.join('\n')
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

function stringify(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (typeof val === 'function') {
      return `${val}`
    }
    return val
  })
}

function parse(str) {
  JSON.parse(str, (k, v) => {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval(`(${v})`)
    }
    return v
  })
}

export function jsonClone(obj) {
  return parse(stringify(obj))
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) { flags.push('g') }
    if (obj.multiline) { flags.push('m') }
    if (obj.ignoreCase) { flags.push('i') }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

const toStr = Function.prototype.call.bind(Object.prototype.toString)
export function isObjectObject(t) {
  return toStr(t) === '[object Object]'
}
export function isObjectArray(t) {
  return toStr(t) === '[object Array]'
}
export function isObjectNull(t) {
  return toStr(t) === '[object Null]'
}
export function isObjectUnde(t) {
  return toStr(t) === '[object Undefined]'
}


/*==================================================================针对换机申请模板需求进行设计的函数-----------------------------------------------------------------------*/
/**
 * 根据是否组串类组件，是否显示子元素的工具
 * @param {Object} currentItem 当前active 组件配置对象
 * @returns {String}
*/
export function showToolByCurrentItem(currentItem){  
  let toolShowStyle = 'display: initial;';
  if(currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "colFormItem"){
    toolShowStyle = 'display: none;';
  }
  return toolShowStyle
}

/**
 * 前置字段判断方法
 * @param {Array} list 组件配置数组列表数据
 * @param {Object} config 当前active 组件配置对象的__config__对象
 * @param {Object} currentItem 当前active 组件配置对象
 * @returns {String}
*/
export function showByPrependFieldFn(list,config,currentItem){
  let showStyle = 'display:block;';
  if(config.showByPrependField !== undefined && config.showByPrependField.length){
    let b = false;
    if(list === undefined) {
      return {
        show: true,
        style: 'display:block;'
      };
    }
    list.forEach((item)=>{
      let itemParam = get__vModel__And_showByPrependField(item);

      //大部分组件
      if(config.typeCode !== 2 && config.layout === "colFormItem"){
        if(itemParam.__vModel__ === config.showByPrependField) b = true;        
      }
      //组串类父组件
      if(config.typeCode === 2 && config.layout == "rowFormItem"){
        if(itemParam.__vModel__ === config.children[0].__config__.showByPrependField) b = true;
      }
      
       //组串类子组件(默认展示)
      if(config.typeCode === 2 && config.layout === "colFormItem") {
        b = true;
        // console.log(itemParam, config,"组串类子组件(默认展示)")
      }
    });
    showStyle = b ? 'display:block;' : 'display:none;'
  }

  //根据是否组串类子组件（第五个之后），设置其margin-top=0
  // showStyle += getMaginStyleByTypeCodeTo2(currentItem);
  return {
    style: showStyle,
    show: showStyle === 'display:block;'
  };
}

//根据组件配置，获取对应的字段名和前置，对象返回
function get__vModel__And_showByPrependField(item){
  //组串类父组件
  if(item.__config__.layout == "rowFormItem" && item.__config__.typeCode === 2){
    let currItem = item.__config__.children[0]
    return {
      __vModel__: currItem.__vModel__,
      showByPrependField: currItem.__config__.showByPrependField
    }
  }
  //组串类子组件
  if(item.__config__.layout == "colFormItem" && item.__config__.typeCode === 2){
    let lastSort = -1;
    lastSort = item.__vModel__.lastIndexOf('__');

    return {
      __vModel__: lastSort===-1 ? item.__vModel__ : (item.__vModel__.slice(0,lastSort)),//组串类子组件（非第一个）特殊处理
      // __vModel__: item.__vModel__,
      showByPrependField: item.__config__.showByPrependField
    }
  }
  //其他组件
  if(item.__config__.layout == "colFormItem" && item.__config__.typeCode !== 2){
    return {
      __vModel__: item.__vModel__,
      showByPrependField: item.__config__.showByPrependField
    }
  }

}

/**
 * 判断是否组串类，设置active态【为了服务表单设计器】
 * @param {Object} currentItem 当前active 组件配置对象
 * @param {Array} list 组件配置数组列表数据
 * @param {String} activeId 当前选中active id
 * @param {String} className 要拼接输入的className 
 * @returns {String}
*/
export function setActiveByTypeCodeTo2(currentItem, list, activeId, className) {
  // console.log(list,"lll")
  const config = currentItem.__config__
  if(currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "colFormItem"){
    if(activeId !== config.formId){//当前组串非active
      list.forEach((item)=>{
        if(item.__config__.typeCode === 2 && item.__config__.layout == "colFormItem"){//其他子组串组件
          if(activeId === item.__config__.formId) className = 'drawing-item active-from-item  type-code-2-children'          
        }
      });
    }
    if(currentItem.__config__.showLabel === false) className += ' type-code-2-children'
  }
  return className
}

/**
 * 判断是否组串类父级组件，设置特殊标识class
 * @param {Object} currentItem 当前active 组件配置对象
 * @returns {String}
*/
export function setStringClassByTypeCodeTo2(currentItem) {
  const config = currentItem.__config__
  let className = '';
  if(currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "rowFormItem"){
    className = ' type-code-2 scroll-effect'
  }
  return className
}

export function setStringWrapperClassByTypeCodeTo2(currentItem) {
  const config = currentItem.__config__
  let className = '';
  if(currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "rowFormItem"){
    className = ' type-code-2-wrapper'
  }
  return className
}

 //根据是否组串类子组件（第五个之后），设置其margin-top=0
export function getMaginStyleByTypeCodeTo2(currentItem){
  let s = '';
  const config = currentItem.__config__
  let lastIndex = currentItem.__vModel__.lastIndexOf('__');
  if(config.typeCode === 2 && config.layout === 'colFormItem' && lastIndex > 0){
    let num = currentItem.__vModel__.slice(lastIndex+2);
    if(num*1 > 3) s = 'margin-top:0px;'
  }
  return s
}

/**
 * 根据是否组串类组件，返回组串类组件父元素和子元素的 对应的className
 * @param {Object} currentItem 当前active 组件配置对象
 * @returns {String}
*/
export function setClassNameForTypeCode2(currentItem){  
  let className = '';
  if(currentItem.__config__.typeCode === 2){
    if(currentItem.__config__.layout == "colFormItem" && currentItem.__config__.showLabel === false){
      className = ' type-code-2-children ';
    }else if(currentItem.__config__.layout == "rowFormItem"){
      className = ' type-code-2 scroll-effect';
    }    
  }
  return className
}

 //设置自定义换机模板日期选择组件，选择日期是否可超当前日期
 export function set_noOverCurrDate_by_typeCode6(confClone){
  if([5,6].includes( confClone.__config__.typeCode )){
    if(confClone.__config__.noOverCurrDate){
      confClone['picker-options'] = {
          disabledDate:function(time) {
              // return time.getTime() > Date.now() - 8.64e7; // 选择今天以及今天以前的日期
              // return time.getTime() < Date.now() - 8.64e7;//设置选择今天及今天之后的日期
              return time.getTime() > Date.now() - 8.64e6;//设置选择今天以及今天以前的日期
          }
      };
    }
  }
  return confClone
}