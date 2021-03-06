const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mId: 0,
    username: '',
    vipFlag: false,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://merchant.hellome.fun/logo-black.png'
    }, {
      id: 1,
      type: 'image',
      url: 'https://merchant.hellome.fun/logo-blue.png',
    }, {
      id: 2,
      type: 'image',
      url: 'https://merchant.hellome.fun/logo-orange.png'
    }, {
      id: 3,
      type: 'image',
      url: 'https://merchant.hellome.fun/logo-pink.png'
    }, {
      id: 4,
      type: 'image',
      url: 'https://merchant.hellome.fun/logo-purple.png'
    }],
    iconList: [{
      id: 0,
      icon: 'choicenessfill',
      color: 'red',
      name: '成为会员'
    }, {
      id: 1,
      icon: 'sponsorfill',
      color: 'orange',
      name: '自助付款'
    }],
  },
  /**
   * 选择付款模式
   */
  selectPayType: function(e) {
    this.setData({
      id: e.currentTarget.dataset.id
    })
    if (this.data.id == 0) {
      //如果不是会员
      if (this.data.vipFlag == false) {
        wx.navigateTo({
          url: './../vip/vip?mId=' + this.data.mId + '&username=' + this.data.username,
        })
      } else {
        wx.showToast({
          title: '您已是本店会员',
          icon: 'none',
          mask: true,
        })
      }
    } else {
      wx.navigateTo({
        url: './../pay/pay?mId=' + this.data.mId + '&username=' + this.data.username,
      })
    }
  },
  /**
   * 查询时候是Vip
   */
  isVip: function() {
    wx.pro.showToast({
      title: '加载中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + '/customer/shop/isVip/' + this.data.mId,
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      wx.pro.hideToast()
      console.log("查询用户是该店铺的vip", res)
      if (res.data.code) {
        this.setData({
          vipFlag: res.data.data.vipFlag
        })
        if (this.data.vipFlag == true) {
          this.setData({
            'iconList[0].name': '至尊会员'
          })
        }
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
  onLoad: function(options) {
    this.setData({
      mId: options.mId,
      username: options.username
    })
  },
  onShow: function() {
    //查询当前用户是否是该店铺的会员
    this.isVip()
  },
})