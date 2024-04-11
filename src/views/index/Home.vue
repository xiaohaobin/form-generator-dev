<template>
  <div class="container">
    <!-- 左边模块sss --> 
    <div class="left-board">
      <div class="logo-wrapper" style="display: flex;">        
        <language></language>
      </div>
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              <!-- <svg-icon icon-class="component" /> -->
              {{ item.title }}
            </div>
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
            <div
                v-for="(element, index) in item.list"
                :key="index"
                class="components-item"
                @click="addComponent(element)"
              >
                <div class="components-body" v-if="element.__config__.typeCode !== undefined">
                    <div class="flex-center">
                        <svg-icon :icon-class="element.__config__.tagIcon" />
                    </div>
                    <div class="flex-center mt-5">
                        {{ element.__config__.label }}
                    </div>
                </div>
            </div>
             
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <!-- 左边模块eee --> 

    <!-- 中间布局模块sss --> 
    <div class="center-board">
      <div class="action-bar flex-space-between">
        <div class="flex-flex-start" v-if="formDesignerTempParams && formDesignerTempParams.tempName">
            <el-button style="color:#000;" type="text" class="tempTitleBox" :title="formDesignerTempParams.tempName + '('+ formDesignerTempParams.tempTypeName +')'">
            {{formDesignerTempParams.tempName + "("+ formDesignerTempParams.tempTypeName +")"}}
            </el-button>

            <div>
                <el-popover
                    placement="right"
                    width="250"
                    v-model="tempNameEditerVisible">
                    <div class="mb-5"><el-input v-model="formDesignerTempParams.tempName" size="mini"></el-input></div>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="tempNameEditerVisible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="tempNameEditerVisible = false">确定</el-button>
                    </div>
                    <el-link icon="el-icon-edit" class="tempTitleBoxBtn" slot="reference" title="点击编辑模板名称"></el-link>
                </el-popover>
            </div>
           
            
        </div>
        <div>
            <el-button icon="el-icon-s-home" type="text" @click="toIndex">
            {{ '返回首页' }}
            </el-button>       
            <el-button icon="el-icon-video-play" type="text" @click="run">
            运行
            </el-button>
            <el-button icon="el-icon-view" type="text" @click="showJson">
            查看json
            </el-button>
            <el-button icon="el-icon-download" type="text" @click="download">
            导出vue文件
            </el-button>
            <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="copy">
            复制代码
            </el-button>
            <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
            清空
            </el-button>
            <el-button icon="el-icon-view" type="text" @click="jumpPreview">
            {{ $t('preview') }}
            </el-button>
        </div>
        
        
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :size="formConf.size"
            :label-position="formConf.labelPosition"
            :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'"
          >
            <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup" :key="draggableDOMKey">
              <draggable-item
                v-for="(item, index) in drawingList"
                :key="item.renderKey"
                :drawing-list="drawingList"
                :current-item="item"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
              />
            </draggable>
            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>

      <el-divider />
      <div class="flex-center pb-15">
        <el-button plain class="mg-15" size="small">取消</el-button>
        <el-button type="primary" class="mg-15" size="small" @click="saveAllData">保存</el-button>
      </div>
    </div>

    <!-- 中间布局模块eee --> 
	 
    <!-- 右边模块sss --> 
    <right-panel
      :active-data="activeData"
      :form-conf="formConf"
      :show-field="!!drawingList.length"
      @tag-change="tagChange"
      @fetch-data="fetchData"
      :key="rightPanelDOMKey"
    />
    <!-- 右边模块eee --> 
	
    <form-drawer
      :visible.sync="drawerVisible"
      :form-data="formData"
      size="100%"
      :generate-conf="generateConf"
    />
    <json-drawer
      size="60%"
      :visible.sync="jsonDrawerVisible"
      :json-str="JSON.stringify(formData)"
      @refresh="refreshJson"
    />
    <code-type-dialog
      :visible.sync="dialogVisible"
      title="选择生成类型"
      :show-file-name="showFileName"
      @confirm="generate"
    />
    <input id="copyNode" type="hidden">
  </div>
</template>



