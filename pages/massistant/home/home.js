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
      name: '记账',
      color: 'blue'
    }, {
      icon: 'favorfill',
      id: 1,
      name: '统计',
      color: 'orange'
    }, {
      icon: 'locationfill',
      id: 2,
      name: '员工',
      color: 'yellow'
    }, {
      icon: 'timefill',
      id: 3,
      name: '供应商',
      color: 'olive'
    }, {
      icon: 'warnfill',
      id: 4,
      name: '货物',
      color: 'green'
    }, {
      icon: 'camerafill',
      id: 5,
      name: '会员',
      color: 'cyan'
    }, {
      icon: 'commentfill',
      id: 6,
      name: '订单',
      color: 'red'
    }, {
      icon: 'likefill',
      id: 7,
      name: '优惠',
      color: 'purple'
    }, {
      icon: 'samefill',
      id: 8,
      name: '客户端',
      color: 'mauve'
    }],
    urlArray: [
      '/pages/massistant/record/record', '/pages/massistant/statistics/statistics', '/pages/massistant/staff/staff', '/pages/massistant/supplier/supplier', '/pages/massistant/goods/goods', '/pages/massistant/vip/index/index',
      '/pages/massistant/order/index/index', '/pages/massistant/order/index/index', '/pages/customer/customer'
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
    }
  }
})