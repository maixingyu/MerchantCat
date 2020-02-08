const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [{
        id: 1,
        name: "花生油",
        quantity: 22,
        unit: 'kg'
      },
      {
        id: 2,
        name: "鸡腿",
        quantity: 30,
        unit: '个'
      }
    ]
  },
  toGoodsInfo: function(e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../goodsInfo/goodsInfo?id=' + id + "&name=" + name,
    })
  },
  toAddGoods: function () {
    wx.navigateTo({
      url: '../addGoods/addGoods',
    })
  },
  /**
   * 初始化界面数据
   */
  goodsIndex(){
    wx.pro.showToast({
      title: '加载中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + '/merchant/goods/index',
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      wx.pro.hideToast()
      console.log("获得货物列表", res)
      if (res.data.code) {
        this.setData({
          goodsList: res.data.data.goodsList
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
    this.goodsIndex()
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