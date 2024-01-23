<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <!-- <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
        <i class="el-icon-link" />
      </a> -->
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="currentTab==='field' && showField" size="small" label-width="90px"
        :label-position="'top'">

          <el-form-item v-if="activeData.__config__.changeTag" :label=" '字段类型： ' + getTxtByCurrCom() ">
            <!-- <el-select
              v-model="activeData.__config__.tagIcon"
              placeholder="组件类型"
              :style="{width: '100%'}"
              @change="tagChange"
              :disabled="true"
            >
              <el-option-group v-for="group in tagList" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.__config__.label"
                  :label="item.__config__.label"
                  :value="item.__config__.tagIcon"
                >
                  <svg-icon class="node-icon" :icon-class="item.__config__.tagIcon" />
                  <span> {{ item.__config__.label }}</span>
                </el-option>
              </el-option-group>
            </el-select> -->
          </el-form-item>

          <!-- <el-form-item v-if="activeData.__vModel__!==undefined" label="选择字段">
            <el-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）" />
          </el-form-item>          -->

          <el-form-item label="字段选择">
            <el-select v-model="activeData.__vModel__" placeholder="请选择" filterable :style="{width: '100%'}" @focus="tableFieldFocus" @blur="tableFieldBlur" @change="tableFieldChange">
              <el-option v-for="(item, index) in tableFieldOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="activeData.__config__.label!==undefined && activeData.__diyComponentsName__ != 'diy-text'" label="显示名称">
            <el-input v-model="activeData.__config__.label" placeholder="请输入标题" @input="changeRenderKey" />
          </el-form-item>

          <el-form-item v-if="activeData.placeholder!==undefined" label="未输入提示">
            <el-input v-model="activeData.placeholder" placeholder="请输入内容" @input="changeRenderKey" />
          </el-form-item>          

          <el-form-item v-if="activeData.__vModel__!==undefined" label="默认值">
            <el-input
              :value="setDefaultValue(activeData.__config__.defaultValue)"
              placeholder="请输入默认值"
              @input="onDefaultValueInput"
            />
          </el-form-item>

          <el-form-item v-if="activeData.__config__.fieldDescription!==undefined" label="字段说明">
            <el-input v-model="activeData.__config__.fieldDescription" placeholder="请输入字段说明" @input="changeRenderKey" />
          </el-form-item>

          <el-form-item label="前置字段">
            <el-select v-model="activeData.__config__.showByPrependField" placeholder="请选择" filterable clearable :style="{width: '100%'}" @change="showByPrependFieldChangeEvent">
              <el-option v-for="(item, index) in tableFieldOptions2" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="activeData.__config__.span!==undefined" label="组件所占宽度">
            <div class="diy-el-slider">
              <el-slider v-model="activeData.__config__.span" :max="24" :min="0" :step="6" :marks="slideMarks" @change="spanChange" :show-tooltip="false" class="diy-el-slider-main"/>
              <span>{{ (activeData.__config__.span / 24 * 100).toFixed() + '%' }}</span>
            </div>           
          </el-form-item>

          <el-form-item v-if="activeData.style&&activeData.style.width!==undefined" label="组件宽度">
            <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
          </el-form-item>

          <el-form-item v-if="activeData.maxlength !== undefined" label="最多输入">
            <el-input v-model="activeData.maxlength" placeholder="请输入字符长度">
              <template slot="append">
                个字符
              </template>
            </el-input>
          </el-form-item>

          <el-form-item v-if="activeData.__config__.required !== undefined" label="是否必填">
            <el-switch v-model="activeData.__config__.required" />
          </el-form-item>

          <el-form-item v-if="activeData.clearable !== undefined" label="能否清空">
            <el-switch v-model="activeData.clearable" />
          </el-form-item>

          <el-form-item v-if="activeData.readonly !== undefined" label="是否只读">
            <el-switch v-model="activeData.readonly" />
          </el-form-item>
          

           <!-- 针对组件配置  __diyComponentsName__ 为 'diy-text' sss-->
           <el-form-item v-if="activeData.__diyComponentsName__ == 'diy-text' " label="文本内容">
             <el-input v-model="activeData.__slot__.text" />
          </el-form-item>
           <!-- 针对组件配置  __diyComponentsName__ 为 'diy-text' eee-->

           <div v-if="Array.isArray(activeData.__config__.regList)" class="web-reg-box scroll-effect">
            <el-divider>正则校验</el-divider>
            
            <el-form-item label="选择输入正则">
              <el-select v-model="activeData.__config__.regVal" placeholder="请选择" filterable :style="{width: '100%'}" 
              @change="regValChangeEvent">
                <el-option v-for="(item, index) in regList" :key="index" :label="item.regularName" :value="item.id" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>

            <div
              v-for="(item, index) in activeData.__config__.regList"
              :key="index"
              :class="item.active ? 'reg-item-active reg-item' : 'reg-item' "
              @click="clickRegItem(item, index)"
            >
              <span class="close-btn" @click="delRegItem(item, index)">
                <i class="el-icon-close" />
              </span>
              
              <!-- <el-form-item label="错误提示" style="margin-bottom:0">
                <el-autocomplete v-model="item.message" placeholder="请输入错误提示" :fetch-suggestions="regQuerySearch" :style="{width: '100%'}"  @select="regHandleSelect">
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="表达式">
                <el-input v-model="item.pattern" placeholder="请输入正则" />
              </el-form-item> -->

              <el-form-item label="表达式">
                <el-input v-model="item.pattern" placeholder="请输入正则" />
              </el-form-item>
              <el-form-item label="错误提示" style="margin-bottom:0">
                <el-input v-model="item.message" placeholder="请输入错误提示" />
              </el-form-item>

            </div>
            <div style="margin-left: 20px">
              <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
                添加规则
              </el-button>
            </div>
          </div>

          
            
          <!-- 以下组件属性为原本系统所给，可以规避.................................................................................... -->
          <el-form-item v-if="activeData.__config__.componentName!==undefined" label="组件名">
            {{ activeData.__config__.componentName }}
          </el-form-item>
         
          <el-form-item v-if="activeData['start-placeholder']!==undefined" label="开始占位">
            <el-input v-model="activeData['start-placeholder']" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="activeData['end-placeholder']!==undefined" label="结束占位">
            <el-input v-model="activeData['end-placeholder']" placeholder="请输入占位提示" />
          </el-form-item>

          <el-form-item v-if="activeData.__config__.layout==='rowFormItem'&&activeData.gutter!==undefined" label="栅格间隔">
            <el-input-number v-model="activeData.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>

          <el-form-item v-if="activeData.__config__.layout==='rowFormItem'&&activeData.type!==undefined" label="布局模式">
            <el-radio-group v-model="activeData.type">
              <el-radio-button label="default" />
              <el-radio-button label="flex" />
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="activeData.justify!==undefined&&activeData.type==='flex'" label="水平排列">
            <el-select v-model="activeData.justify" placeholder="请选择水平排列" :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in justifyOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item v-if="activeData.align!==undefined&&activeData.type==='flex'" label="垂直排列">
            <el-radio-group v-model="activeData.align">
              <el-radio-button label="top" />
              <el-radio-button label="middle" />
              <el-radio-button label="bottom" />
            </el-radio-group>
          </el-form-item>
          
          <!-- <el-form-item v-if="activeData.__config__.labelWidth!==undefined" label="标签宽度">
            <el-input v-model.number="activeData.__config__.labelWidth" type="number" placeholder="请输入标签宽度" />
          </el-form-item> -->

          <el-form-item v-if="activeData.__config__.tag==='el-checkbox-group'" label="至少应选">
            <el-input-number
              :value="activeData.min"
              :min="0"
              placeholder="至少应选"
              @input="$set(activeData, 'min', $event?$event:undefined)"
            />
          </el-form-item>
         

          <el-form-item v-if="activeData.__config__.isShowColorSelect && activeData.__config__.colorSelect" label="颜色选择">
            <el-select v-model="activeData.type" :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in activeData.__config__.colorSelect"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item v-if="activeData.__config__.isFontWeightBold !== undefined" label="字体加粗">
              <el-switch v-model="activeData.__config__.isFontWeightBold"></el-switch>
          </el-form-item>
       

          <el-form-item v-if="activeData.__config__.tag==='el-checkbox-group'" label="最多可选">
            <el-input-number
              :value="activeData.max"
              :min="0"
              placeholder="最多可选"
              @input="$set(activeData, 'max', $event?$event:undefined)"
            />
          </el-form-item>

          <!-- <el-form-item v-if="activeData.__slot__&&activeData.__slot__.prepend!==undefined" label="前缀">
            <el-input v-model="activeData.__slot__.prepend" placeholder="请输入前缀" />
          </el-form-item>
          <el-form-item v-if="activeData.__slot__&&activeData.__slot__.append!==undefined" label="后缀">
            <el-input v-model="activeData.__slot__.append" placeholder="请输入后缀" />
          </el-form-item>
          <el-form-item v-if="activeData['prefix-icon']!==undefined" label="前图标">
            <el-input v-model="activeData['prefix-icon']" placeholder="请输入前图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('prefix-icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData['suffix-icon'] !== undefined" label="后图标">
            <el-input v-model="activeData['suffix-icon']" placeholder="请输入后图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('suffix-icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item> -->

          <el-form-item
            v-if="activeData['icon']!==undefined && activeData.__config__.tag === 'el-button'"
            label="按钮图标"
          >
            <el-input v-model="activeData['icon']" placeholder="请输入按钮图标名称">
              <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('icon')">
                选择
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="选项分隔符">
            <el-input v-model="activeData.separator" placeholder="请输入选项分隔符" />
          </el-form-item>
          <!-- <el-form-item v-if="activeData.autosize !== undefined" label="最小行数">
            <el-input-number v-model="activeData.autosize.minRows" :min="1" placeholder="最小行数" />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined" label="最大行数">
            <el-input-number v-model="activeData.autosize.maxRows" :min="1" placeholder="最大行数" />
          </el-form-item> -->
          <el-form-item v-if="isShowMin" label="最小值">
            <el-input-number v-model="activeData.min" placeholder="最小值" />
          </el-form-item>
          <el-form-item v-if="isShowMax" label="最大值">
            <el-input-number v-model="activeData.max" placeholder="最大值" />
          </el-form-item>
          <el-form-item v-if="activeData.height!==undefined" label="组件高度">
            <el-input-number v-model="activeData.height" placeholder="高度" @input="changeRenderKey" />
          </el-form-item>
          <el-form-item v-if="isShowStep" label="步长">
            <el-input-number v-model="activeData.step" placeholder="步数" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="精度">
            <el-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="按钮位置">
            <el-radio-group v-model="activeData['controls-position']">
              <el-radio-button label="">
                默认
              </el-radio-button>
              <el-radio-button label="right">
                右侧
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          

          <el-form-item v-if="activeData['active-text'] !== undefined" label="开启提示">
            <el-input v-model="activeData['active-text']" placeholder="请输入开启提示" />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-text'] !== undefined" label="关闭提示">
            <el-input v-model="activeData['inactive-text']" placeholder="请输入关闭提示" />
          </el-form-item>
          <el-form-item v-if="activeData['active-value'] !== undefined" label="开启值">
            <el-input
              :value="setDefaultValue(activeData['active-value'])"
              placeholder="请输入开启值"
              @input="onSwitchValueInput($event, 'active-value')"
            />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-value'] !== undefined" label="关闭值">
            <el-input
              :value="setDefaultValue(activeData['inactive-value'])"
              placeholder="请输入关闭值"
              @input="onSwitchValueInput($event, 'inactive-value')"
            />
          </el-form-item>
          <el-form-item
            v-if="activeData.type !== undefined && 'el-date-picker' === activeData.__config__.tag"
            label="时间类型"
          >
            <el-select
              v-model="activeData.type"
              placeholder="请选择时间类型"
              :style="{ width: '100%' }"
              @change="dateTypeChange"
            >
              <el-option
                v-for="(item, index) in dateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.name !== undefined" label="文件字段名">
            <el-input v-model="activeData.name" placeholder="请输入上传文件字段名" />
          </el-form-item>
          <el-form-item v-if="activeData.accept !== undefined" label="文件类型">
            <el-select
              v-model="activeData.accept"
              placeholder="请选择文件类型"
              :style="{ width: '100%' }"
              clearable
            >
              <el-option label="图片" value="image/*" />
              <el-option label="视频" value="video/*" />
              <el-option label="音频" value="audio/*" />
              <el-option label="excel" value=".xls,.xlsx" />
              <el-option label="word" value=".doc,.docx" />
              <el-option label="pdf" value=".pdf" />
              <el-option label="txt" value=".txt" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.fileSize !== undefined" label="文件大小">
            <el-input v-model.number="activeData.__config__.fileSize" placeholder="请输入文件大小">
              <el-select slot="append" v-model="activeData.__config__.sizeUnit" :style="{ width: '66px' }">
                <el-option label="KB" value="KB" />
                <el-option label="MB" value="MB" />
                <el-option label="GB" value="GB" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData.action !== undefined" label="上传地址">
            <el-input v-model="activeData.action" placeholder="请输入上传地址" clearable />
          </el-form-item>
          <el-form-item v-if="activeData['list-type'] !== undefined" label="列表类型">
            <el-radio-group v-model="activeData['list-type']" size="small">
              <el-radio-button label="text">
                text
              </el-radio-button>
              <el-radio-button label="picture">
                picture
              </el-radio-button>
              <el-radio-button label="picture-card">
                picture-card
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="activeData.type !== undefined && activeData.__config__.tag === 'el-button'"
            label="按钮类型"
          >
            <el-select v-model="activeData.type" :style="{ width: '100%' }">
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
              <el-option label="text" value="text" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.buttonText !== undefined"
            v-show="'picture-card' !== activeData['list-type']"
            label="按钮文字"
          >
            <el-input v-model="activeData.__config__.buttonText" placeholder="请输入按钮文字" />
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.tag === 'el-button'"
            label="按钮文字"
          >
            <el-input v-model="activeData.__slot__.default" placeholder="请输入按钮文字" />
          </el-form-item>
          <el-form-item v-if="activeData['range-separator'] !== undefined" label="分隔符">
            <el-input v-model="activeData['range-separator']" placeholder="请输入分隔符" />
          </el-form-item>
          <el-form-item v-if="activeData['picker-options'] !== undefined" label="时间段">
            <el-input
              v-model="activeData['picker-options'].selectableRange"
              placeholder="请输入时间段"
            />
          </el-form-item>
          <el-form-item v-if="activeData.format !== undefined" label="时间格式">
            <el-input
              :value="activeData.format"
              placeholder="请输入时间格式"
              @input="setTimeValue($event)"
            />
          </el-form-item>
          <template v-if="['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(activeData.__config__.tag) > -1">
            <el-divider>选项</el-divider>

            <el-form-item label="数据来源">
              <el-select v-model="dataSources" :style="{ width: '100%' }">
                <el-option v-for="(item,index) in dataSourcesOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled" />
              </el-select>
            </el-form-item>

            <el-form-item label="数据选择" v-if="dataSources == '2'">
              <el-select v-model="serverFunction" :style="{ width: '100%' }">
                <el-option v-for="(item,index) in serverFunctionOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled" />
              </el-select>
            </el-form-item>

            <!-- 下拉框，单选框，复选框操作子项组件sss -->
            <div>
              <draggable
                :list="activeData.__slot__.options"
                :animation="340"
                group="selectItem"
                handle=".option-drag"
                class="select-option-draggable-box scroll-effect"
              >
                <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="select-item">
                  <div class="select-line-icon option-drag">
                    <i class="el-icon-s-operation" />
                  </div>
                  <el-input v-model="item.label" placeholder="选项名" size="small" />
                  <el-input
                    placeholder="选项值"
                    size="small"
                    :value="item.value"
                    @input="setOptionValue(item, $event)"
                  />
                  <div class="close-btn select-line-icon" @click="activeData.__slot__.options.splice(index, 1)">
                    <i class="el-icon-remove-outline" />
                  </div>
                </div>
              </draggable>
              <div class="flex-space-between">
                <el-button
                  style="padding-bottom: 0"
                  icon="el-icon-circle-plus-outline"
                  type="text"
                  @click="addSelectItem"
                >
                  添加选项
                </el-button>
                <el-button type="text" style="padding-bottom: 0">通过Excel方式上传</el-button>
              </div>
            </div>
            <!-- 下拉框，单选框，复选框操作子项组件ee -->

            <el-divider />
          </template>

          <template v-if="['el-cascader', 'el-table'].includes(activeData.__config__.tag)">
            <el-divider>选项</el-divider>
            <el-form-item v-if="activeData.__config__.dataType" label="数据类型">
              <el-radio-group v-model="activeData.__config__.dataType" size="small">
                <el-radio-button label="dynamic">
                  动态数据
                </el-radio-button>
                <el-radio-button label="static">
                  静态数据
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <template v-if="activeData.__config__.dataType === 'dynamic'">
              <el-form-item label="接口地址">
                <el-input
                  v-model="activeData.__config__.url"
                  :title="activeData.__config__.url"
                  placeholder="请输入接口地址"
                  clearable
                  @blur="$emit('fetch-data', activeData)"
                >
                  <el-select
                    slot="prepend"
                    v-model="activeData.__config__.method"
                    :style="{width: '85px'}"
                    @change="$emit('fetch-data', activeData)"
                  >
                    <el-option label="get" value="get" />
                    <el-option label="post" value="post" />
                    <el-option label="put" value="put" />
                    <el-option label="delete" value="delete" />
                  </el-select>
                </el-input>
              </el-form-item>
              <el-form-item label="数据位置">
                <el-input
                  v-model="activeData.__config__.dataPath"
                  placeholder="请输入数据位置"
                  @blur="$emit('fetch-data', activeData)"
                />
              </el-form-item>

              <template v-if="activeData.props && activeData.props.props">
                <el-form-item label="标签键名">
                  <el-input v-model="activeData.props.props.label" placeholder="请输入标签键名" />
                </el-form-item>
                <el-form-item label="值键名">
                  <el-input v-model="activeData.props.props.value" placeholder="请输入值键名" />
                </el-form-item>
                <el-form-item label="子级键名">
                  <el-input v-model="activeData.props.props.children" placeholder="请输入子级键名" />
                </el-form-item>
              </template>
            </template>

            <!-- 级联选择静态树 -->
            <el-tree
              v-if="activeData.__config__.dataType === 'static'"
              draggable
              :data="activeData.options"
              node-key="id"
              :expand-on-click-node="false"
              :render-content="renderContent"
            />
            <div v-if="activeData.__config__.dataType === 'static'" style="margin-left: 20px">
              <el-button
                style="padding-bottom: 0"
                icon="el-icon-circle-plus-outline"
                type="text"
                @click="addTreeItem"
              >
                添加父级
              </el-button>
            </div>
            <el-divider />
          </template>

          <el-form-item v-if="activeData.__config__.optionType !== undefined" label="选项样式">
            <el-radio-group v-model="activeData.__config__.optionType">
              <el-radio-button label="default">
                默认
              </el-radio-button>
              <el-radio-button label="button">
                按钮
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData['active-color'] !== undefined" label="开启颜色">
            <el-color-picker v-model="activeData['active-color']" />
          </el-form-item>
          <el-form-item v-if="activeData['inactive-color'] !== undefined" label="关闭颜色">
            <el-color-picker v-model="activeData['inactive-color']" />
          </el-form-item>

          <!-- <el-form-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined" label="显示标签"
          >
            <el-switch v-model="activeData.__config__.showLabel" />
          </el-form-item> -->
          <el-form-item v-if="activeData.branding !== undefined" label="品牌烙印">
            <el-switch v-model="activeData.branding" @input="changeRenderKey" />
          </el-form-item>
          <el-form-item v-if="activeData['allow-half'] !== undefined" label="允许半选">
            <el-switch v-model="activeData['allow-half']" />
          </el-form-item>
          <el-form-item v-if="activeData['show-text'] !== undefined" label="辅助文字">
            <el-switch v-model="activeData['show-text']" @change="rateTextChange" />
          </el-form-item>
          <el-form-item v-if="activeData['show-score'] !== undefined" label="显示分数">
            <el-switch v-model="activeData['show-score']" @change="rateScoreChange" />
          </el-form-item>
          <el-form-item v-if="activeData['show-stops'] !== undefined" label="显示间断点">
            <el-switch v-model="activeData['show-stops']" />
          </el-form-item>
          <el-form-item v-if="activeData.range !== undefined" label="范围选择">
            <el-switch v-model="activeData.range" @change="rangeChange" />
          </el-form-item>
          <el-form-item
            v-if="activeData.__config__.border !== undefined && activeData.__config__.optionType === 'default'"
            label="是否带边框"
          >
            <el-switch v-model="activeData.__config__.border" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-color-picker'" label="颜色格式">
            <el-select
              v-model="activeData['color-format']"
              placeholder="请选择颜色格式"
              :style="{ width: '100%' }"
              clearable
              @change="colorFormatChange"
            >
              <el-option
                v-for="(item, index) in colorFormatOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="activeData.size !== undefined &&
              (activeData.__config__.optionType === 'button' ||
                activeData.__config__.border ||
                activeData.__config__.tag === 'el-color-picker' ||
                activeData.__config__.tag === 'el-button')"
            label="组件尺寸"
          >
            <el-radio-group v-model="activeData.size">
              <el-radio-button label="medium">
                中等
              </el-radio-button>
              <el-radio-button label="small">
                较小
              </el-radio-button>
              <el-radio-button label="mini">
                迷你
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeData['show-word-limit'] !== undefined" label="输入统计">
            <el-switch v-model="activeData['show-word-limit']" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-input-number'" label="严格步数">
            <el-switch v-model="activeData['step-strictly']" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="任选层级">
            <el-switch v-model="activeData.props.props.checkStrictly" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="是否多选">
            <el-switch v-model="activeData.props.props.multiple" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="展示全路径">
            <el-switch v-model="activeData['show-all-levels']" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-cascader'" label="可否筛选">
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
         
          <el-form-item v-if="activeData.__config__.showTip !== undefined" label="显示提示">
            <el-switch v-model="activeData.__config__.showTip" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-upload'" label="多选文件">
            <el-switch v-model="activeData.multiple" />
          </el-form-item>
          <el-form-item v-if="activeData['auto-upload'] !== undefined" label="自动上传">
            <el-switch v-model="activeData['auto-upload']" />
          </el-form-item>
          
          <!-- <el-form-item v-if="activeData.disabled !== undefined" label="是否禁用">
            <el-switch v-model="activeData.disabled" />
          </el-form-item> -->
          <el-form-item v-if="activeData.__config__.tag === 'el-select'" label="能否搜索">
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-select'" label="是否多选">
            <el-switch v-model="activeData.multiple" @change="multipleChange" />
          </el-form-item>
         

          <template v-if="activeData.__config__.layoutTree">
            <el-divider>布局结构树</el-divider>
            <el-tree
              :data="[activeData.__config__]"
              :props="layoutTreeProps"
              node-key="renderKey"
              default-expand-all
              draggable
            >
              <span slot-scope="{ node, data }">
                <span class="node-label">
                  <svg-icon class="node-icon" :icon-class="data.__config__?data.__config__.tagIcon:data.tagIcon" />
                  {{ node.label }}
                </span>
              </span>
            </el-tree>
          </template>

          
        </el-form>
        <!-- 表单属性 -->
        <el-form v-show="currentTab === 'form'" size="small" label-width="90px">
          <el-form-item label="表单名">
            <el-input v-model="formConf.formRef" placeholder="请输入表单名（ref）" />
          </el-form-item>
          <el-form-item label="表单模型">
            <el-input v-model="formConf.formModel" placeholder="请输入数据模型" />
          </el-form-item>
          <el-form-item label="校验模型">
            <el-input v-model="formConf.formRules" placeholder="请输入校验模型" />
          </el-form-item>
          <el-form-item label="表单尺寸">
            <el-radio-group v-model="formConf.size">
              <el-radio-button label="medium">
                中等
              </el-radio-button>
              <el-radio-button label="small">
                较小
              </el-radio-button>
              <el-radio-button label="mini">
                迷你
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button label="left">
                左对齐
              </el-radio-button>
              <el-radio-button label="right">
                右对齐
              </el-radio-button>
              <el-radio-button label="top">
                顶部对齐
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input v-model.number="formConf.labelWidth" type="number" placeholder="请输入标签宽度" />
          </el-form-item>
          <el-form-item label="栅格间隔">
            <el-input-number v-model="formConf.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <el-form-item label="禁用表单">
            <el-switch v-model="formConf.disabled" />
          </el-form-item>
          <el-form-item label="表单按钮">
            <el-switch v-model="formConf.formBtns" />
          </el-form-item>
          <el-form-item label="显示未选中组件边框">
            <el-switch v-model="formConf.unFocusedComponentBorder" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>

    <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" />
    <icons-dialog :visible.sync="iconsVisible" :current="activeData[currentIconModel]" @select="setIcon" />
  </div>
