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
    todayList: [
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
    ],
    totalList: [{
        interval: '昨日',
        time: '7月22日',
        pay: 0.00,
      },
      {
        interval: '本周',
        time: '7月22日-7月28日',
        pay: 0.00,
      },
      {
        interval: '本月',
        time: '7月1日-7月23日',
        pay: 0.00,
      },
      {
        interval: '本年',
        time: '1月1日-12月31日',
        pay: 0.00,
      }
    ]
  },
  //判断手势事件
  handletouchmove: function(event) {
    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;
    let tx = currentX - this.data.lastX;
    let ty = currentY - this.data.lastY;
    //上下滑动判断
    if (Math.abs(tx) < Math.abs(ty)) {
      if (ty > 0) {
        this.setData({
          flag: false
        });
      } else if (ty < 0) {
        this.setData({
          flag: true
        });
      }
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX;
    this.data.lastY = currentY;
  },
  handletouchstart: function(event) {
    this.data.lastX = event.touches[0].pageX;
    this.data.lastY = event.touches[0].pageY;
  },
  handletouchend: function(event) {

  },
  //跳转到添加记录页面
  addRecord: function() {
    wx.navigateTo({
      url: '../addRecord/addRecord',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getRecord() {
    //获得收入支出数据
    wx.pro.request({
      url: app.globalData.host + '/client/record/index',
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      console.log("初始化记账信息",res)
      if (res.data.code == 100) {
        //格式化今日记录
        var todayList = res.data.data.todayList
        for (var i = 0; i < todayList.length; i++) {
          todayList[i].money = todayList[i].money.toFixed(2)
          if (todayList[i].remarks == null) {
            todayList[i].remarks = ""
          }
        }
        this.setData({
          todayList: todayList,
        })
        //格式化支出统计
        var totalList = res.data.data.totalList
        if (totalList.yesterday.pay==null){
          totalList.yesterday.pay="0.00"
        }
        if (totalList.week.pay == null) {
          totalList.week.pay = "0.00"
        }
        if (totalList.month.pay == null) {
          totalList.month.pay = "0.00"
        }
        if (totalList.year.pay == null) {
          totalList.year.pay = "0.00"
        }
        this.setData({
          totalList: totalList
        })
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //页面得到焦点，再次初始化flag值，为用户提供良好的界面交互
    this.getRecord()
    this.setData({
      flag: false
    });
  },
})