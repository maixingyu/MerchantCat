const app = getApp()
const util = require("../../../utils/util.js")
const wxCharts = require('../../../utils/wxcharts.js');
var pieChart = null;
var columnChart = null;
Page({
  data: {
    // tab: ['个人支出', '日常费用', '运营成本'],
    // //Personal  daily  operation
    // personalList: ['交通', '餐饮', '娱乐', '医疗', '社交', '运动', '其他'],
    // dailyList: ['水费', '电费', '国税', '地税', '电话费', '办公用品', '其他'],
    // operationList: ['员工工资', '房租', '管理费用', '物流', '进货成本', '员工借支', '奖金', '其他'],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    categoryIndex: 0,
    category: '个人支出',
    categoryArray: ['个人支出', '日常费用', '运营成本'],
    pickerDate: '2019-12',
    date: '2019-12',
    //请求金额
    total: '0.00',
    //请求数据类型
    tabularData: [],
    //饼图数据类型
    series: [{
      name: '交通',
      data: 15,
    }],
    //条形图数据类型
    main: {
      data: [],
      categories: []
    }
  },
  //category改变
  pickerChange(e) {
    this.setData({
      categoryIndex: e.detail.value,
      category: this.data.categoryArray[e.detail.value]
    })
    this.requestGetData(e);
  },
  //日期改变
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
    this.requestGetData(e);
  },
  //将json数据转换为条形图的数据结构
  jsonToArray: function () {
    for (var i = 0; i < this.data.tabularData.length; i++) {
      var x = 'main.data[' + i + ']'
      var y = 'main.categories[' + i + ']'
      this.setData({
        [x]: this.data.tabularData[i].money,
        [y]: this.data.tabularData[i].typename
      })
    }
  },
  //将json数据转为符合饼图的数据结构
  jsonToPie() {
    for (var i = 0; i < this.data.tabularData.length; i++) {
      var x = 'series[' + i + '].name'
      var y = 'series[' + i + '].data'
      this.setData({
        [x]: this.data.tabularData[i].typename,
        [y]: this.data.tabularData[i].money
      })
    }
  },
  //绘制饼图
  getPieChart(e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: this.data.series,
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  },
  //绘制条形图
  getColumnChart: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: this.data.main.categories,
      series: [{
        name: '类别',
        data: this.data.main.data,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        title: '金额/元',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  },
  //请求数据函数
  requestGetData(e) {
    //向服务器请求数据
    wx.pro.request({
      url: app.globalData.host + '/client/record/statistics/' + this.data.category + "/" + this.data.date + "/" + this.data.date,
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET'
    }).then(res => {
      console.log("一月统计", res)
      this.setData({
        total: res.data.data.total.toFixed(2),
        tabularData: res.data.data.dataList,
        series: [],
        main: {
          data: [],
          categories: []
        }
      })
      if (res.data.data.dataList.length == 0) {
        var i = this.data.categoryArray
        switch (this.data.category) {
          case i[0]:
            this.setData({
              tabularData: app.globalData.personalList
            });
            break;
          case i[1]:
            this.setData({
              tabularData: app.globalData.dailyList
            });
            break;
          case i[2]:
            this.setData({
              tabularData: app.globalData.operationList
            });
            break;
        }
      }
      this.jsonToArray()
      this.jsonToPie()
      this.getColumnChart(e)
      this.getPieChart(e)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    this.setData({
      //获得系统日期
      date: util.getYearAndMonth(new Date),
      pickerDate: util.getYearAndMonth(new Date),
      tabularData: app.globalData.personalList
    })
    this.requestGetData(e);
  },
})