//app.js
import 'utils/wxPromise.min.js'
App({
  onLaunch: function() {
    // 登录
    wx.pro.login({}).then(res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        wx.pro.request({
          url: this.globalData.host + '/merchant/user/login',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
        }).then(res => {
          console.log("登录", res)
          wx.setStorageSync("authorization", res.data.data.authorization)
          this.globalData.statusCode = res.statusCode;
          //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.statusCodeCallback) {
            this.statusCodeCallback(res.statusCodeCallback);
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.MainHeight = e.windowHeight - this.globalData.CustomBar;
      }
    })
  },
  globalData: {
    userInfo: null,
    // host: 'http://172.16.155.237:8080',
    // imgHost:'http://172.16.155.237:8080/img/',
    // host: 'http://172.16.155.75:8080',
    // imgHost:'http://172.16.155.75:8080/img/',

    //host: 'http://192.168.0.104:8080',
    //imgHost: 'http://192.168.0.104:8080/img/',
    host: 'https://merchant.hellome.fun',
    imgHost: 'https://merchant.hellome.fun/',
    personalList: [{
        typename: '交通',
        money: 0.00,
      }, {
        typename: '餐饮',
        money: 0.00,
      }, {
        typename: '娱乐',
        money: 0.00,
      }, {
        typename: '医疗',
        money: 0.00,
      }, {
        typename: '社交',
        money: 0.00,
      }, {
        typename: '运动',
        money: 0.00,
      },
      {
        typename: '其他',
        money: 0.00,
      }
    ],

    dailyList: [{
      typename: '水费',
      money: 0.00,
    }, {
      typename: '电费',
      money: 0.00,
    }, {
      typename: '国税',
      money: 0.00,
    }, {
      typename: '地税',
      money: 0.00,
    }, {
      typename: '电话费',
      money: 0.00,
    }, {
      typename: '办公用品',
      money: 0.00,
    }, {
      typename: '其他',
      money: 0.00,
    }],

    operationList: [{
      typename: '员工工资',
      money: 0.00,
    }, {
      typename: '房租',
      money: 0.00,
    }, {
      typename: '管理费用',
      money: 0.00,
    }, {
      typename: '物流',
      money: 0.00,
    }, {
      typename: '进货成本',
      money: 0.00,
    }, {
      typename: '员工借支',
      money: 0.00,
    }, {
      typename: '奖金',
      money: 0.00,
    }, {
      typename: '其他',
      money: 0.00,
    }]
  }
})