export default {
  // default(h, conf, key) {
  //   return conf.__slot__[key]
  // },
  // default(h, conf, key) {
  //   return (<el-link underline={conf.underline} type={conf.type} style={'fontWeight:'+ (conf.__config__.isFontWeightBold? 'bold': 'normal') }>{conf.__slot__.text}</el-link>)
  // }
  text(h, conf, key) {
    let c = conf.__config__.isText ? ';cursor: initial;' : ''
    return (<el-link underline={conf.underline} type={conf.type} style={'fontWeight:' + (conf.__config__.isFontWeightBold ? 'bold': 'normal') + c}>{conf.__slot__.text}</el-link>)
  }
}
