const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    MainHeight: app.globalData.MainHeight,
    money: 0
  },
  /**
   * 获得输入金额
   */
  moneyInput: function(e) {
    this.setData({
      money: e.detail.value
    })
  },
  disCountSubmit: function() {
    var money = this.data.money
    if ((money != '') && (money > 0)) {
      this.disCountUpload()
    } else {
      wx.showToast({
        title: '请按照格式填写内容',
        icon: 'none',
        mask: 'true'
      })
    }
  },
  //信息上传
  disCountUpload: function() {
    wx.pro.showToast({
      title: '提交中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + "/merchant/discount/add",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'POST',
      data: {
        money: this.data.money,
      }
    }).then(res => {
      console.log("发放优惠券", res)
      wx.pro.hideToast()
      if (res.data.code == 100) {
        wx.navigateBack()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true,
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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