const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    bindFlag: true,
    indexId: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lifeList: [{
      icon: 'writefill',
      id: 0,
      name: '记账',
      color: 'blue'
    }, {
      icon: 'rankfill',
      id: 1,
      name: '统计',
      color: 'orange'
    }, {
      icon: 'group_fill',
      id: 2,
      name: '员工',
      color: 'yellow'
    }, {
      icon: 'deliver_fill',
      id: 3,
      name: '供应商',
      color: 'olive'
    }, {
      icon: 'goodsfill',
      id: 4,
      name: '货物',
      color: 'green'
    }, {
      icon: 'choicenessfill',
      id: 5,
      name: '会员',
      color: 'cyan'
    }, {
      icon: 'formfill',
      id: 6,
      name: '订单',
      color: 'red'
    }, {
      icon: 'redpacket_fill',
      id: 7,
      name: '优惠',
      color: 'purple'
    }, {
      icon: 'play_forward_fill',
      id: 8,
      name: '客户端',
      color: 'mauve'
    }],
    urlArray: [
      '/pages/merchant/record/record', '/pages/merchant/statistics/statistics', '/pages/merchant/staff/staff', '/pages/merchant/supplier/supplier', '/pages/merchant/goods/goods', '/pages/merchant/vip/index/index', '/pages/merchant/order/index/index', '/pages/merchant/discount/index/index', '/pages/customer/home/home'
    ]
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //查询该商户是否绑定用户名密码
  isBind: function() {
    wx.pro.showLoading({
      title: '加载中',
      mask: true
    })
    wx.pro.request({
      url: app.globalData.host + '/merchant/user/isBind',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync('authorization')
      },
      method: 'POST',
    }).then(res => {
      wx.pro.hideLoading()
      console.log("是否已经绑定", res)
      if (res.data.code == 100) {
        this.setData({
          bindFlag: res.data.data.bindFlag
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true,
        })
      }
      if (this.data.bindFlag) {
        wx.navigateTo({
          url: this.data.urlArray[this.data.indexId]
        })
      } else {
        wx.navigateTo({
          url: '/pages/massistant/bind/bind'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  toUrl: function(e) {
    this.setData({
      indexId: e.currentTarget.dataset.id
    })
    if (this.data.indexId == (this.data.lifeList.length - 1)) {
      wx.navigateTo({
        url: this.data.urlArray[this.data.indexId]
      })
    } else {
      //调用是否绑定的方法
      this.isBind()
    }
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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