<script>
import draggable from 'vuedraggable'//拖拽组件
import { debounce } from 'throttle-debounce'//限制函数的执行频率
import { saveAs } from 'file-saver'//实现前端文件下载保存
import ClipboardJS from 'clipboard'//粘贴板
import render from '@/components/render/render'
import FormDrawer from './FormDrawer'
import JsonDrawer from './JsonDrawer'
import RightPanel from './RightPanel'
import {
    inputComponents, selectComponents, layoutComponents, formConf
} from '@/components/generator/config'
import {
    exportDefault, beautifierConf, isNumberStr, titleCase, deepClone, isObjectObject
} from '@/utils/index'
import {
    makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/html'
import { makeUpJs } from '@/components/generator/js'
import { makeUpCss } from '@/components/generator/css'
import drawingDefalut from '@/components/generator/drawingDefalut'
import logo from '@/assets/logo.png'
import CodeTypeDialog from './CodeTypeDialog'
import DraggableItem from './DraggableItem'
import {
    getDrawingList, saveDrawingList, getIdGlobal, saveIdGlobal, getFormConf
} from '@/utils/db'
import loadBeautifier from '@/utils/loadBeautifier'

import language from '@/components/language.vue'



let beautifier
const emptyActiveData = { style: {}, autosize: {} }
let oldActiveId
let tempActiveData
const drawingListInDB = getDrawingList()
const formConfInDB = getFormConf()
const idGlobal = getIdGlobal()

export default {
    components: {
        draggable,
        render,
        FormDrawer,
        JsonDrawer,
        RightPanel,
        CodeTypeDialog,
        DraggableItem,
        language
    },
    data() {
        return {
            logo,
            idGlobal,
            formConf,
            inputComponents,
            selectComponents,
            layoutComponents,
            labelWidth: 100,
            drawingList: drawingDefalut,
            drawingData: {},
            activeId: drawingDefalut[0].formId,
            drawerVisible: false,
            formData: {},
            dialogVisible: false,
            jsonDrawerVisible: false,
            generateConf: null,
            showFileName: false,
            activeData: drawingDefalut[0],
            saveDrawingListDebounce: debounce(340, saveDrawingList),
            saveIdGlobalDebounce: debounce(340, saveIdGlobal),
            leftComponents: [
                {
                    title: '换机模板所需组件',
                    list: inputComponents
                },
                {
                    title: '其他拓展组件',
                    list: selectComponents
                },
                {
                    title: '其他类型研发中的组件',
                    list: layoutComponents
                }
            ],
            rightPanelDOMKey:+new Date() + '_right_panel',
            draggableDOMKey:+new Date() + '_draggable',
            formDesignerTempParams:{},//表单模板相关数据
            tempNameEditerVisible:false,
        }
    },
    computed: {
    },
    watch: {
    // eslint-disable-next-line func-names
        'activeData.__config__.label': function (val, oldVal) {
            if (this.activeData.placeholder === undefined || !this.activeData.__config__.tag || oldActiveId !== this.activeId) return;
            this.activeData.placeholder = this.activeData.placeholder.replace(oldVal, '') + val
        }, 
        //监听组串类组件变化子组件个数
        'activeData.__config__.groupNum': {
            async handler(val) {
                if (this.activeData.__config__.groupNum === undefined || this.activeData.__config__.typeCode !== 2 ) return;
                console.log(val,"activeData.__config__.groupNum 发生变化");
                await this.addOrDeleteChildrenForTypeCode2(val)   
            },
            immediate: true
        },   
        //监听自定义日期，时间选择类型变化,更新组件定位问题
        'activeData.__config__.isRange': {
            async handler(val,val2) {
                if(val2 === undefined) return;
                this.$nextTick(()=>{                
                    this.draggableDOMKey = +new Date() + '_draggable';                    
                })
            },
            immediate: true
        }, 
        //换机模板组件--日期时间选择器监听其是否超过当前日期时间，切换则重新渲染设计器表单中枢
        'activeData.__config__.noOverCurrDate': {
            async handler(val,val2) {
                if(val2 === undefined && !val) return;
                this.$nextTick(()=>{                
                    this.draggableDOMKey = +new Date() + '_draggable';                    
                })
            },
            immediate: true
        },      
        activeId: {
            handler(val) {
                oldActiveId = val
            },
            immediate: true
        },
        drawingList: {
            async handler(val) {
                // console.log(val,"gengxin drawingList")
                // //同步drawingList表单数据模型中组串类组件，所有子组件必须同样的配置，除了字段名
                await this.toSameConfigForTypeCode2(val)
                this.saveDrawingListDebounce(val)
                if (val.length === 0) this.idGlobal = 100

                this.$nextTick(()=>{                    
                    // this.draggableDOMKey = +new Date() + '_draggable';                    
                })
              
            },
            deep: true
        },
        idGlobal: {
            handler(val) {
                this.saveIdGlobalDebounce(val)
            },
            immediate: true
        }
    },
    created() {
        const _this = this;
        let formDesignerTempParams = this.$store.getters.getCurrTempInfo;
         //模板管理页面传递的数据进行会话存储
        this.setSessionStore('formDesignerTempParams',formDesignerTempParams);
        this.formDesignerTempParams = (JSON.stringify(formDesignerTempParams) === '{}' ? this.getSessionStore('formDesignerTempParams') : formDesignerTempParams)

        console.log('this.formDesignerTempParams', this.formDesignerTempParams)
        console.log('路由传参：', this.$route)
        // console.log( this.$t('validate.format', {attr:'邮箱'} ))
        // console.log( this.$t('prompt.info', {handle:"国际化拼接 "} ))

        //模板管理页面跳转进来的时候，重载提示弹出
        // window.onbeforeunload = function(event) {
        //     console.log('监听重新加载')
        //     if(_this.$route.name == 'home') event.returnValue = "重载页面提示弹窗";            
        // };
    },
    mounted() {
        console.log(this.$store.getters.getCurrTempInfo,"当前所选模板信息",this.$com.localStorage.getItem('currTempInfo'))
        
        if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
            this.drawingList = drawingListInDB
        } else {
            this.drawingList = drawingDefalut
        }
        this.activeFormItem(this.drawingList[0])
        if (formConfInDB) {
            this.formConf = formConfInDB
        }
        loadBeautifier(btf => {
            beautifier = btf
        })
        const clipboard = new ClipboardJS('#copyNode', {
            text: trigger => {
                const codeStr = this.generateCode()
                this.$notify({
                    title: '成功',
                    message: '代码已复制到剪切板，可粘贴。',
                    type: 'success'
                })
                return codeStr
            }
        })
        clipboard.on('error', e => {
            this.$message.error('代码复制失败')
        })
    },
    methods: {
        setObjectValueReduce(obj, strKeys, data) {
            const arr = strKeys.split('.')
            arr.reduce((pre, item, i) => {
                if (arr.length === i + 1) {
                    pre[item] = data
                } else if (!isObjectObject(pre[item])) {
                    pre[item] = {}
                }
                return pre[item]
            }, obj)
        },
        setRespData(component, resp) {
            const { dataPath, renderKey, dataConsumer } = component.__config__
            if (!dataPath || !dataConsumer) return
            const respData = dataPath.split('.').reduce((pre, item) => pre[item], resp)

            // 将请求回来的数据，赋值到指定属性。
            // 以el-tabel为例，根据Element文档，应该将数据赋值给el-tabel的data属性，所以dataConsumer的值应为'data';
            // 此时赋值代码可写成 component[dataConsumer] = respData；
            // 但为支持更深层级的赋值（如：dataConsumer的值为'options.data'）,使用setObjectValueReduce
            this.setObjectValueReduce(component, dataConsumer, respData)
            const i = this.drawingList.findIndex(item => item.__config__.renderKey === renderKey)
            if (i > -1) this.$set(this.drawingList, i, component)
        },
        fetchData(component) {
            const { dataType, method, url } = component.__config__//标识动态使用，或者根据方法，或者请求地址
            if (dataType === 'dynamic' && method && url) {
                this.setLoading(component, true)
                this.$axios({
                    method,
                    url
                }).then(resp => {
                    this.setLoading(component, false)
                    this.setRespData(component, resp.data)
                })
            }
        },
        setLoading(component, val) {
            const { directives } = component
            if (Array.isArray(directives)) {
                const t = directives.find(d => d.name === 'loading')
                if (t) t.value = val
            }
        },
        activeFormItem(currentItem) {
            // console.log(currentItem,"点击选择item", this.drawingList)
             //组串类多输入框条件则重定向activeData
            currentItem = this.resetActiveDataByTypeCode2(currentItem)

             //清除正则设置的currentItem __config__.regVal,以及active状态
            currentItem = this.clearStatusForRegList(currentItem)

            this.activeData = currentItem
            this.activeId = currentItem.__config__.formId
            
        },
        //清除正则设置的currentItem __config__.regVal,以及active状态
        clearStatusForRegList(currentItem){
            currentItem.__config__.regVal = undefined
            if(currentItem.__config__.regList){
                currentItem.__config__.regList.forEach((item)=>{
                    item.active = false;
                });
            }
            return currentItem;
        },
        //组串类多输入框条件则重定向activeData
        resetActiveDataByTypeCode2(currentItem){
            //组串类组父节点的时候
            if(currentItem.__config__.children && currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "rowFormItem"){
                //重定义父组件占比宽度
                currentItem.__config__.span = 24;
                // eslint-disable-next-line prefer-destructuring
                currentItem = currentItem.__config__.children[0]
                // console.log("转发至第一个子元素")
            } else if(currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "colFormItem"){//点击到组串类子节点非第一个的时候
                this.drawingList.forEach((ele)=>{
                    if(ele.__config__.children && ele.__config__.typeCode === 2 && ele.__config__.layout == "rowFormItem"){
                        ele.__config__.children.forEach((v,i)=>{
                            // eslint-disable-next-line prefer-destructuring
                            if(v.__config__.formId === currentItem.__config__.formId && i !== 0) currentItem = ele.__config__.children[0];
                        });
                    }
                });
            }
            return currentItem
        },
        onEnd(obj) {               
            if (obj.from !== obj.to) {
                this.fetchData(tempActiveData)
                this.activeData = tempActiveData
                this.activeId = this.idGlobal
            }
        },       
        //添加组件
        addComponent(item) {
            const clone = this.cloneComponent(item)
            this.fetchData(clone)
            this.drawingList.push(clone)
            this.activeFormItem(clone)
        },
        //克隆组件配置
        cloneComponent(origin,o,d) {
           
            const clone = deepClone(origin)
            const config = clone.__config__
            config.span = this.formConf.span /*生成代码时，会根据span做精简判断*/ 
            this.createIdAndKey(clone)
            clone.placeholder !== undefined && (clone.placeholder += config.label)
            tempActiveData = clone
            console.log(tempActiveData,"tempActiveData")
            return tempActiveData
        },
        /*创建组件id*/
        createIdAndKey(item) {
            const config = item.__config__
            config.formId = ++this.idGlobal
            config.renderKey = `${config.formId}${+new Date()}` /*改变renderKey后可以实现强制更新组件*/ 
            if (config.layout === 'colFormItem') {
                item.__vModel__ = `field${this.idGlobal}`
            } else if (config.layout === 'rowFormItem') {
                config.componentName = `row${this.idGlobal}`
                !Array.isArray(config.children) && (config.children = [])
                delete config.label // rowFormItem无需配置label属性
            }
            if (Array.isArray(config.children)) {
                config.children = config.children.map(childItem => this.createIdAndKey(childItem))
            }
            return item
        },
        AssembleFormData() {
            
            this.formData = {
                fields: deepClone(this.drawingList),
                ...this.formConf
            }
            console.log(this.formData,"this.formData")
        },
        generate(data) {
            const func = this[`exec${titleCase(this.operationType)}`]
            this.generateConf = data
            func && func(data)
        },
        //运行
        execRun(data) {
            this.AssembleFormData()
            this.drawerVisible = true
        },
        //导出
        execDownload(data) {
            const codeStr = this.generateCode()
            const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
            saveAs(blob, data.fileName)
        },
        //复制
        execCopy(data) {
            document.getElementById('copyNode').click()
        },
        //清空
        empty() {
            this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
                () => {
                    this.drawingList = []
                    this.idGlobal = 100
                }
            )
        },
        async drawingItemCopy(item, list) {
            await this.toSameConfigForTypeCode2(this.drawingList, true);
            let clone = deepClone(item)
            clone = this.createIdAndKey(clone)
            list.push(clone)
            this.activeFormItem(clone)
        },
        drawingItemDelete(index, list) {
            list.splice(index, 1)
            this.$nextTick(() => {
                const len = this.drawingList.length
                if (len) {
                    this.activeFormItem(this.drawingList[len - 1]);
                    //删除组件，更新右边面板属性
                    this.rightPanelDOMKey = +new Date() + '_right_panel';
                }
            })
        },
        generateCode() {
            const { type } = this.generateConf
            this.AssembleFormData()
            const script = vueScript(makeUpJs(this.formData, type))
            const html = vueTemplate(makeUpHtml(this.formData, type))
            const css = cssStyle(makeUpCss(this.formData))
            return beautifier.html(html + script + css, beautifierConf.html)
        },
        async showJson() {
            await this.toSameConfigForTypeCode2(this.drawingList, true);
            this.AssembleFormData()
            this.jsonDrawerVisible = true
        },
        async download() {
            await this.toSameConfigForTypeCode2(this.drawingList, true);
            this.dialogVisible = true
            this.showFileName = true
            this.operationType = 'download'
        },
        async run() {
            await this.toSameConfigForTypeCode2(this.drawingList, true);
            this.dialogVisible = true
            this.showFileName = false
            this.operationType = 'run'
        },
        async copy() {
            await this.toSameConfigForTypeCode2(this.drawingList, true);
            this.dialogVisible = true
            this.showFileName = false
            this.operationType = 'copy'
        },
        tagChange(newTag) {
            newTag = this.cloneComponent(newTag)
            const config = newTag.__config__
            newTag.__vModel__ = this.activeData.__vModel__
            config.formId = this.activeId
            config.span = this.activeData.__config__.span
            this.activeData.__config__.tag = config.tag
            this.activeData.__config__.tagIcon = config.tagIcon
            this.activeData.__config__.document = config.document
            if (typeof this.activeData.__config__.defaultValue === typeof config.defaultValue) {
                config.defaultValue = this.activeData.__config__.defaultValue
            }
            Object.keys(newTag).forEach(key => {
                if (this.activeData[key] !== undefined) {
                    newTag[key] = this.activeData[key]
                }
            })
            this.activeData = newTag
            this.updateDrawingList(newTag, this.drawingList)
        },
        updateDrawingList(newTag, list) {
            const index = list.findIndex(item => item.__config__.formId === this.activeId)
            if (index > -1) {
                list.splice(index, 1, newTag)
            } else {
                list.forEach(item => {
                    if (Array.isArray(item.__config__.children)) this.updateDrawingList(newTag, item.__config__.children)
                })
            }
        },
        refreshJson(data) {
            this.drawingList = deepClone(data.fields)
            delete data.fields
            this.formConf = data
        },
        jumpPreview(){
            this.$router.push(
                { name: "parser2" },
                ()=>{
                    location.reload();
                    // console.log("callbackk ")
                }
            );
            
            // this.$router.replace(
            //     { name: "parser2" }
            // );
        },
        toIndex(){
            this.$store.commit('setCurrTempInfo', {});
            // this.$com.localStorage.removeItem('currTempInfo')
            this.$router.push({ 
                name: 'indexPage'
            })
        },
        /**
         * 同步drawingList表单数据模型中组串类组件，所有子组件必须同样的配置，除了字段名
         * @param {Object} list drawingList变量数据
         * @param {Boolean} isOnlySetRegList 只单独设置组串类组件，同步其所有子元素正则
        */
        async toSameConfigForTypeCode2(list, isOnlySetRegList){
            list.forEach((currentItem)=>{
                let childrenList = currentItem.__config__.children;
                if(childrenList && currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "rowFormItem"){
                   
                    let firstItem = JSON.parse(JSON.stringify(childrenList[0]));
                    let first__vModel__ = firstItem.__vModel__;

                    currentItem.__config__.showByPrependField = firstItem.__config__.showByPrependField;//父节点的前置字段也跟第一子节点一致

                    childrenList.forEach((item,index)=>{
                        if(index > 0){        
                            if(isOnlySetRegList){
                                item.__config__.regList = firstItem['__config__']['regList'];
                            }else{
                                let noCopyKeyList = ['__vModel__', 'style', '__config__','__slot__'];
                                //定义根属性
                                //定义非第一个的其他组串子元素字段为 “字段”+ “__” + ${index}
                                item.__vModel__ = first__vModel__ + '__' + index;
                                // eslint-disable-next-line no-restricted-syntax
                                for(let key in firstItem){
                                    if(!noCopyKeyList.includes(key)) item[key] = firstItem[key];
                                }

                                //定义__config__对象
                                let noCopyKeyList2 = ['formId','fieldDescription','regList','renderKey','showLabel'];//regList特殊处理，深拷贝;showLabel默认设置不显示
                                item.__config__.showLabel = false;

                                // eslint-disable-next-line no-restricted-syntax
                                for(let i in firstItem.__config__){
                                    if(!noCopyKeyList2.includes(i)) item['__config__'][i] = firstItem['__config__'][i];
                                }
                            }                                               
                           
                        }
                    });
                    
                }
            });                 
            return list;           
        },
        //保存最终数据
        async saveAllData(){
            await this.toSameConfigForTypeCode2(this.drawingList, true);
            // console.log(this.drawingList,"最新数据")
            //判断配置表中所有组件字段名是否都根据服务器字段表来
            const bb = this.isBindServerField();
            console.log(bb,"判断配置表中所有组件字段名是否都根据服务器字段表来",this.drawingList,this.formDesignerTempParams)
            if(!bb) {
                this.$message({
                    message: '还有组件未绑定数据库字段',
                    type: 'warning'
                })
            }
        },
        //判断配置表中所有组件字段名是否都根据服务器字段表来
        isBindServerField(){
            let fieldList = [];
            const _fieldList = this.$store.getters.getFieldList;
            _fieldList.forEach((item)=>{
                fieldList.push( item.tableField )
            });
            let b = true;
            this.drawingList.forEach((currentItem)=>{
                if(currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "rowFormItem"){//组串类组件
                    let childrenList = currentItem.__config__.children;
                    if(!fieldList.includes(childrenList[0].__vModel__)) b = false                    
                }else if(currentItem.__config__.layout == "colFormItem" && currentItem.__config__.typeCode !== 10){//纯文本不需要绑定字段
                    if(!fieldList.includes(currentItem.__vModel__)) b = false
                }
            })
            return b
        },
        //添加或删除组串类组件子元素
        async addOrDeleteChildrenForTypeCode2(groupNum){
            this.drawingList.forEach((currentItem)=>{
                let childrenList = currentItem.__config__.children;
                if(childrenList && currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "rowFormItem"){
                   
                    let firstItem = JSON.parse(JSON.stringify(childrenList[0]));
                    let first__vModel__ = firstItem.__vModel__;
                    let secondItem = JSON.parse(JSON.stringify(childrenList[1]));
                    if(childrenList.length === groupNum) return;
                    let addCount = groupNum - childrenList.length;
                    let addList = [];
                    if(addCount > 0){//递增
                        for(let i = 0; i < addCount; i++){
                            let index = childrenList.length + i;
                            secondItem.__vModel__ = first__vModel__ + '__' + index;
                            secondItem.__config__.formId = ++this.idGlobal;
                            secondItem.__config__.renderKey = `${secondItem.__config__.formId}${+new Date()}`
                            addList.push(secondItem)
                        }
                        currentItem.__config__.children = childrenList.concat(addList);
                        console.log("++++",currentItem.__config__.children)
                    }else if(addCount < 0){//递减
                        let newList = [];
                        for(let i = 0; i < groupNum; i++){
                            newList.push( childrenList[i] )
                        }
                        currentItem.__config__.children = newList;
                        // console.log("----",currentItem.__config__.children)
                    }
                    // console.log(currentItem.__config__.children,"currentItem.__config__.children")
                }
            });                 
        },
        //模板管理页面传递的数据进行会话存储
        setSessionStore(name,params){
            let p = JSON.stringify(params);
            if(p !== '{}') this.$com.sessionStorage.setItem(name,JSON.stringify(params));
        },
        //模板管理页面传递的数据进行会话存储
        getSessionStore(name){
            let p = this.$com.sessionStorage.getItem(name);
            return JSON.parse(p)
        },
        
    }
}
</script>

<style lang='scss'>
@import '@/styles/home';
</style>
