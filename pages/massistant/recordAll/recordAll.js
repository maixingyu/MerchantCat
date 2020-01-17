const app = getApp()
Page({
  data: {
    // tab: ['个人支出', '日常费用', '运营成本'],
    // //Personal  daily  operation
    // personalList: ['交通', '餐饮', '娱乐', '医疗', '社交', '运动', '其他'],
    // dailyList: ['水费', '电费', '国税', '地税', '电话费', '办公用品', '其他'],
    // operationList: ['员工工资', '房租', '管理费用', '物流', '进货成本', '员工借支', '奖金', '其他'],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    //id: 1,category: '支出',typename: '餐饮',money: 23.33,date: '2019-03-30',time: '12:30',remarks: '111111111111'
    recordList: [
      // {
      //   id: 1,
      //   category: '个人支出',
      //   typename: '交通',
      //   money: 1234,
      //   date: '2019-12-12',
      //   time: '12:30',
      //   remarks: '测试',
      // },
      // {
      //   id: 2,
      //   category: '日常费用',
      //   typename: '电费',
      //   money: 1234,
      //   date: '2019-12-12',
      //   time: '12:30',
      //   remarks: '',
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获得所有交易数据
    wx.pro.request({
      url: app.globalData.host + '/client/record/all',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      console.log("所有记账记录",res)
      if (res.data.code == 100) {
        var recordList = res.data.data.recordList
        for (var i = 0; i < recordList.length; i++) {
          recordList[i].money = recordList[i].money.toFixed(2)
          if (recordList[i].remarks == null) {
            recordList[i].remarks = ""
          }
        }
        this.setData({
          recordList: recordList
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
})