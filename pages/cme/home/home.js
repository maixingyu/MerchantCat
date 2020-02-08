const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
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
      name: '店铺',
      color: 'blue'
    }, {
      icon: 'favorfill',
      id: 1,
      name: '订单',
      color: 'orange'
    }, {
      icon: 'timefill',
      id: 2,
      name: '商户端',
      color: 'olive'
    }],
    urlArray: [
      '/pages/cme/shop/index/index', '/pages/cme/order/index/index', '/pages/merchant/merchant'
    ]
  },
  attached() {
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
  methods: {
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
    toUrl: function(e) {
      this.setData({
        indexId: e.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: this.data.urlArray[this.data.indexId]
      })
    }
  }
})