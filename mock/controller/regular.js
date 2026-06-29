const { mock } = require('mockjs')
const { parseRequestBody, paginateList } = require('../utils')

/**
 * 校验规则定义
 * checkType: 1-输入校验(前端正则)  2-数据校验(后端方法)
 */
const REGULAR_DEFINITIONS = [
  {
    regularName: '设备SN格式校验',
    checkType: 1,
    webRegular: '/^[A-Z0-9]{10,18}$/',
    serverFunction: '',
    remark: '校验逆变器/采集器序列号，仅允许10~18位大写字母与数字',
  },
  {
    regularName: 'IPv4地址格式校验',
    checkType: 1,
    webRegular: '/^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])(\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])){3}$/',
    serverFunction: '',
    remark: '校验通信配置中IPv4地址格式，四段0~255',
  },
  {
    regularName: 'SOC百分比范围校验',
    checkType: 1,
    webRegular: '/^(100|[1-9]?\\d)$/',
    serverFunction: '',
    remark: '电池SOC取值范围0~100的整数',
  },
  {
    regularName: '电网频率格式校验',
    checkType: 1,
    webRegular: '/^(4[5-9]|5[0-5])(\\.\\d{1,2})?$/',
    serverFunction: '',
    remark: '电网频率允许范围45.00~55.00Hz，最多两位小数',
  },
  {
    regularName: '功率因数范围校验',
    checkType: 1,
    webRegular: '/^(-1|-0\\.\\d{1,2}|0(\\.\\d{1,2})?|0\\.\\d{1,2}|1)$/',
    serverFunction: '',
    remark: '有功功率因数设定范围-1.00~1.00',
  },
  {
    regularName: '字段命名规范校验',
    checkType: 1,
    webRegular: '/^[a-zA-Z][a-zA-Z0-9_]{0,63}$/',
    serverFunction: '',
    remark: '设置项字段名须字母开头，仅含字母数字下划线，最长64字符',
  },
  {
    regularName: '额定功率正数校验',
    checkType: 1,
    webRegular: '/^\\d+(\\.\\d{1,2})?$/',
    serverFunction: '',
    remark: '逆变器额定输出功率须为正数，最多两位小数，单位kW',
  },
  {
    regularName: 'Modbus地址范围校验',
    checkType: 1,
    webRegular: '/^([1-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])$/',
    serverFunction: '',
    remark: 'RS485 Modbus从机地址范围1~255',
  },
  {
    regularName: '固件版本号格式校验',
    checkType: 1,
    webRegular: '/^\\d+\\.\\d+\\.\\d+$/',
    serverFunction: '',
    remark: '固件版本号格式x.y.z，如1.2.3',
  },
  {
    regularName: '手机号码格式校验',
    checkType: 1,
    webRegular: '/^1[3-9]\\d{9}$/',
    serverFunction: '',
    remark: '运维联系人手机号，中国大陆11位号码',
  },
  {
    regularName: '电池SOC上下限逻辑校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateBatterySocRange',
    remark: '充电SOC上限须大于放电SOC下限，且均在0~100之间',
  },
  {
    regularName: '逆变器并网状态校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateGridConnectStatus',
    remark: 'syn使能开启时须满足电网电压频率在并网标准范围内',
  },
  {
    regularName: '馈网功率限制校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateExportPowerLimit',
    remark: '馈网功率限制不得超过逆变器额定输出功率',
  },
  {
    regularName: '充电电流限值合法性',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateChargeCurrentLimit',
    remark: '电池充电电流限值须在BMS允许的最大充电电流以内',
  },
  {
    regularName: 'syn使能联动校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateSynEnable',
    remark: '逆变器关机状态下不允许单独开启syn使能',
  },
  {
    regularName: 'BMS通信在线校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateBmsCommStatus',
    remark: '修改电池参数前须确认BMS通信状态为在线',
  },
  {
    regularName: '并机主从模式校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateParallelMode',
    remark: '并机场景下须至少一台主机，从机数量不超过协议上限',
  },
  {
    regularName: 'MPPT路数参数校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateMpptChannel',
    remark: 'PV组串电压电流须在机型允许输入范围内',
  },
  {
    regularName: '防孤岛使能合规校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateAntiIslanding',
    remark: '并网机型在指定国家区域下防孤岛保护须保持开启',
  },
  {
    regularName: '储能工作模式切换校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateEssWorkMode',
    remark: '备电模式与削峰填谷模式互斥，切换前须停止充放电',
  },
  {
    regularName: '电网电压保护阈值校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateGridVoltageProtect',
    remark: '过压保护阈值须高于欠压保护阈值，且符合当地并网标准',
  },
  {
    regularName: '强充使能前置条件校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateForceChargeEnable',
    remark: '开启强充使能须同时满足BMS在线且SOC低于放电下限',
  },
  {
    regularName: '采集器SN绑定校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateDatalogSnBind',
    remark: '采集器序列号须与逆变器设备已绑定且通信正常',
  },
  {
    regularName: 'TOU分时策略完整性校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateTouSchedule',
    remark: '分时电价策略时段须覆盖24小时且无重叠',
  },
  {
    regularName: '过温保护阈值校验',
    checkType: 1,
    webRegular: '/^([4-9]\\d|1[0-2]\\d)$/',
    serverFunction: '',
    remark: '散热器过温保护温度设定范围40~120℃',
  },
  {
    regularName: 'WiFi SSID格式校验',
    checkType: 1,
    webRegular: '/^[\\w\\-\\.\\s]{1,32}$/',
    serverFunction: '',
    remark: '采集器配网WiFi名称，最长32字符',
  },
  {
    regularName: '投运日期合法性校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateCommissioningDate',
    remark: '设备投运日期不得早于出厂日期且不得晚于当前日期',
  },
  {
    regularName: 'AC耦合使能条件校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateAcCouplingEnable',
    remark: 'AC耦合模式须机型支持且储能电池已正常接入',
  },
  {
    regularName: '放电电流限值校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateDischargeCurrentLimit',
    remark: '放电电流限值不得超过BMS最大允许放电电流',
  },
  {
    regularName: '电网标准码匹配校验',
    checkType: 2,
    webRegular: '',
    serverFunction: 'validateGridStandardCode',
    remark: '所选并网标准码须与适用国家/地区及机型匹配',
  },
]

