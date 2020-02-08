/************支付相关开始***********/
// 在下面设置商户号
//const mchid = '1511214851'
const mchid = '1574935741'

// 在下面设置密钥
// 特别注意：此项设置应该仅供测试，生产环境下请在后端完成签名，切忌在小程序内暴露商户密钥
//const secret = ''
const secret = 'pd7NF6duPbA5Z6kS'

const getRandomNumber = (minNum = 100000, maxNum = 999999) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)

const getSign = obj => {
  /*
   * 签名算法
   * 
   * 由于密钥不应该在小程序内出现，因此生产环境下的小程序不应该包含此参数
   */

  let keys = Object.keys(obj)
  keys.sort()

  let params = []

  keys.forEach(e => {
    if (obj[e] != null) {
      params.push(e + '=' + obj[e])
    }
  })

  params.push('key=' + secret)

  let paramStr = params.join('&')

  const md5Util = require('../utils/md5.js')
  let signResult = md5Util.md5(paramStr).toUpperCase()

  return signResult
}


const getOrderParams = () => {
  /*
   * 用于获取小程序支付的参数
   * 
   * 本函数仅用于【模拟后端】，在生产环境下订单号的生成、签名等过程应当在后端完成，
   * 由后端直接包装好 orderParams 返回并传递给小程序
   * 
   */

  // 支付参数
  const totalFee = 1 // 支付金额，单位为分
  const body = '小程序支付测试' // 订单标题
  let nonce = getRandomNumber() // 随机数
  let timestamp = Date.now()
  let outTradeNo = 'TEST-WXA-' + timestamp + '-' + nonce // 商户端订单号
  let notifyUrl = null // 异步通知地址
  let attach = null // 异步通知附加数据

  let paramsObject = {
    mchid,
    total_fee: totalFee,
    out_trade_no: outTradeNo,
    body,
    attach,
    notify_url: notifyUrl,
    nonce
  }

  let sign = getSign(paramsObject)

  paramsObject.sign = sign

  return paramsObject
}
/************支付相关结束***********/
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//获得日期
const getDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
//获得年月
const getYearAndMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return [year, month].map(formatNumber).join('-')
}
//获得年份
const getYear = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return [year].map(formatNumber).join('-')
}
//获得时间
const getTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [hour, minute].map(formatNumber).join(':')
}
//获取周区间
const getWeek = function (date, count) {
  console.log(date.getDay().toString())
  var WeekFirstDay
  if (date.getDay().toString() == "0") {
    WeekFirstDay = new Date(date - (date.getDay() + 6 + count) * 86400000);
  } else {
    WeekFirstDay = new Date(date - (date.getDay() - 1 + count) * 86400000);
  }
  var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
  var year = WeekFirstDay.getFullYear()
  var month = WeekFirstDay.getMonth() + 1
  var day = WeekFirstDay.getDate()
  var firstDay = [year, month, day].map(formatNumber).join('-')
  var year = WeekLastDay.getFullYear()
  var month = WeekLastDay.getMonth() + 1
  var day = WeekLastDay.getDate()
  var lastDay = [year, month, day].map(formatNumber).join('-')
  return [firstDay, lastDay];
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  getOrderParams: getOrderParams,
  formatTime: formatTime,
  getDate: getDate,
  getYearAndMonth: getYearAndMonth,
  getYear: getYear,
  getTime: getTime,
  getWeek: getWeek
}