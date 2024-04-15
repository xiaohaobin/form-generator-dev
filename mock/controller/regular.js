const { mock } = require('mockjs')
const { handleRandomImage } = require('../utils')

const List = []
const count = 999



for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: '@uuid',
      id: '@id',
      country: "1",
      title: '@csentence(1, 2)',
      'checkType|1': [1, 2],
      creator: '@cname',
      createdDate: '@datetime',
      lastUpdateDate: "@datetime",
      lastUpdatePeople: "@cname", 
      remark: "@title(3,5)",
      regularName: "@title(3,15)",
      webRegular: "/^[a-zA-Z0-9_.]{1,200}$/",
      serverFunction: "serverFunction",

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
            id: '@id',
            country: "1",
            title: '@csentence(1, 2)',
            'checkType|1': [1, 2],
            creator: '@cname',
            createdDate: '@datetime',
            lastUpdateDate: "@datetime",
            lastUpdatePeople: "@cname", 
            remark: "@title(3,5)",
            regularName: "@title(3,5)",
            webRegular: "/^[a-zA-Z0-9_.]{1,200}$/",
            serverFunction: "serverFunction",
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
    url: '/regular/allList',
    type: 'post',
    response(config) {
      return responseFn(config);
    },
  },
  {
    url: '/regular/list',
    type: 'post',
    response(config) {
      return responseFn(config);
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
