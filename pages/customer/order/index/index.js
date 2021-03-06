const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantOrderList: []
  },
  merchantVipIndex() {
    wx.pro.showToast({
      title: '加载中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + '/customer/order/index',
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      wx.pro.hideToast()
      console.log("获得商户端订单列表", res)
      if (res.data.code) {
        this.setData({
          merchantOrderList: res.data.data.merchantOrderList
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: 'true',
          duration: '1000'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.merchantVipIndex()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})