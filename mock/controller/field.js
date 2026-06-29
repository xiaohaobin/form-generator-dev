const { mock } = require('mockjs')
const { parseRequestBody, paginateList } = require('../utils')

/** 设备机型维度表名（与字段无语义关联，仅表示所属机型配置表） */
const DEVICE_TABLES = [
  'tlx_setting',
  'mix_setting',
  'max_setting',
  'inv_setting',
  'sph_setting',
  'spa_setting',
  'spm_setting',
  'spe_setting',
  'wit_setting',
  'noah_setting',
  'datalog_setting',
]

/**
 * 设置项字段池（tableField 全局唯一，fieldAlias 为中文别名）
 * 与表名无语义绑定，表名仅标识设备机型
 */
const FIELD_POOL = [
  { tableField: 'syn', fieldAlias: 'syn使能', remark: '并网同步使能开关，0-关闭 1-开启' },
  { tableField: 'Inverter_on_off', fieldAlias: '逆变器开关机', remark: '逆变器启停控制，0-关机 1-开机' },
  { tableField: 'inverter_work_mode', fieldAlias: '逆变器工作模式', remark: '自发自用/馈网优先/备电等运行模式' },
  { tableField: 'rated_output_power', fieldAlias: '额定输出功率', remark: '逆变器额定输出功率，单位 kW' },
  { tableField: 'active_power_set', fieldAlias: '有功功率设定', remark: '有功功率设定值，单位 kW' },
  { tableField: 'reactive_power_set', fieldAlias: '无功功率设定', remark: '无功功率设定值，单位 kVar' },
  { tableField: 'power_factor_set', fieldAlias: '功率因数设定', remark: '功率因数设定，范围 -1~1' },
  { tableField: 'inverter_efficiency', fieldAlias: '逆变器转换效率', remark: '当前逆变转换效率，单位 %' },
  { tableField: 'dc_input_voltage', fieldAlias: '直流输入电压', remark: '直流母线电压，单位 V' },
  { tableField: 'ac_output_voltage', fieldAlias: '交流输出电压', remark: '交流侧输出电压，单位 V' },
  { tableField: 'battery_on_off', fieldAlias: '电池开关机', remark: '电池充放电回路启停，0-关闭 1-开启' },
  { tableField: 'battery_charge_soc', fieldAlias: '电池充电SOC上限', remark: '充电截止 SOC，单位 %' },
  { tableField: 'battery_discharge_soc', fieldAlias: '电池放电SOC下限', remark: '放电截止 SOC，单位 %' },
  { tableField: 'battery_charge_current_limit', fieldAlias: '电池充电电流限值', remark: '最大充电电流，单位 A' },
  { tableField: 'battery_discharge_current_limit', fieldAlias: '电池放电电流限值', remark: '最大放电电流，单位 A' },
  { tableField: 'battery_type', fieldAlias: '电池类型', remark: '锂电/铅酸等电池化学类型枚举' },
  { tableField: 'battery_rated_capacity', fieldAlias: '电池额定容量', remark: '电池额定容量，单位 Ah' },
  { tableField: 'battery_soc', fieldAlias: '电池当前SOC', remark: '电池荷电状态实时值，单位 %' },
  { tableField: 'battery_soh', fieldAlias: '电池健康度SOH', remark: '电池健康状态，单位 %' },
  { tableField: 'bms_comm_status', fieldAlias: 'BMS通信状态', remark: 'BMS 通信在线状态，0-离线 1-在线' },
  { tableField: 'force_charge_enable', fieldAlias: '强充使能', remark: '强制充电模式使能开关' },
  { tableField: 'battery_heating_enable', fieldAlias: '电池加热使能', remark: '低温电池加热功能开关' },
  { tableField: 'battery_temp', fieldAlias: '电池温度', remark: '电池包温度，单位 ℃' },
  { tableField: 'grid_connect_status', fieldAlias: '并网状态', remark: '当前并网运行状态' },
  { tableField: 'grid_voltage', fieldAlias: '电网电压', remark: '电网侧电压，单位 V' },
  { tableField: 'grid_frequency', fieldAlias: '电网频率', remark: '电网频率，单位 Hz' },
  { tableField: 'anti_islanding_enable', fieldAlias: '防孤岛使能', remark: '防孤岛保护功能开关' },
  { tableField: 'grid_standard_code', fieldAlias: '并网标准码', remark: '适用并网标准，如 G59/G99/UL1741' },
  { tableField: 'export_power_limit', fieldAlias: '馈网功率限制', remark: '最大馈网功率，单位 kW' },
  { tableField: 'grid_fault_ride_through', fieldAlias: '电网故障穿越', remark: '低电压/高电压穿越使能' },
  { tableField: 'pv1_voltage', fieldAlias: 'PV1输入电压', remark: '光伏组串1电压，单位 V' },
  { tableField: 'pv1_current', fieldAlias: 'PV1输入电流', remark: '光伏组串1电流，单位 A' },
  { tableField: 'pv2_voltage', fieldAlias: 'PV2输入电压', remark: '光伏组串2电压，单位 V' },
  { tableField: 'pv2_current', fieldAlias: 'PV2输入电流', remark: '光伏组串2电流，单位 A' },
  { tableField: 'mppt_track_mode', fieldAlias: 'MPPT跟踪模式', remark: 'MPPT 工作模式枚举' },
  { tableField: 'pv_insulation_resistance', fieldAlias: 'PV绝缘阻抗', remark: 'PV 对地绝缘阻抗，单位 kΩ' },
  { tableField: 'pv_input_power', fieldAlias: 'PV输入总功率', remark: '光伏直流输入总功率，单位 kW' },
  { tableField: 'over_voltage_protect', fieldAlias: '过压保护阈值', remark: '交流过压保护触发值，单位 V' },
  { tableField: 'under_voltage_protect', fieldAlias: '欠压保护阈值', remark: '交流欠压保护触发值，单位 V' },
  { tableField: 'over_freq_protect', fieldAlias: '过频保护阈值', remark: '过频保护触发值，单位 Hz' },
  { tableField: 'under_freq_protect', fieldAlias: '欠频保护阈值', remark: '欠频保护触发值，单位 Hz' },
  { tableField: 'over_temp_protect', fieldAlias: '过温保护阈值', remark: '散热器过温保护温度，单位 ℃' },
  { tableField: 'dc_reverse_polarity_protect', fieldAlias: '直流反接保护', remark: 'PV 直流反接保护使能' },
  { tableField: 'gfci_protect_enable', fieldAlias: '漏电流保护使能', remark: 'GFCI 漏电流保护开关' },
  { tableField: 'ess_work_mode', fieldAlias: '储能工作模式', remark: '削峰填谷/备电/自发自用等模式' },
  { tableField: 'grid_charge_enable', fieldAlias: '电网充电使能', remark: '允许从电网取电充电' },
  { tableField: 'gen_charge_enable', fieldAlias: '发电机充电使能', remark: '允许柴发/油机充电' },
  { tableField: 'ac_coupling_enable', fieldAlias: 'AC耦合使能', remark: 'AC 耦合储能模式开关' },
  { tableField: 'parallel_master_slave', fieldAlias: '并机主从模式', remark: '多机并联主从角色设定' },
  { tableField: 'peak_shaving_enable', fieldAlias: '削峰填谷使能', remark: '峰谷电价套利功能开关' },
  { tableField: 'self_consumption_mode', fieldAlias: '自发自用模式', remark: '优先本地消纳光伏发电' },
  { tableField: 'backup_power_mode', fieldAlias: '备电模式', remark: '电网断电时电池备电运行' },
  { tableField: 'tou_schedule_id', fieldAlias: '分时电价策略', remark: '绑定的 TOU 充放电计划 ID' },
  { tableField: 'rs485_addr', fieldAlias: 'RS485通信地址', remark: 'Modbus RTU 从机地址' },
  { tableField: 'modbus_tcp_port', fieldAlias: 'ModbusTCP端口', remark: 'Modbus TCP 监听端口' },
  { tableField: 'wifi_ssid', fieldAlias: 'WiFi SSID', remark: '设备配网 WiFi 名称' },
  { tableField: 'firmware_version', fieldAlias: '固件版本号', remark: '逆变器主控固件版本' },
  { tableField: 'device_sn', fieldAlias: '设备序列号', remark: '逆变器出厂 SN 码' },
  { tableField: 'commissioning_date', fieldAlias: '投运日期', remark: '设备首次并网投运日期' },
  { tableField: 'datalog_sn', fieldAlias: '采集器序列号', remark: '数据采集器 SN' },
]

