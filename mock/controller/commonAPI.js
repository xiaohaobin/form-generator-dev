const { mock } = require('mockjs')
const { handleRandomImage } = require('../utils')

const List = []
const count = 999

/**
 * [
            {
                "apiName": "国家数据列表接口",
                "requestMethod": "GET",
                "contentType": "application/x-www-form-urlencoded",
                "apiUrl": "/common/getAreaCountryName",
                "requestParam": "",
                "creator": "admin",
                "createdDate": "2024-01-08",
                "lastUpdatePeople": "admin",
                "lastUpdateDate": "2024-01-09",
                "id": 1
            },
            {
                "apiName": "查询城市接口",
                "requestMethod": "POST",
                "contentType": "application/x-www-form-urlencoded",
                "apiUrl": "/common/searchCitys",
                "requestParam": "{}",
                "creator": "admin",
                "createdDate": "2024-01-08",
                "lastUpdatePeople": "admin",
                "lastUpdateDate": "2024-01-09",
                "id": 2
            }
        ]
 * 
*/
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: '@uuid',
      "id|1-100": 100,  
      creator: '@cname',
      createdDate: '@datetime',
      lastUpdateDate: "@datetime",
      lastUpdatePeople: "@cname", 
      remark: "@title(3,5)",
      tempName: "@title(3,5)",

      "apiName|1": [ "查询城市接口","国家数据列表接口"],
      "requestMethod|1": [ "GET","POST"],
      "contentType": "application/x-www-form-urlencoded",
      "apiUrl": "/common/getAreaCountryName",
      "requestParam": "",
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
            uuid: '@uuid',
            "id|1-100": 100,
            creator: '@cname',
            createdDate: '@datetime',
            lastUpdateDate: "@datetime",
            lastUpdatePeople: "@cname", 
            remark: "@title(3,5)",
            tempName: "@title(3,5)",
      
            "apiName|1": [ "查询城市接口","国家数据列表接口"],
            "requestMethod|1": [ "GET","POST"],
            "contentType": "application/x-www-form-urlencoded",
            "apiUrl": "/common/getAreaCountryName",
            "requestParam": "",
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
    url: '/commonAPI/allList',
    type: 'post',
    response(config) {
      return responseFn(config);
    },
  },
  {
    url: '/commonAPI/list',
    type: 'post',
    response(config) {
      return responseFn(config);
    },
  },
  {
    url: '/commonAPI/addCommonAPI',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/commonAPI/updateCommonAPI',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟更新成功',
      }
    },
  },
  {
    url: '/commonAPI/delCommonAPI',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
