import {
  inputComponents, selectComponents, layoutComponents, formConf
} from '@/components/generator/config'

const DRAWING_ITEMS = 'drawingItems'
const DRAWING_ITEMS_VERSION = '1.2'
const DRAWING_ITEMS_VERSION_KEY = 'DRAWING_ITEMS_VERSION'
const DRAWING_ID = 'idGlobal'
const TREE_NODE_ID = 'treeNodeId'
const FORM_CONF = 'formConf'

//重定义配置的on事件
async function resetConfigEvent(configItem){
  configItem.forEach((item)=>{
    let itemList = getItemWhenResetConfigEvent(item, inputComponents);
    if(!itemList){
      getItemWhenResetConfigEvent(item, selectComponents);
    }
  });

  return configItem
}



async function getItemWhenResetConfigEvent(configItem,list){
  let oItem = null;
  list.forEach((item)=>{
    if(item.__config__.typeCode === configItem.__config__.typeCode){
      oItem = item;
      if(item.on){
        for(let key in item.on){
          configItem.on[key] = item.on[key]
        }
      }      
    }
  });  
  return oItem
}


export async function getDrawingList() {
  // 加入缓存版本的概念，保证缓存数据与程序匹配
  const version = localStorage.getItem(DRAWING_ITEMS_VERSION_KEY)
  if (version !== DRAWING_ITEMS_VERSION) {
    localStorage.setItem(DRAWING_ITEMS_VERSION_KEY, DRAWING_ITEMS_VERSION)
    saveDrawingList([])
    return []
  }

  const str = localStorage.getItem(DRAWING_ITEMS);
  //处理带有on事件的组件配置
  if(str){
    let res = JSON.parse(str);
    res = await resetConfigEvent(res);
    return Array.isArray(res) ? res : []
  }
  return []
}

export function saveDrawingList(list) {
  localStorage.setItem(DRAWING_ITEMS, JSON.stringify(list))
}

export function getIdGlobal() {
  const str = localStorage.getItem(DRAWING_ID)
  if (str) return parseInt(str, 10)
  return 100
}

export function saveIdGlobal(id) {
  localStorage.setItem(DRAWING_ID, `${id}`)
}

export function getTreeNodeId() {
  const str = localStorage.getItem(TREE_NODE_ID)
  if (str) return parseInt(str, 10)
  return 100
}

export function saveTreeNodeId(id) {
  localStorage.setItem(TREE_NODE_ID, `${id}`)
}

export function getFormConf() {
  const str = localStorage.getItem(FORM_CONF)
  if (str) return JSON.parse(str)
  return null
}

export function saveFormConf(obj) {
  localStorage.setItem(FORM_CONF, JSON.stringify(obj))
}
