const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tab: ['消耗记录', '进库记录'],
    id: 0,
    name: '',
    goods: [],
  },
  //导航栏切换
  tabSelect: function(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
  toGoodsReduce: function() {
    wx.navigateTo({
      url: '../goodsReduce/goodsReduce?id=' + this.data.id + "&name=" + this.data.name,
    })
  },
  toGoodsIncrease: function() {
    wx.navigateTo({
      url: '../goodsIncrease/goodsIncrease?id=' + this.data.id + "&name=" + this.data.name,
    })
  },
  /**
   * 初始化界面数据
   */
  goodsOperateIndex() {
    wx.pro.showToast({
      title: '加载中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + '/merchant/goods/operate/' + this.data.id,
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      wx.pro.hideToast()
      console.log("获得货物增删列表", res)
      if (res.data.code) {
        this.setData({
          goods: res.data.data.goods
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
    this.setData({
      id: options.id,
      name: options.name
    })
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
    this.goodsOperateIndex()
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