import i18n from '@/i18n'

// 表单属性【右面板】
export const formConf = {
    formRef: 'elForm',
    formModel: 'formData',
    size: 'medium',
    labelPosition: 'top',
    labelWidth: 100,
    formRules: 'rules',
    gutter: 15,
    disabled: false,
    span: 24,
    formBtns: true
}
/**
 * 其中__config__和__slot__是本项目自定义的属性，自定义属性的格式均为__XXX__；
    其余属性与element ui组件属性对应；
 * 
*/

// 输入型组件 【左面板】typeCode 0~99
export const inputComponents = [
    {
    // 组件的自定义配置
        __config__: {
            label: i18n.messages[i18n.locale].singleLineOfText,//'单行文本',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'el-input',
            tagIcon: 'input',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            document: 'https://element.eleme.cn/#/zh-CN/component/input',
            // 正则校验规则
            regList: [],
            typeText: '普通文本输入框',
            typeCode: 1,
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
        },
        // 组件的插槽属性
        __slot__: {
            prepend: '',
            append: ''
        },
        // 其余的为可直接写在组件标签上的属性
        placeholder: '请输入',
        style: { width: '100%' },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
    },
  
    //-----------------------------------------------------------------------------------------------------------
    {
        "__config__": {
            "label": '多输入框组件',
          "layout": "rowFormItem",
          "tagIcon": "row",
          "layoutTree": true,
          "document": "https://element.eleme.cn/#/zh-CN/component/layout#row-attributes",
          "span": 24,
          "componentName": "row101",
          "typeCode": 2,
          "children": [{
            "__config__": {
                label: "组串名称",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              required: true,
              "layout": "colFormItem",
              "span": 6,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "typeText": "组串名称",
              "typeCode": 2,
              "groupNum": 2,
              fieldDescription: "",
              showByPrependField:undefined,//前值字段
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入组串名称",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "prefix-icon": "",
            "suffix-icon": "",
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": false,
            "__vModel__": "field"+ (+new Date())
          }, {
            "__config__": {
                label: "组串名称",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              required: true,
              "layout": "colFormItem",
              "span": 6,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "typeText": "组串名称",
              "typeCode": 2,
              "groupNum": 2,
              fieldDescription: "",
              showByPrependField:undefined,//前值字段
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入组串名称",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "prefix-icon": "",
            "suffix-icon": "",
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": false,
            "__vModel__": "field"+ (+new Date()+1)
          }]
        },
        "type": "default",
        "justify": "start",
        "align": "top"
      },
    //-------------------------------------------------------------------------------------------------------
    {
        __config__: {
            label: '多行文本',
            labelWidth: null,
            showLabel: true,
            tag: 'el-input',
            tagIcon: 'textarea',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: [],
            changeTag: true,
            typeText: '多文本输入框',
            typeCode: 3,
            document: 'https://element.eleme.cn/#/zh-CN/component/input',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
        },
        type: 'textarea',
        placeholder: '请输入',
        autosize: {
            minRows: 4,
            maxRows: 4
        },
        style: { width: '100%' },
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
    },    
    {
        __config__: {
            label: '是否选择',
            labelWidth: null,
            showLabel: true,
            tag: 'el-radio-group',
            tagIcon: 'radio',
            changeTag: true,
            defaultValue: undefined,
            layout: 'colFormItem',
            span: 24,
            optionType: 'default',
            regList: [],
            required: true,
            border: false,
            document: 'https://element.eleme.cn/#/zh-CN/component/radio',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:4,
        },
        __slot__: {
            options: [{
                label: '是',
                value: 1
            }, {
                label: '否',
                value: 0
            }]
        },
        style: {},
        size: 'medium',
        disabled: false,
        dataSources:'1',//数据来源：1，自行录入，2，通过服务器端
    },
    {
        __config__: {
            label: '时间选择器',
            tag: 'el-time-picker',
            tagIcon: 'time',
            defaultValue: null,
            span: 24,
            showLabel: true,
            layout: 'colFormItem',
            labelWidth: null,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/time-picker',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:5,
            isRange: false,
        },
        placeholder: '请选择',
        style: { width: '100%' },
        disabled: false,
        clearable: true,
        // 'picker-options': {
        //     selectableRange: '00:00:00-23:59:59'
        // },
        'is-range': false,
        'range-separator': '~',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        format: 'HH:mm:ss',
        'value-format': 'HH:mm:ss'
    },
    {
        __config__: {
            label: '日期选择器',
            tag: 'el-date-picker',
            tagIcon: 'date',
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            span: 24,
            layout: 'colFormItem',
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:6,
            isRange: false,
            noOverCurrDate:true,//最大日期不超过当前日期
        },
        placeholder: '请选择',
        type: 'date',
        style: { width: '100%' },
        disabled: false,
        clearable: true,
        'is-range': false,
        'range-separator': '~',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        format: 'yyyy-MM-dd',
        'value-format': 'yyyy-MM-dd',
        readonly: false,
        editable:false
    },
    {
        __config__: {
            label: '下拉选择',
            showLabel: true,
            labelWidth: null,
            tag: 'el-select',
            tagIcon: 'select',
            layout: 'colFormItem',
            span: 24,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/select',
            typeCode: 7,
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
        },
        __slot__: {
            options: [{
                label: '选项一',
                value: 1
            }, {
                label: '选项二',
                value: 2
            }]
        },
        placeholder: '请选择',
        style: { width: '100%' },
        clearable: true,
        disabled: false,
        filterable: false,
        multiple: false,
        dataSources:'1',//数据来源：1，自行录入，2，通过服务器端
    },
    {
    // 组件的自定义配置
        __config__: {
            label: '展示文本',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'el-input',
            tagIcon: 'input',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            document: 'https://element.eleme.cn/#/zh-CN/component/input',
            // 正则校验规则
            regList: [],
            typeText: '展示文本',
            typeCode: 8,
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
        },
        // 组件的插槽属性
        __slot__: {
            prepend: '',
            append: ''
        },
        // 其余的为可直接写在组件标签上的属性
        placeholder: undefined,
        style: { width: '100%' },
        clearable: undefined,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: undefined,
        'show-word-limit': undefined,
        readonly: true,
        disabled: false
    },
    {
        __config__: {
            label: '附件上传',
            tag: 'el-upload',
            tagIcon: 'upload',
            layout: 'colFormItem',
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            required: true,
            span: 24,
            showTip: true,
            buttonText: '点击上传',
            regList: [],
            changeTag: true,
            fileSize: 2,
            sizeUnit: 'MB',
            document: 'https://element.eleme.cn/#/zh-CN/component/upload',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:9,
            uploadDes:'',//上传说明
        },
        __slot__: {
            'list-type': true
        },
        action: 'https://jsonplaceholder.typicode.com/posts/',
        disabled: false,
        accept: '',
        name: 'file',
        'auto-upload': true,
        'list-type': 'text',
        multiple: false,
        
    },
    {
        __diyComponentsName__: 'diy-text',//自定义组件名
	    __config__: {
	        label: '纯文本',
	        showLabel: false,
	        changeTag: true,
	        // labelWidth: null,
	        tag: 'el-link',
            tagIcon: 'input',
	        span: 24,
	        layout: 'colFormItem',
            isShowColorSelect: true,//是否显示颜色选择下拉框
            isFontWeightBold: true, //是否加粗
            noCursorPointer: true,//没有手指鼠标
            isText: true,//是否纯文本
            typeCode:10,
            color:"#000",
	    },
	    __slot__: {
	        // default: '随便输入什么2.0',
            text: '随便输入什么'
	    },        
	    type: undefined,
	    underline: false,
        
    }, 
   
]

// 选择型组件 【左面板】typeCode 100~200
export const selectComponents = [
    {
        __config__: {
            label: '密码',
            showLabel: true,
            labelWidth: null,
            changeTag: true,
            tag: 'el-input',
            tagIcon: 'password',
            defaultValue: undefined,
            layout: 'colFormItem',
            span: 24,
            required: true,
            regList: [],
            document: 'https://element.eleme.cn/#/zh-CN/component/input',
            typeCode: 104,
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
        },
        __slot__: {
            prepend: '',
            append: ''
        },
        placeholder: '请输入',
        'show-password': true,
        style: { width: '100%' },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
    },
    {
        __config__: {
            label: '计数器',
            showLabel: true,
            changeTag: true,
            labelWidth: null,
            tag: 'el-input-number',
            tagIcon: 'number',
            defaultValue: undefined,
            span: 24,
            layout: 'colFormItem',
            required: true,
            regList: [],
            document: 'https://element.eleme.cn/#/zh-CN/component/input-number',
            typeCode: 105,
            fieldDescription:'',//字段说明,
            showByPrependField:undefined,//前值字段
        },
        placeholder: '',
        min: undefined,
        max: undefined,
        step: 1,
        'step-strictly': false,
        precision: undefined,
        'controls-position': '',
        disabled: false
    },
    {
        __config__: {
            label: '编辑器',
            showLabel: true,
            changeTag: true,
            labelWidth: null,
            tag: 'tinymce',
            tagIcon: 'rich-text',
            defaultValue: null,
            span: 24,
            layout: 'colFormItem',
            required: true,
            regList: [],
            document: 'http://tinymce.ax-z.cn',
            typeCode: 106,
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
        },
        placeholder: '请输入',
        height: 300, // 编辑器高度
        branding: false // 隐藏右下角品牌烙印
    },
    
    {
        __config__: {
            label: '级联选择',
            url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
            method: 'get',
            dataPath: 'list',
            dataConsumer: 'options',
            showLabel: true,
            labelWidth: null,
            tag: 'el-cascader',
            tagIcon: 'cascader',
            layout: 'colFormItem',
            defaultValue: [],
            dataType: 'dynamic',
            span: 24,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/cascader',
            typeCode:108,
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
        },
        options: [{
            id: 1,
            value: 1,
            label: '选项1',
            children: [{
                id: 2,
                value: 2,
                label: '选项1-1'
            }]
        }],
        placeholder: '请选择',
        style: { width: '100%' },
        props: {
            props: {
                multiple: false,
                label: 'label',
                value: 'value',
                children: 'children'
            }
        },
        'show-all-levels': true,
        disabled: false,
        clearable: true,
        filterable: false,
        separator: '/',
        dataSources:'1',//数据来源：1，自行录入，2，通过服务器端
    },
    {
        __config__: {
            label: '单选框组',
            labelWidth: null,
            showLabel: true,
            tag: 'el-radio-group',
            tagIcon: 'radio',
            changeTag: true,
            defaultValue: undefined,
            layout: 'colFormItem',
            span: 24,
            optionType: 'default',
            regList: [],
            required: true,
            border: false,
            document: 'https://element.eleme.cn/#/zh-CN/component/radio',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:109,
        },
        __slot__: {
            options: [{
                label: '选项一',
                value: 1
            }, {
                label: '选项二',
                value: 2
            }]
        },
        style: {},
        size: 'medium',
        disabled: false,
        dataSources:'1',//数据来源：1，自行录入，2，通过服务器端
    },
    {
        __config__: {
            label: '多选框组',
            tag: 'el-checkbox-group',
            tagIcon: 'checkbox',
            defaultValue: [],
            span: 24,
            showLabel: true,
            labelWidth: null,
            layout: 'colFormItem',
            optionType: 'default',
            required: true,
            regList: [],
            changeTag: true,
            border: false,
            document: 'https://element.eleme.cn/#/zh-CN/component/checkbox',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:100,
        },
        __slot__: {
            options: [{
                label: '选项一',
                value: 1
            }, {
                label: '选项二',
                value: 2
            }]
        },
        style: {},
        size: 'medium',
        min: null,
        max: null,
        disabled: false,
        dataSources:'1',//数据来源：1，自行录入，2，通过服务器端
    },
    {
        __config__: {
            label: '开关',
            tag: 'el-switch',
            tagIcon: 'switch',
            defaultValue: false,
            span: 24,
            showLabel: true,
            labelWidth: null,
            layout: 'colFormItem',
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/switch',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:101,
        },
        style: {},
        disabled: false,
        'active-text': '',
        'inactive-text': '',
        'active-color': null,
        'inactive-color': null,
        'active-value': true,
        'inactive-value': false
    },
    {
        __config__: {
            label: '滑块',
            tag: 'el-slider',
            tagIcon: 'slider',
            defaultValue: null,
            span: 24,
            showLabel: true,
            layout: 'colFormItem',
            labelWidth: null,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/slider',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:102,
        },
        disabled: false,
        min: 0,
        max: 100,
        step: 1,
        'show-stops': false,
        range: false
    },
    {
        __config__: {
            label: '时间选择',
            tag: 'el-time-picker',
            tagIcon: 'time',
            defaultValue: null,
            span: 24,
            showLabel: true,
            layout: 'colFormItem',
            labelWidth: null,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/time-picker',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:103,
        },
        placeholder: '请选择',
        style: { width: '100%' },
        disabled: false,
        clearable: true,
        'picker-options': {
            selectableRange: '00:00:00-23:59:59'
        },
        format: 'HH:mm:ss',
        'value-format': 'HH:mm:ss'
    },
    {
        __config__: {
            label: '时间范围',
            tag: 'el-time-picker',
            tagIcon: 'time-range',
            span: 24,
            showLabel: true,
            labelWidth: null,
            layout: 'colFormItem',
            defaultValue: null,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/time-picker',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:104,
        },
        style: { width: '100%' },
        disabled: false,
        clearable: true,
        'is-range': true,
        'range-separator': '至',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        format: 'HH:mm:ss',
        'value-format': 'HH:mm:ss'
    },
    {
        __config__: {
            label: '日期选择',
            tag: 'el-date-picker',
            tagIcon: 'date',
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            span: 24,
            layout: 'colFormItem',
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:105,
        },
        placeholder: '请选择',
        type: 'date',
        style: { width: '100%' },
        disabled: false,
        clearable: true,
        format: 'yyyy-MM-dd',
        'value-format': 'yyyy-MM-dd',
        readonly: false
    },
    {
        __config__: {
            label: '日期范围',
            tag: 'el-date-picker',
            tagIcon: 'date-range',
            defaultValue: null,
            span: 24,
            showLabel: true,
            labelWidth: null,
            required: true,
            layout: 'colFormItem',
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:106,
        },
        style: { width: '100%' },
        type: 'daterange',
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        disabled: false,
        clearable: true,
        format: 'yyyy-MM-dd',
        'value-format': 'yyyy-MM-dd',
        readonly: false
    },
    {
        __config__: {
            label: '评分',
            tag: 'el-rate',
            tagIcon: 'rate',
            defaultValue: 0,
            span: 24,
            showLabel: true,
            labelWidth: null,
            layout: 'colFormItem',
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/rate',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:107,
        },
        style: {},
        max: 5,
        'allow-half': false,
        'show-text': false,
        'show-score': false,
        disabled: false
    },
    {
        __config__: {
            label: '颜色选择',
            tag: 'el-color-picker',
            tagIcon: 'color',
            span: 24,
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            layout: 'colFormItem',
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/color-picker',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:108,
        },
        'show-alpha': false,
        'color-format': '',
        disabled: false,
        size: 'medium'
    },
    {
        __config__: {
            label: '上传',
            tag: 'el-upload',
            tagIcon: 'upload',
            layout: 'colFormItem',
            defaultValue: null,
            showLabel: true,
            labelWidth: null,
            required: true,
            span: 24,
            showTip: false,
            buttonText: '点击上传',
            regList: [],
            changeTag: true,
            fileSize: 2,
            sizeUnit: 'MB',
            document: 'https://element.eleme.cn/#/zh-CN/component/upload',
            fieldDescription:'',//字段说明
            showByPrependField:undefined,//前值字段
            typeCode:109,
        },
        __slot__: {
            'list-type': true
        },
        action: 'https://jsonplaceholder.typicode.com/posts/',
        disabled: false,
        accept: '',
        name: 'file',
        'auto-upload': true,
        'list-type': 'text',
        multiple: false
    }
]

// 布局型组件 【左面板】typeCode 200~300
export const layoutComponents = [
    
    {
        __config__: {
            layout: 'rowFormItem',
            tagIcon: 'row',
            label: '行容器',
            layoutTree: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes',
            typeCode:200,
        },
        type: 'default',
        justify: 'start',
        align: 'top'
    },
    {
        __config__: {
            label: '按钮',
            showLabel: true,
            changeTag: true,
            labelWidth: null,
            tag: 'el-button',
            tagIcon: 'button',
            span: 24,
            layout: 'colFormItem',
            document: 'https://element.eleme.cn/#/zh-CN/component/button',
            typeCode:201,
        },
        __slot__: {
            default: '主要按钮'
        },
        type: 'primary',
        icon: 'el-icon-search',
        round: false,
        size: 'medium',
        plain: false,
        circle: false,
        disabled: false
    },    
    {
        __config__: {
            layout: 'colFormItem',
            tagIcon: 'table',
            tag: 'el-table',
            document: 'https://element.eleme.cn/#/zh-CN/component/table',
            span: 24,
            formId: 101,
            renderKey: 1595761764203,
            componentName: 'row101',
            showLabel: true,
            changeTag: true,
            labelWidth: null,
            label: '表格[开发中]',
            dataType: 'dynamic',
            method: 'get',
            dataPath: 'list',
            dataConsumer: 'data',
            url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/tableData',
            children: [{
                __config__: {
                    layout: 'raw',
                    tag: 'el-table-column',
                    renderKey: 15957617660153
                },
                prop: 'date',
                label: '日期'
            }, {
                __config__: {
                    layout: 'raw',
                    tag: 'el-table-column',
                    renderKey: 15957617660152
                },
                prop: 'address',
                label: '地址'
            }, {
                __config__: {
                    layout: 'raw',
                    tag: 'el-table-column',
                    renderKey: 15957617660151
                },
                prop: 'name',
                label: '名称'
            }, {
                __config__: {
                    layout: 'raw',
                    tag: 'el-table-column',
                    renderKey: 1595774496335,
                    children: [
                        {
                            __config__: {
                                label: '按钮',
                                tag: 'el-button',
                                tagIcon: 'button',
                                layout: 'raw',
                                renderKey: 1595779809901
                            },
                            __slot__: {
                                default: '主要按钮'
                            },
                            type: 'primary',
                            icon: 'el-icon-search',
                            round: false,
                            size: 'medium'
                        }
                    ]
                },
                label: '操作'
            }]
        },
        data: [],
        directives: [{
            name: 'loading',
            value: true
        }],
        border: true,
        type: 'default',
        justify: 'start',
        align: 'top'
    }
]
