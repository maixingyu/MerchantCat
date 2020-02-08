const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    id: 1,
    name: '个人支出',
    tel: '交通',
    address: '广东湛江'
  },
  //获得输入的name
  nameBindinput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //获得输入的tel
  telindinput(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //获得输入的address
  addressBindinput(e) {
    this.setData({
      address: e.detail.value
    })
  },
  //保存按钮点击事件
  saveBindtap() {
    if ((this.data.name == "") || (this.data.name == "") || (this.data.name == "")) {
      wx.showToast({
        title: '输入的格式不对',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else {
      //提交修改数据
      wx.pro.request({
        url: app.globalData.host + '/merchant/supplier/alter',
        data: {
          id: this.data.id,
          name: this.data.name,
          tel: this.data.tel,
          address: this.data.address,
        },
        header: {
          'authorization': wx.getStorageSync("authorization")
        },
        method: 'PUT',
      }).then(res => {
        console.log("修改供应商信息",res)
        if (res.data.code == 100) {
          wx.navigateBack({})
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  //删除记录
  deleteBindtap() {
    //提交删除记录id
    wx.pro.request({
      url: app.globalData.host + '/client/supplier/delete/' + this.data.id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'DELETE',
    }).then(res => {
      console.log("删除供应商信息", res)
      if (res.data.code == 100) {
        wx.navigateBack({})
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获得上个页面传过来的值
    this.setData({
      id: options.id,
      name: options.name,
      tel: options.tel,
      address: options.address
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
})