export default {
  // default(h, conf, key) {
  //   return conf.__slot__[key]
  // },
  // default(h, conf, key) {
  //   return (<el-link underline={conf.underline} type={conf.type} style={'fontWeight:'+ (conf.__config__.isFontWeightBold? 'bold': 'normal') }>{conf.__slot__.text}</el-link>)
  // }
  text(h, conf, key) {
    let cursor = conf.__config__.isText ? ';cursor: initial;' : ';'
    let color = conf.__config__.color ? `color:${conf.__config__.color};` : ''
    cursor = cursor + color
    return (<el-link underline={conf.underline} type={conf.type} style={'fontWeight:' + (conf.__config__.isFontWeightBold ? 'bold': 'normal') + cursor}>{conf.__slot__.text}</el-link>)
  }
}
