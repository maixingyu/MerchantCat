const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    statistics: [{
        url: '../oneDay/oneDay',
        icon: 'cuIcon-rankfill',
        name: '一日统计',
        desc: '查看每天报告'
      },
      {
        url: '../oneMonth/oneMonth',
        icon: 'cuIcon-taoxiaopu',
        name: '一月统计',
        desc: '查看一月报告'
      },
      {
        url: '../oneYear/oneYear',
        icon: 'cuIcon-formfill',
        name: '一年统计',
        desc: '查看一年报告'
      }
    ]
  },
  bindtap(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
})