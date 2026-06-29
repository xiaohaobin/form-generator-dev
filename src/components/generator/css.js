// 重定义组串类子组件部分样式:
let stringComStyle = `.type-code-2{
  height: auto;
  overflow: auto;
  max-height: 300px;
}
.type-code-2 .el-col-6.type-code-2-children:nth-child(4) ~ .el-col-6.type-code-2-children{margin-top:0px;}
.type-code-2 .el-col-6.type-code-2-children:nth-child(4) ~ .el-col-6.type-code-2-children label.el-form-item__label{line-height: 0;}

.type-code-2 .el-col-12.type-code-2-children:nth-child(2) ~ .el-col-12.type-code-2-children{margin-top:0px;}
.type-code-2 .el-col-12.type-code-2-children:nth-child(2) ~ .el-col-12.type-code-2-children label.el-form-item__label{line-height: 0;}

.type-code-2 .el-col-18:first-child ~ .el-col-18.type-code-2-children{margin-top:0px;}
.type-code-2 .el-col-18:first-child ~ .el-col-18.type-code-2-children label.el-form-item__label{line-height: 0;}

.type-code-2 .el-col-24:first-child ~ .el-col-24.type-code-2-children{margin-top:0px;}
.type-code-2 .el-col-24:first-child ~ .el-col-24.type-code-2-children label.el-form-item__label{line-height: 0;}
.string-components-style-1, .el-form--label-left .type-code-2 .el-col-24:first-child label, .el-form--label-right .type-code-2 .el-col-24:first-child label, .el-form--label-left .type-code-2 .el-col-18:first-child label, .el-form--label-right .type-code-2 .el-col-18:first-child label, .el-form--label-left .type-code-2 .el-col-12:first-child label, .el-form--label-right .type-code-2 .el-col-12:first-child label, .el-form--label-left .type-code-2 .el-col-6:first-child label, .el-form--label-right .type-code-2 .el-col-6:first-child label {
  text-align: left;
  float: none;
  width: auto !important;
  padding-bottom: 10px;
}
.string-components-style-2, .el-form--label-left .type-code-2 .el-col-24:first-child .el-form-item__content, .el-form--label-right .type-code-2 .el-col-24:first-child .el-form-item__content, .el-form--label-left .type-code-2 .el-col-18:first-child .el-form-item__content, .el-form--label-right .type-code-2 .el-col-18:first-child .el-form-item__content, .el-form--label-left .type-code-2 .el-col-12:first-child .el-form-item__content, .el-form--label-right .type-code-2 .el-col-12:first-child .el-form-item__content, .el-form--label-left .type-code-2 .el-col-6:first-child .el-form-item__content, .el-form--label-right .type-code-2 .el-col-6:first-child .el-form-item__content {
  margin-left: 0 !important;
}
`;

const inputNumberStyle = `.fg-input-number-wrap{display:inline-flex;align-items:center;width:100%;}
.fg-input-number-inner{position:relative;flex:1;}
.fg-input-number-inner .el-input-number{width:100%;}
.fg-input-number-unit{position:absolute;right:8px;top:50%;transform:translateY(-50%);color:#909399;font-size:12px;pointer-events:none;z-index:1;}
.fg-input-number-range{margin-left:8px;color:#f56c6c;font-size:12px;white-space:nowrap;}`

const styles = {
  'el-rate': '.el-rate{display: inline-block; vertical-align: text-top;}',
  'el-upload': '.el-upload__tip{line-height: 1.2;}',
  'el-input': '.type-code-2-children .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before{visibility: hidden;}' + stringComStyle,
  'el-input-number': inputNumberStyle,
  'el-link': `.el-form-item[type-code="10"] label {
                display: none;
            }`
}

function addCss(cssList, el) {
  const css = styles[el.__config__.tag]
  css && cssList.indexOf(css) === -1 && cssList.push(css)
  if (el.__config__.children) {
    el.__config__.children.forEach(el2 => addCss(cssList, el2))
  }
}

export function makeUpCss(conf) {
  const cssList = []
  conf.fields.forEach(el => addCss(cssList, el))
  return cssList.join('\n')
}