const ALL_TABLE_FIELDS = FIELD_POOL.map((f) => f.tableField)

/** 各机型表均挂载完整字段池（表名与字段无语义关联） */
const TABLE_GROUPS = DEVICE_TABLES.map((name) => ({
  name,
  label: name,
  children: ALL_TABLE_FIELDS,
}))

/**
 * 字段记录：每个机型表下挂载全量字段（tableName + tableField 联合唯一）
 */
const List = []
let id = 1
DEVICE_TABLES.forEach((tableName) => {
  FIELD_POOL.forEach((field) => {
    List.push(mock({
      id: id++,
      tableName,
      tableField: field.tableField,
      fieldAlias: field.fieldAlias,
      remark: field.remark,
      creator: '@cname',
      createdDate: '@datetime("yyyy-MM-dd")',
      lastUpdateDate: '@datetime("yyyy-MM-dd")',
      lastUpdatePeople: '@cname',
    }))
  })
})

/** 设计器字段下拉：按 tableField 去重 */
const uniqueFieldList = FIELD_POOL.map((field, index) => mock({
  id: index + 1,
  tableField: field.tableField,
  fieldAlias: field.fieldAlias,
  tableName: DEVICE_TABLES[index % DEVICE_TABLES.length],
  remark: field.remark,
  creator: '@cname',
  createdDate: '@datetime("yyyy-MM-dd")',
  lastUpdateDate: '@datetime("yyyy-MM-dd")',
  lastUpdatePeople: '@cname',
}))

