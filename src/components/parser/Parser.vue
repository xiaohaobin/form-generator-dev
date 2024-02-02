<script>
import {
  deepClone, setClassNameForTypeCode2, showByPrependFieldFn
} from '@/utils/index'
import render from '@/components/render/render.js'

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
}



const layouts = {
  colFormItem(h, scheme, list) {
    const config = scheme.__config__

    //根据前置字段是否显示
    const showByPrependField = showByPrependFieldFn(list, config, scheme);
    if(!showByPrependField.show){
      return (
        <el-col></el-col>
      )
    } 

    const listeners = buildListeners.call(this, scheme)

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'

    /*字段说明组件部分属性配置*/  
    const fieldDescriptionStyle = 'display:' + (config.fieldDescription !== undefined && config.fieldDescription.length > 0 ? 'inline-block;' : 'none;');
    
    return (
      <el-col span={config.span} class={setClassNameForTypeCode2(scheme)}>
        <el-form-item label-width={labelWidth} prop={scheme.__vModel__}
          label={config.showLabel ? config.label : ''}>
          <span slot={'label'}>
            <span class={'mr-5'}>{config.showLabel ? config.label : ''}</span>
            <el-tooltip content={config.fieldDescription} placement={'right'} style={fieldDescriptionStyle}>
                <i class={'el-icon-warning-outline'}></i>
            </el-tooltip>
          </span>
          <render conf={scheme} on={listeners} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme, list) {
    //根据前置字段是否显示
    const showByPrependField = showByPrependFieldFn(list, scheme.__config__, scheme);
    if(!showByPrependField.show){
      return (
        <el-col></el-col>
      )
    } 
    let child = renderChildren.apply(this, arguments)
    if (scheme.type === 'flex') {
      child = <el-row type={scheme.type} justify={scheme.justify} align={scheme.align} >
              {child}
            </el-row>
    }
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter} class={setClassNameForTypeCode2(scheme)}>
          {child}
        </el-row>
      </el-col>
    )
  }
}

function renderFrom(h) {
  const { formConfCopy } = this

  return (
    <el-row gutter={formConfCopy.gutter}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formConfCopy.formBtns && formBtns.call(this, h)}
      </el-form>
    </el-row>
  )
}

function formBtns(h) {
  return <el-col>
    <el-form-item size="large">
      <el-button type="primary" onClick={this.submitForm}>提交</el-button>
      <el-button onClick={this.resetForm}>重置</el-button>
    </el-form-item>
  </el-col>
}

function renderFormItem(h, elementList) {
  return elementList.map(scheme => {
    const config = scheme.__config__
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme, elementList)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.__config__
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

function setValue(event, config, scheme) {
  this.$set(config, 'defaultValue', event)
  this.$set(this[this.formConf.formModel], scheme.__vModel__, event)
}

function buildListeners(scheme) {
  const config = scheme.__config__
  const methods = this.formConf.__methods__ || {}
  const listeners = {}

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach(key => {
    listeners[key] = event => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = event => setValue.call(this, event, config, scheme)

  return listeners
}

export default {
  components: {
    render
  },
  props: {
    formConf: {
      type: Object,
      required: true
    }
  },
  data() {
    // 在data里对数据进行拦截,针对el-upload组件处理
    this.bindUploadSuccess(this.formConf.fields, this.formConf.formModel)

    const data = {
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {}
    }
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
    return data
  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(componentList, rules) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = { required: config.required, message: cur.placeholder }
            if (Array.isArray(config.defaultValue)) {
              required.type = 'array'
              required.message = `请至少选择一个${config.label}`
            }
            required.message === undefined && (required.message = `${config.label}不能为空`)
            config.regList.push(required)
          }
          rules[cur.__vModel__] = config.regList.map(item => {
            item.pattern && (item.pattern = eval(item.pattern))
            item.trigger = ruleTrigger && ruleTrigger[config.tag]
            return item
          })
        }
        if (config.children) this.buildRules(config.children, rules)
      })
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    },
    submitForm() {
      this.$refs[this.formConf.formRef].validate(valid => {
        if (!valid) return false
        // 触发sumit事件
        this.$emit('submit', this[this.formConf.formModel])
        return true
      })
    },
    // 为el-upload绑定一个on-success事件，并将返回值返回给表单
    bindUploadSuccess(fields, target) {
      fields.map((item) => {
        if (item.action) {
          item['on-success'] = (res, file, fileList) => {
            this._data[target][item.__vModel__] = fileList
            console.error(this._data[target][item.__vModel__])
          }
        }
        
        return item
      })
    }

  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>

<style lang='scss'>
/* .type-code-2-children .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before{display: none;} */

//==================针对换机申请模板部分需求设置的样式========================================
@import '@/styles/render';
</style>
