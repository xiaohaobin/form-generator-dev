<script>
import draggable from 'vuedraggable'
import render from '@/components/render/render'
import {
  showToolByCurrentItem, showByPrependFieldFn, setActiveByTypeCodeTo2, setStringClassByTypeCodeTo2,setStringWrapperClassByTypeCodeTo2
} from '@/utils/index'

const components = {
  itemBtns(h, currentItem, index, list) {
    // console.log("currentItem, index",currentItem, index)
    const { copyItem, deleteItem } = this.$listeners

    return [
      <span class="drawing-item-copy" title="复制" style={showToolByCurrentItem(currentItem)} onClick={event => {
        copyItem(currentItem, list); event.stopPropagation()
      }}>
        <i class="el-icon-copy-document" />
      </span>,
      <span class="drawing-item-delete" title="删除" style={showToolByCurrentItem(currentItem)} onClick={event => {
        deleteItem(index, list); event.stopPropagation()
      }}>
        <i class="el-icon-delete" />
      </span>
    ]
  }
}



const layouts = {
  colFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__

    //根据前置字段是否显示
    const showByPrependField = showByPrependFieldFn(list, config, currentItem);
    if(!showByPrependField.show){
      return (
        <el-col></el-col>
      )
    } 

    const child = renderChildren.apply(this, arguments)
    let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'

    //判断是否组串类，设置active态
    className = setActiveByTypeCodeTo2(currentItem, list, this.activeId, className);

    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0px'
   

    /*字段说明组件部分属性配置*/  
    const fieldDescriptionStyle = 'display:' + (config.fieldDescription !== undefined && config.fieldDescription.length > 0 ? 'inline-block;' : 'none;');

    return (
      <el-col span={config.span} class={className} 
        nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
        <el-form-item label-width={labelWidth}
          label={config.showLabel ? config.label : ''} required={config.required}>
          <span slot={'label'}>
            <span class={'mr-5'}>{config.showLabel ? config.label : ''}</span>
            <el-tooltip content={config.fieldDescription} placement={'right'} style={fieldDescriptionStyle}>
                <i class={'el-icon-warning-outline'}></i>
            </el-tooltip>
          </span>
          <render key={config.renderKey} conf={currentItem} onInput={ event => {
            this.$set(config, 'defaultValue', event)
          }}>
            {child}
          </render>
        </el-form-item>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__

     //根据前置字段是否显示
     const showByPrependField = showByPrependFieldFn(list, config, currentItem);
     if(!showByPrependField.show){
      return (
        <el-col></el-col>
      )
    } 

    let className = this.activeId === config.formId
      ? 'drawing-row-item active-from-item'
      : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    if (currentItem.type === 'flex') {
      child = <el-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
              {child}
            </el-row>
    }
    className += (' ' +setStringClassByTypeCodeTo2(currentItem))
    // console.log(className,"className")
    let wrapperClass = 'drag-wrapper';
    wrapperClass += (' ' +setStringWrapperClassByTypeCodeTo2(currentItem))
    
    //组串类父组件行容器不允许其他组件插入进来
    if(currentItem.__config__.typeCode === 2 && currentItem.__config__.layout == "rowFormItem"){
      return (
        <el-col span={config.span}>
          <el-row gutter={config.gutter} class={className} 
            nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>                    
            <div class={wrapperClass}>
              {child}
            </div>
            {components.itemBtns.apply(this, arguments)}
          </el-row>
        </el-col>
      )
    }
    return (
      <el-col span={config.span}>
        <el-row gutter={config.gutter} class={className} 
          nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>          
          <draggable list={config.children || []} animation={340}
            group="componentsGroup" class={wrapperClass}>
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  },
  raw(h, currentItem, index, list) {
    const config = currentItem.__config__
    const child = renderChildren.apply(this, arguments)
    return <render key={config.renderKey} conf={currentItem} onInput={ event => {
      this.$set(config, 'defaultValue', event)
    }}>
      {child}
    </render>
  }
}

function renderChildren(h, currentItem, index, list) {
  const config = currentItem.__config__
  if (!Array.isArray(config.children)) return null
  return config.children.map((el, i) => {
    const layout = layouts[el.__config__.layout]
    if (layout) {
      return layout.call(this, h, el, i, config.children)
    }
    return layoutIsNotFound.call(this)
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`)
}

export default {
  components: {
    render,
    draggable
  },
  props: [
    'currentItem',
    'index',
    'drawingList',
    'activeId',
    'formConf'
  ],
  render(h) {
    /**
     * 定义组件类型
     * itemBtns 工具组件（复制删除）
     * colFormItem 单元基础组件
     * rowFormItem 行容器组件
     * raw 表格单元列组件
     */
    const layout = layouts[this.currentItem.__config__.layout]

    if (layout) {
      return layout.call(this, h, this.currentItem, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