function filterList(sourceList, query = {}) {
  const {
    tableField = '',
    fieldAlias = '',
    tableName,
  } = query

  const result = sourceList.filter((item) => {
    const matchField = !tableField || item.tableField.toLowerCase().includes(String(tableField).toLowerCase())
    const matchAlias = !fieldAlias || item.fieldAlias.includes(fieldAlias)
    const matchTable = tableName === undefined || tableName === '' || tableName === null || item.tableName === tableName
    return matchField && matchAlias && matchTable
  })

  return paginateList(result, query)
}

function responseFn(config) {
  const body = parseRequestBody(config.body)
  const { totalCount, data } = filterList(List, body)

  return {
    code: 200,
    msg: 'success',
    totalCount,
    data,
    obj: data,
  }
}

function allListResponseFn() {
  return {
    code: 200,
    msg: 'success',
    totalCount: uniqueFieldList.length,
    data: uniqueFieldList,
    obj: uniqueFieldList,
  }
}

module.exports = [
  {
    url: '/field/allList',
    type: 'post',
    response() {
      return allListResponseFn()
    },
  },
  {
    url: '/field/list',
    type: 'post',
    response(config) {
      return responseFn(config)
    },
  },
  {
    url: '/field/databaseTableList',
    type: 'post',
    response() {
      return {
        code: 200,
        data: TABLE_GROUPS,
      }
    },
  },
  {
    url: '/field/addField',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/field/updateField',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟更新成功',
      }
    },
  },
  {
    url: '/field/delField',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
