export default {
  'list-type': (h, conf, key) => {
    const list = []
    const config = conf.__config__
    if (conf['list-type'] === 'picture-card') {
      list.push(<i class="el-icon-plus"></i>)
    } else {
      list.push(<el-button size="small" type="primary" icon="el-icon-upload">{config.buttonText}</el-button>)
    }
    if (config.showTip) {
      let htmlContent = <div slot="tip" class="el-upload__tip">只能上传不超过 {config.fileSize}{config.sizeUnit} 的{conf.accept}文件 </div>      
      
      if(config.typeCode === 9){ //domPropsInnerHTML 动态给vue 虚拟节点插入html模板
        htmlContent = <div id={'u_' +config.renderKey} slot="tip" class="el-upload__tip" domPropsInnerHTML={config.uploadDes || '<p></p>' }></div>
      }
     
      list.push(
        htmlContent
      )
    }
    
    return list
  }
}
