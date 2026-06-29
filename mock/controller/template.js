const { mock } = require('mockjs')
const { handleRandomImage } = require('../utils')
const { parseRequestBody, paginateList } = require('../utils')

/** 机型代号（与字段管理表名维度一致） */
const DEVICE_MODELS = ['TLX', 'MIX', 'MAX', 'INV', 'SPH', 'SPA', 'SPM', 'SPE', 'WIT', 'NOAH', 'Datalog']

/**
 * 业务模板名称池（贴近 Growatt 表单配置化系统场景）
 * productType: 1-逆变器  2-采集器
 * tempType: 1-阳台储能 2-设备通用 3-逆变器设置 4-采集器设置 5-储能机设置
 */
const TEMPLATE_DEFINITIONS = [
  { tempName: 'TLX系列换机申请模板', productType: 1, tempType: 3, country: '1', remark: 'TLX机型换机流程表单，含逆变器开关机与并网参数' },
  { tempName: 'MIX机型设备设置项模板', productType: 1, tempType: 2, country: '1', remark: 'MIX混逆机型通用设备参数配置' },
  { tempName: 'MAX储能机并网参数模板', productType: 1, tempType: 5, country: '1', remark: 'MAX系列储能并网、防孤岛及馈网限制设置' },
  { tempName: 'INV通用逆变器设置模板', productType: 1, tempType: 3, country: '1', remark: '通用逆变器有功/无功功率及工作模式配置' },
  { tempName: 'SPH阳台储能设置项模板', productType: 1, tempType: 1, country: '1', remark: 'SPH阳台储能机SOC、充放电电流限值配置' },
  { tempName: 'SPA机型电池SOC配置模板', productType: 1, tempType: 5, country: '1', remark: 'SPA储能机型电池充放电SOC上下限设置' },
  { tempName: 'SPM并机主从参数模板', productType: 1, tempType: 2, country: '1', remark: 'SPM多机并联主从模式及AC耦合配置' },
  { tempName: 'SPE机型MPPT参数模板', productType: 1, tempType: 3, country: '1', remark: 'SPE机型光伏MPPT跟踪及PV输入参数' },
  { tempName: 'WIT系列换机申请模板', productType: 1, tempType: 3, country: '1', remark: 'WIT机型换机申请，含设备SN与固件版本校验' },
  { tempName: 'NOAH储能系统参数模板', productType: 1, tempType: 5, country: '1', remark: 'NOAH储能系统削峰填谷与备电模式配置' },
  { tempName: 'Datalog采集器联网配置模板', productType: 2, tempType: 4, country: '1', remark: '采集器WiFi/RS485通信及数据上报配置' },
  { tempName: '逆变器开关机配置模板', productType: 1, tempType: 3, country: '1', remark: '逆变器启停、syn使能及并网状态设置' },
  { tempName: '电池充放电SOC设置模板', productType: 1, tempType: 5, country: '1', remark: '电池充电SOC上限、放电SOC下限及强充使能' },
  { tempName: '电网保护参数配置模板', productType: 1, tempType: 2, country: '1', remark: '过压/欠压/过频/欠频保护阈值设置' },
  { tempName: '储能工作模式配置模板', productType: 1, tempType: 5, country: '1', remark: '自发自用、备电、削峰填谷等EMS模式' },
  { tempName: '采集器固件升级表单模板', productType: 2, tempType: 4, country: '1', remark: '采集器远程固件升级确认与版本回退' },
  { tempName: 'TLX欧洲并网标准模板', productType: 1, tempType: 3, country: '2', remark: 'TLX机型适用欧洲G99/G59并网标准参数' },
  { tempName: 'MAX北美储能配置模板', productType: 1, tempType: 5, country: '3', remark: 'MAX储能北美UL1741并网及备电配置' },
  { tempName: 'MIX澳洲防孤岛设置模板', productType: 1, tempType: 2, country: '4', remark: 'MIX机型澳洲AS4777防孤岛保护参数' },
  { tempName: 'INV工商业储能参数模板', productType: 1, tempType: 5, country: '1', remark: '工商业场景大功率储能充放电策略' },
  { tempName: 'SPH户用阳台储能模板', productType: 1, tempType: 1, country: '1', remark: '户用阳台场景小型储能日常运行参数' },
  { tempName: 'Datalog批量初始化模板', productType: 2, tempType: 4, country: '1', remark: '采集器批量出厂初始化与Modbus地址分配' },
  { tempName: 'SPA户用逆变器设置模板', productType: 1, tempType: 3, country: '1', remark: 'SPA户用单相逆变器额定功率及功率因数' },
  { tempName: 'WIT离网储能配置模板', productType: 1, tempType: 5, country: '1', remark: 'WIT离网模式柴发充电与AC耦合设置' },
  { tempName: 'NOAH分时电价策略模板', productType: 1, tempType: 5, country: '1', remark: 'NOAH储能TOU分时充放电计划绑定' },
  { tempName: 'SPE三相逆变器参数模板', productType: 1, tempType: 3, country: '1', remark: 'SPE三相机型电网电压频率及并网参数' },
  { tempName: 'SPM微逆组网配置模板', productType: 1, tempType: 2, country: '1', remark: 'SPM微型逆变器组网与功率限制配置' },
  { tempName: '采集器异常诊断表单模板', productType: 2, tempType: 4, country: '1', remark: '采集器通信故障诊断与重启操作表单' },
  { tempName: 'TLX电池加热使能模板', productType: 1, tempType: 5, country: '1', remark: 'TLX低温环境电池加热及BMS通信配置' },
  { tempName: 'MAX馈网功率限制模板', productType: 1, tempType: 3, country: '1', remark: 'MAX机型馈网功率上限及导出优先级设置' },
]

const PRODUCT_TYPE_LABEL = {
  1: '逆变器',
  2: '采集器',
}

const count = TEMPLATE_DEFINITIONS.length

const List = TEMPLATE_DEFINITIONS.map((def, index) => mock({
  uuid: '@uuid',
  id: index + 1,
  country: def.country,
  title: def.tempName,
  productType: def.productType,
  tempType: def.tempType,
  creator: '@cname',
  createdDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
  lastUpdateDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
  lastUpdatePeople: '@cname',
  remark: def.remark,
  tempName: def.tempName,
  pageViews: '@integer(300, 5000)',
  img: handleRandomImage(200, 200),
  smallImg: handleRandomImage(40, 40),
  switch: '@boolean',
  percent: '@integer(80, 99)',
}))

function filterList(query = {}) {
  const {
    tempName = '',
    product = '',
    country = '',
    title = '',
  } = query

  const keyword = tempName || title

  const result = List.filter((item) => {
    const matchName = !keyword || item.tempName.includes(keyword)
    const productLabel = PRODUCT_TYPE_LABEL[item.productType] || ''
    const matchProduct = !product
      || productLabel.includes(product)
      || String(item.productType) === String(product)
    const matchCountry = !country || String(item.country).split(',').some((c) => country.split(',').includes(c))
    return matchName && matchProduct && matchCountry
  })

  return paginateList(result, query)
}

module.exports = [
  {
    url: '/template/list',
    type: 'post',
    response(config) {
      const body = parseRequestBody(config.body)
      const { totalCount, data } = filterList(body)
      return {
        code: 200,
        msg: 'success',
        totalCount,
        data,
        obj: data,
      }
    },
  },
  {
    url: '/template/addTemplate',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/template/updateTemplate',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟更新成功',
      }
    },
  },
  {
    url: '/template/delTemplate',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
