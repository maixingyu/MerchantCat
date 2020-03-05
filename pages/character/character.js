Page({

  /**
   * 页面的初始数据
   */
  data: {
    characteFlag:true
  },
  //点击切换用户
  chooseCharacter:function(e){
    if (e.currentTarget.dataset.flag=="true"){
      this.setData({
        characteFlag:true
      })
      wx.setStorageSync("character", "merchant")
    }else{
      this.setData({
        characteFlag: false
      })
      wx.setStorageSync("character", "customer")
    }
  },
  //进入角色的页面
  initCharacter:function(){
    if(this.data.characteFlag==true){
      wx.redirectTo({
        url: '/pages/merchant/home/home'
      })
    }else{
      wx.redirectTo({
        url: '/pages/customer/home/home'
      })
    }
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