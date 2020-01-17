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
  formatTime: formatTime,
  getDate: getDate,
  getYearAndMonth: getYearAndMonth,
  getYear: getYear,
  getTime: getTime,
  getWeek: getWeek
}