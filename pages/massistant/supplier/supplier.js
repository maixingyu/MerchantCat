const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MainHeight: app.globalData.MainHeight,
    supplierList: [{
      id: '1',
      name: '乐芙兰',
      tel: '13123995836',
      address: '广东广州',
    }],
  },
  infoInit: function() {
    wx.pro.showToast({
      title: '加载中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + '/merchant/supplier/index',
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      wx.pro.hideToast()
      console.log("获得供应商列表", res)
      if (res.data.code) {
        this.setData({
          supplierList: res.data.data.supplierList
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
      console.loh(err)
    })
  },
  toInfo: function(e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    var tel = e.currentTarget.dataset.tel
    var address = e.currentTarget.dataset.address
    wx.navigateTo({
      url: '../SupplierInfo/SupplierInfo?id=' + id + "&name=" + name + "&tel=" + tel + "&address=" + address
    })
  },
  toAddSupplier: function() {
    wx.navigateTo({
      url: '../addSupplier/addSupplier',
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
    this.infoInit()
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