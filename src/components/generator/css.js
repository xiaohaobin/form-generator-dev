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
.type-code-2 .el-col-24:first-child ~ .el-col-24.type-code-2-children label.el-form-item__label{line-height: 0;}`;

const styles = {
  'el-rate': '.el-rate{display: inline-block; vertical-align: text-top;}',
  'el-upload': '.el-upload__tip{line-height: 1.2;}',
  'el-input': '.type-code-2-children .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before{visibility: hidden;}' + stringComStyle
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
