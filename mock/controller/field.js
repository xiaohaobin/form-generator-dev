const { mock } = require('mockjs')
const { handleRandomImage } = require('../utils')

const List = []
const count = 999

/**
 * {
                "tableField": "userName",
                "fieldAlias": "用户名称",
                "tableName": "server_function",
                "creator": "admin",
                "createdDate": "2024-01-08",
                "lastUpdatePeople": "admin",
                "lastUpdateDate": "2024-01-09",
                "remark": "用户表下的用户名，string类型",
                "id": 1
            }
 * 
*/

const tableFieldMapList = {
  "userName":"用户名称",
  "password":"密码",
  "email":"邮箱",
  "phone":"手机号",
  "plantName":"电站名称",
  "deviceName":"设备名称",
  "remark":"备注",
  "deviceType":"设备类型",
  "sex":"性别",
  "jobId":"工号"
}

for (let i = 0; i < count; i++) {
  List.push(
    mock({
      "id|1-100": 100,  
      creator: '@cname',
      createdDate: '@datetime',
      lastUpdateDate: "@datetime",
      lastUpdatePeople: "@cname", 
      remark: "@title(3,20)",
      "tableField|1": Object.keys(tableFieldMapList),
      fieldAlias:function(){
        return tableFieldMapList[this.tableField]
      },

    })
  )
}


function responseFn(config){
  if (!config.body) {
    return {
      code: 200,
      msg: 'success',
      totalCount: count,
      data: mock({
        'data|50': [
          {
            "id|1-100": 100,  
            creator: '@cname',
            createdDate: '@datetime',
            lastUpdateDate: "@datetime",
            lastUpdatePeople: "@cname", 
            remark: "@title(3,20)",
            "tableField|1": Object.keys(tableFieldMapList),
            fieldAlias:function(){
              return tableFieldMapList[this.tableField]
            },
      
          },
        ],
      }).data,
    }
  }
  const { title = '', page = 1, size = 20 } = config.body
  let mockList = List.filter((item) => {
    return !(title && item.title.indexOf(title) < 0)
  })
  const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))
  return {
    code: 200,
    msg: 'success',
    totalCount: count,
    data: pageList,
  }
}

module.exports = [
  {
    url: '/field/allList',
    type: 'post',
    response(config) {
      return responseFn(config);
    },
  },
  {
    url: '/field/list',
    type: 'post',
    response(config) {
      return responseFn(config);
    },
  },
  {
    url: '/field/databaseTableList',
    type: 'post',
    response() {
      return {
        code: 200,
        data: [
            {
                "name": "server_function",
                "children":[
                    "userName","phone","email"
                ]
            },
            {
                "name": "device_table",
                "children":[
                    "deviceType","datalog","sn"
                ]
            }
        ]
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
