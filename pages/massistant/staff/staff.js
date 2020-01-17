const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MainHeight: app.globalData.MainHeight,
    imgHost: app.globalData.imgHost,
    staffList: [{
      id: '1',
      avatar: 'default.png',
      name: '乐芙兰',
      sex: '男',
      tel: '13123995836',
      idCard: '440882188923577129',
      address: '广东广州',
      remarks: '无案底'
    }],
  },
  infoInit: function() {
    wx.pro.showToast({
      title: '加载中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + '/client/staff/index',
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      wx.pro.hideToast()
      console.log("获得员工列表", res)
      if (res.data.code) {
        this.setData({
          staffList: res.data.data.staffList
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

    })
  },
  toInfo: function(e) {
    var id = e.currentTarget.dataset.id
    var avatar = e.currentTarget.dataset.avatar
    var name = e.currentTarget.dataset.name
    var sex = e.currentTarget.dataset.sex
    var tel = e.currentTarget.dataset.tel
    var idCard = e.currentTarget.dataset.idcard
    var address = e.currentTarget.dataset.address
    var remarks = e.currentTarget.dataset.remarks
    wx.navigateTo({
      url: '../staffInfo/staffInfo?id=' + id + "&avatar=" + avatar + "&name=" + name + "&sex=" + sex + "&tel=" + tel + "&idCard=" + idCard + "&address=" + address + "&remarks=" + remarks
    })
  },
  toAddStaff: function() {
    wx.navigateTo({
      url: '../addStaff/addStaff',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.infoInit()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})