</template>

<script>

import { isArray } from 'util'
import TreeNodeDialog from '@/views/index/TreeNodeDialog'
import { isNumberStr } from '@/utils/index'
import IconsDialog from './IconsDialog'
import {
  inputComponents, selectComponents, layoutComponents
} from '@/components/generator/config'
import { getDrawingList, saveFormConf } from '@/utils/db'

//字段表
const _tableFieldOptions = [
  {label:'用户名称',value:'userName', disabled:false},
  {label:'设备sn',value:'sn', disabled:false},
  {label:'手机号',value:'phone', disabled:false},
  {label:'设备类型',value:'deviceType', disabled:false},
]

//正则规则表
const _regList = [
  {pattern: "/^1(3|4|5|7|8|9)\\d{9}$/",message: "手机号格式错误",regularName:'验证手机输入是否有误',id:1},
  {pattern: "/^[a-zA-Z0-9_.]{1,200}$/",message: "不能输入特殊字符(点和下划线除外),最多200个字符",regularName:'一般输入框',id:2},
  {pattern: "/^[0-9]*$/",message: "只能输入数字",regularName:'数字输入验证',id:3},
  
]

const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce']

export default {
  components: {
    TreeNodeDialog,
    IconsDialog
  },
  props: ['showField', 'activeData', 'formConf'],
  data() {
    return {
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      dateTypeOptions: [
        {
          label: '日(date)',
          value: 'date'
        },
        {
          label: '周(week)',
          value: 'week'
        },
        {
          label: '月(month)',
          value: 'month'
        },
        {
          label: '年(year)',
          value: 'year'
        },
        {
          label: '日期时间(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '日期范围(daterange)',
          value: 'daterange'
        },
        {
          label: '月范围(monthrange)',
          value: 'monthrange'
        },
        {
          label: '日期时间范围(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      justifyOptions: [
        {
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }
      ],
      layoutTreeProps: {
        label(data, node) {
          const config = data.__config__
          return data.componentName || `${config.label}: ${data.__vModel__}`
        }
      },
      slideMarks: {
        // 0:'',
        6: '',
        12: '', 
        18: ''
      },
      tableFieldOptions:_tableFieldOptions,//表字段数据
      tableFieldOptions2:JSON.parse(JSON.stringify(_tableFieldOptions)),
      dataSources:undefined,//数据来源
      dataSourcesOptions:[
        {label:'自行录入',value:'1', disabled:false},
        {label:'获取数据',value:'2', disabled:false},
      ],
      serverFunction:undefined,//获取数据方法体
      serverFunctionOptions:[
        {label:'国家列表数据',value:'1', disabled:false, requestType:'get', requestUrl:'', param:{}, method:'getCountryList'},
        {label:'设备类型列表数据',value:'2', disabled:false, requestType:'get', requestUrl:'', param:{}, method:'getDeviceTypeList'},
      ],
      regList:_regList,//正则验证表
    }
  },
  computed: {
    documentLink() {
      return (
        this.activeData.__config__.document
        || 'https://element.eleme.cn/#/zh-CN/component/installation'
      )
    },
    dateOptions() {
      if (
        this.activeData.type !== undefined
        && this.activeData.__config__.tag === 'el-date-picker'
      ) {
        if (this.activeData['start-placeholder'] === undefined) {
          return this.dateTypeOptions
        }
        return this.dateRangeTypeOptions
      }
      return []
    },
    tagList() {
      return [
        {
          label: '输入型组件',
          options: inputComponents
        },
        {
          label: '选择型组件',
          options: selectComponents
        }
      ]
    },
    activeTag() {
      return this.activeData.__config__.tag
    },
    isShowMin() {
      return ['el-input-number', 'el-slider'].indexOf(this.activeTag) > -1
    },
    isShowMax() {
      return ['el-input-number', 'el-slider', 'el-rate'].indexOf(this.activeTag) > -1
    },
    isShowStep() {
      return ['el-input-number', 'el-slider'].indexOf(this.activeTag) > -1
    }
  },
  watch: {
    formConf: {
      handler(val) {
        saveFormConf(val)
      },
      deep: true
    }
  },
  created(){
    //请求规则列表
    this.getRegularList();
  },
  mounted(){
    
    
  },
  methods: {
    addReg() {
      this.activeData.__config__.regList.forEach((item)=>{
        item.active = false;
      });
      this.activeData.__config__.regList.push({
        pattern: '',
        message: '',
        active: true
      })
    },
    addSelectItem() {
      this.activeData.__slot__.options.push({
        label: '',
        value: ''
      })
    },
    addTreeItem() {
      ++this.idGlobal
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      )
    },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove(node, data) {
      this.activeData.__config__.defaultValue = [] // 避免删除时报错
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addNode(data) {
      this.currentNode.push(data)
    },
    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? +val : val
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },
    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val))
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val)
      }
    },
    setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData.__config__, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', valueFormat)
      this.$set(this.activeData, 'format', val)
    },
    spanChange(val) {
      if (val < 6){
        this.activeData.__config__.span = 6
        this.formConf.span = 6
        return this.$message.error('组件宽度最少设置不能低于25%')
      }
      this.formConf.span = val
    },
    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val)
    },
    rangeChange(val) {
      this.$set(
        this.activeData.__config__,
        'defaultValue',
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      )
    },
    rateTextChange(val) {
      if (val) this.activeData['show-score'] = false
    },
    rateScoreChange(val) {
      if (val) this.activeData['show-text'] = false
    },
    colorFormatChange(val) {
      this.activeData.__config__.defaultValue = null
      this.activeData['show-alpha'] = val.indexOf('a') > -1
      this.activeData.__config__.renderKey = +new Date() // 更新renderKey,重新渲染该组件
    },
    openIconsDialog(model) {
      this.iconsVisible = true
      this.currentIconModel = model
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val
    },
    tagChange(tagIcon) {
      let target = inputComponents.find(item => item.__config__.tagIcon === tagIcon)
      if (!target) target = selectComponents.find(item => item.__config__.tagIcon === tagIcon)
      this.$emit('tag-change', target)
    },
    changeRenderKey() {
      if (needRerenderList.includes(this.activeData.__config__.tag)) {
        this.activeData.__config__.renderKey = +new Date()
      }
    },
    tableFieldFocus(){
      //初始化页面的时候判断组件字段是否已在字段表范围中，如是，则字段表中对应字段为禁用
      this.setDisabledWhenInitPage();
    },
    tableFieldBlur(){
      //初始化页面的时候判断组件字段是否已在字段表范围中，如是，则字段表中对应字段为禁用
      this.$nextTick(()=>{
        setTimeout(()=>{
          const drawingListInDB = getDrawingList()
          this.setDisabledWhenInitPage(true);
        },500)
        
      });
      
    },    
    /**
     * 初始化页面的时候判断组件字段是否已在字段表范围中，如是，则字段表中对应字段为禁用
     * @param {Any} 是否先清除tableFieldOptions子项目所有禁用状态
     * 
    */
    setDisabledWhenInitPage(clear){
      const drawingListInDB = getDrawingList();
      if(clear){
        this.tableFieldOptions.forEach((option)=>{
          option.disabled = false;
        });
      }
      drawingListInDB.forEach((item)=>{
        this.tableFieldOptions.forEach((option)=>{
          if(option.value == item.__vModel__) option.disabled = true;
        });
      });   
    },
    //返回组件类型文本
    getTxtByCurrCom(){
      let list = this.tagList;
      let txt = '';
      list.forEach((item)=>{
        item.options.forEach((option)=>{
            if(option.__config__.tagIcon == this.activeData.__config__.tagIcon) txt = option.__config__.label;
        });
      });
      return txt;
    },
    //字段变化清空前置字段
    tableFieldChange(){
      this.activeData.__config__.showByPrependField = undefined;
    },
    //前置字段发生变化
    showByPrependFieldChangeEvent(){
      if(this.activeData.__config__.showByPrependField !== undefined && this.activeData.__vModel__ === this.activeData.__config__.showByPrependField){
        this.$message({
          message: '前置字段名不能与本身字段一致',
          type: 'warning'
        });
        this.activeData.__config__.showByPrependField = undefined;
      }
    },
    //请求规则列表
    getRegularList(){                 
      this.$requestLocal({
        data:this.$com.resetDataType({}),
        url: 'regular/allList.json',
        method:"get"
      }).then(res => {
          console.log(res,"res")
         
      }, err => {
        console.log(err)
      });
    },
    //正则下拉表变化
    regValChangeEvent(){
      let item = this.$xhb.getItemByProp(this.regList,'id', this.activeData.__config__.regVal);
      // console.log(item,"iii")
      this.activeData.__config__.regList.forEach((o,i)=>{
        if(o.active){
          o.message = item.message;
          o.pattern = item.pattern;
        }
      });
    },
    delRegItem(item,index){
      this.activeData.__config__.regList.splice(index, 1);
      if(this.activeData.__config__.regList.length){
        this.clickRegItem(this.activeData.__config__.regList[0], 0);
      }else{
        this.activeData.__config__.regVal = undefined;
      }
      
    },
    //点击选择正则item
    clickRegItem(item,index){
      this.activeData.__config__.regList.forEach((o,i)=>{
        o.active = index === i;
      });

      this.activeData.__config__.regVal = undefined;
      this.regList.forEach((v)=>{
        if(v.message === item.message && v.pattern === item.pattern) this.activeData.__config__.regVal = v.id;
      });
      
    },
    //-----------------输入正则提示，自动完成sss------------------------------
    //输入后匹配输入建议
    regQuerySearch(queryString, cb){
      //必须设置属性value
      this.regList.map((item)=>{
        item.value = item.message;
        return item
      })
      this.$com.elAutocompleteFn.querySearchInit(queryString, cb, this.regList, 'message')
    },
    regHandleSelect(item,a,b) {
      console.log(item,a,b,".............");
      let list = this.activeData.__config__.regList;
      list.forEach((o,index)=>{
        if(o.message === item.message){
          o.pattern = item.pattern
        }
      });
    },
    //-----------------输入正则提示，自动完成eee------------------------------
  }
}
</script>

<style lang="scss" scoped>
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label{
  font-size: 14px;
}
.node-icon{
  color: #bebfc3;
}
.diy-el-slider{
  display:flex;
}
.diy-el-slider-main{
  width:85%;
  margin-right:5%;
}
.select-option-draggable-box{
  height:auto;
  max-height:200px;
  overflow: auto;
}
.right-board .el-form-item--small.el-form-item{
  margin-bottom: 8px;
}
.right-board label.el-form-item__label {
    padding-bottom: 0px !important;
}
.right-board .el-form--label-top .el-form-item__label{
  padding-bottom: 0px !important;
}
.web-reg-box{
  height:auto;
  max-height:370px;
  overflow: auto;
  overflow-x: hidden;
}
.reg-item-active{
  background: rgba(14,196,57,0.2);
}
div.reg-item .close-btn{
  right: 3px;
  top: 3px;
}
</style>
