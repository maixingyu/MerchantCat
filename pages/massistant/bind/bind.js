// pages/bindname/bindname.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    MainHeight: app.globalData.MainHeight,
    usernameInputFlag: false,
    passwordInputFlag: false,
    submitButFlag: true
  },
  /**
   * 改变提交按钮状态
   */
  changeFlag: function () {
    if (this.data.usernameInputFlag == true && this.data.passwordInputFlag == true) {
      this.setData({
        submitButFlag: false
      })
    } else {
      this.setData({
        submitButFlag: true
      })
    }
  },
  /**
   * 用户名输入框
   */
  usernameInput: function (e) {
    if (e.detail.value != "") {
      this.setData({
        usernameInputFlag: true
      })
      this.changeFlag()
    } else {
      this.setData({
        usernameInputFlag: false
      })
      this.changeFlag()
    }
  },
  /**
   * 密码输入框
   */
  passwordInput: function (e) {
    if (e.detail.value != "") {
      this.setData({
        passwordInputFlag: true
      })
      this.changeFlag()
    } else {
      this.setData({
        passwordInputFlag: false
      })
      this.changeFlag()
    }
  },
  /**
   * 取消按钮
   */
  formReset: function (e) {
    console.log("取消所有输入")
    this.setData({
      usernameInputFlag: false,
      passwordInputFlag: false,
      submitButFlag: true
    })
  },
  /**
   * 提交按钮
   */
  formSubmit: function (e) {
    console.log(e.detail.value.username)
    console.log(e.detail.value.password)
    wx.pro.showLoading({
      title:'绑定中',
      mask:true
    })
    wx.pro.request({
      url: app.globalData.host + "/merchant/user/bind",
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync('authorization')
      },
      method: "POST"
    }).then(res => {
      wx.pro.hideLoading()
      console.log(res)
      if (res.data.code == 100) {
        wx.redirectTo({
          url: '../record/record',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:1500,
          mask:true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindName: function (e) {
    //商户授权成功
    wx.redirectTo({
      url: '/pages/store/store',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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