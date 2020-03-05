const app = getApp()
const util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: '',
    quantity: 1,
    date: '2019-12-31',
  },
  //界面发生切换初始化公有的值
  initData() {
    this.setData({
      date: util.getDate(new Date),
    })
  },
  //日期改变
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //获得数量
  quantityBindinput(e) {
    this.setData({
      quantity: e.detail.value
    })
  },
  //保存按钮点击事件
  saveBindtap() {
    if (this.data.quantity == 0) {
      wx.showToast({
        title: '数量不能小于1',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else {
      //获得添加记录数据
      this.addGoodsReduce()
    }
  },
  //获得添加记录数据
  addGoodsReduce() {
    wx.pro.request({
      url: app.globalData.host + '/merchant/goods/reduce',
      data: {
        quantity: this.data.quantity,
        date: this.data.date,
        flag: 0,
        gId: this.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'POST',
    }).then(res => {
      console.log("添加货物减少记录", res)
      if (res.data.code == 100) {
        wx.navigateBack({})
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      name: options.name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.initData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})