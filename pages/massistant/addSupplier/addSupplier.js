const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    MainHeight: app.globalData.MainHeight,
    name: '',
    tel: '',
    address: '',
  },
  infoInput: function(e) {
    var flag = e.currentTarget.dataset.flag
    switch (flag) {
      case "name":
        this.setData({
          name: e.detail.value
        })
        break;
      case "tel":
        this.setData({
          tel: e.detail.value
        })
        break;
      case "address":
        this.setData({
          address: e.detail.value
        })
        break;
      default:
        break;
    }
  },

  infoSubmit: function() {
    var name = this.data.name
    var tel = this.data.tel
    var address = this.data.address
    if ((name != '') && (tel != '') && (address != '')) {
      this.infoUpload()
    } else {
      wx.showToast({
        title: '请按照格式填写内容',
        icon: 'none',
        mask: 'true'
      })
    }
  },
  //信息上传
  infoUpload: function() {
    wx.pro.showToast({
      title: '提交中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + "/client/supplier/add",
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method:'POST',
      data: {
        name: this.data.name,
        tel: this.data.tel,
        address: this.data.address,
      }
    }).then(res => {
      console.log("添加供应商信息", res)
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