const List = REGULAR_DEFINITIONS.map((def, index) => mock({
  uuid: '@uuid',
  id: index + 1,
  country: '1',
  regularName: def.regularName,
  checkType: def.checkType,
  webRegular: def.webRegular,
  serverFunction: def.serverFunction,
  remark: def.remark,
  creator: '@cname',
  createdDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
  lastUpdateDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
  lastUpdatePeople: '@cname',
}))

function filterList(query = {}) {
  const {
    regularName = '',
    checkType,
    regularOrFunction = '',
  } = query

  const result = List.filter((item) => {
    const matchName = !regularName || item.regularName.includes(regularName)
    const matchType = checkType === undefined || checkType === '' || checkType === null
      || String(item.checkType) === String(checkType)
    const expr = item.checkType === 1 ? item.webRegular : item.serverFunction
    const matchExpr = !regularOrFunction || (expr && expr.includes(regularOrFunction))
    return matchName && matchType && matchExpr
  })

  return paginateList(result, query)
}

function responseFn(config) {
  const body = parseRequestBody(config.body)
  const { totalCount, data } = filterList(body)
  return {
    code: 200,
    msg: 'success',
    totalCount,
    data,
    obj: data,
  }
}

function allListResponseFn(config) {
  const body = parseRequestBody(config.body)
  const { totalCount, data } = filterList({ ...body, page: 1, size: List.length })
  return {
    code: 200,
    msg: 'success',
    totalCount,
    data,
    obj: data,
  }
}

module.exports = [
  {
    url: '/regular/allList',
    type: 'post',
    response(config) {
      return allListResponseFn(config)
    },
  },
  {
    url: '/regular/list',
    type: 'post',
    response(config) {
      return responseFn(config)
    },
  },
  {
    url: '/regular/addRegular',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/regular/updateRegular',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟更新成功',
      }
    },
  },
  {
    url: '/regular/delRegular',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
