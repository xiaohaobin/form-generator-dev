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
      'productType|1': [1, 2,3],
      creator: '@cname',
      createdDate: '@datetime',
      lastUpdateDate: "@datetime",
      lastUpdatePeople: "@cname", 
      remark: "@title(3,5)",
      tempName: "@title(3,5)",

      pageViews: '@integer(300, 5000)',
      img: handleRandomImage(200, 200),
      smallImg: handleRandomImage(40, 40),
      switch: '@boolean',
      percent: '@integer(80,99)',
    })
  )
}

module.exports = [
  {
    url: '/template/list',
    type: 'post',
    response(config) {
      if (!config.body) {
        return {
          code: 200,
          msg: 'success',
          totalCount: count,
          data: mock({
            'data|50': [
              {
                id: '@id',
                title: '@csentence(1, 2)',
                country: "1",
                'productType|1': [1, 2,3],
                creator: '@cname',
                createdDate: '@datetime',
                lastUpdateDate: "@datetime",
                lastUpdatePeople: "@cname",
                remark: "@title(3,5)",
                tempName: "@title(3,5)",

                pageViews: '@integer(300, 5000)',
                img: handleRandomImage(200, 200),
                smallImg: handleRandomImage(40, 40),
                switch: '@boolean',
                percent: '@integer(80,99)',
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
