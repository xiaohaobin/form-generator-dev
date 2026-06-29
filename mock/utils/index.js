const { Random } = require('mockjs')
const { join } = require('path')
const fs = require('fs')

/**
 * 
 * @description 随机生成图片url。
 * @param width
 * @param height
 * @returns {string}
 */
function handleRandomImage(width = 50, height = 50) {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}

/**
 * 
 * @description 处理所有 controller 模块，npm run serve时在node环境中自动输出controller文件夹下Mock接口，请勿修改。
 * @returns {[]}
 */
function handleMockArray() {
  const mockArray = []
  const getFiles = (jsonPath) => {
    const jsonFiles = []
    const findJsonFile = (path) => {
      const files = fs.readdirSync(path)
      files.forEach((item) => {
        const fPath = join(path, item)
        const stat = fs.statSync(fPath)
        if (stat.isDirectory() === true) findJsonFile(item)
        if (stat.isFile() === true) jsonFiles.push(item)
      })
    }
    findJsonFile(jsonPath)
    jsonFiles.forEach((item) => mockArray.push(`./controller/${item}`))
  }
  getFiles('mock/controller')
  return mockArray
}

/**
 * 解析请求体（支持 JSON 与 application/x-www-form-urlencoded）
 * @param {object|string|undefined} body
 * @returns {object}
 */
function parseRequestBody(body) {
  if (!body) return {}
  if (typeof body === 'object') return body
  try {
    return JSON.parse(body)
  } catch (e) {
    const params = {}
    String(body).split('&').forEach((pair) => {
      const eqIndex = pair.indexOf('=')
      if (eqIndex === -1) return
      const key = decodeURIComponent(pair.slice(0, eqIndex))
      const val = decodeURIComponent(pair.slice(eqIndex + 1))
      if (key) params[key] = val
    })
    return params
  }
}

/**
 * 列表分页（page/size 强制转为数字，避免字符串拼接导致 slice 异常）
 * @param {Array} list
 * @param {object} query
 * @returns {{ totalCount: number, data: Array }}
 */
function paginateList(list, query = {}) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1)
  const size = Math.max(parseInt(query.size, 10) || 10, 1)
  const start = size * (page - 1)
  return {
    totalCount: list.length,
    data: list.slice(start, start + size),
  }
}

module.exports = {
  handleRandomImage,
  handleMockArray,
  parseRequestBody,
  paginateList,
}
