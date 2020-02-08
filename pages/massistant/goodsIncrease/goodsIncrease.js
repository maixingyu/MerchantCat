const app = getApp()
const util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: '',
    quantity: 1,
    date: '2019-12-31',
    supplierName: '',
    supplierIndex: null,
    supplierNameList: [],
    modalName: null
  },
  //隐藏模态框
  hideModal(e) {
    wx.navigateBack({})
  },
  //前往添加供应商
  toAddSupplier: function() {
    wx.navigateTo({
      url: '../addSupplier/addSupplier',
    })
    this.setData({
      modalName: null
    })
  },
  //界面发生切换初始化公有的值
  initData() {
    this.setData({
      date: util.getDate(new Date),
    })
  },
  //获得数量
  quantityBindinput(e) {
    this.setData({
      quantity: e.detail.value
    })
  },
  //日期改变
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //供应商改变
  SupplierNameChange(e) {
    this.setData({
      supplierIndex: e.detail.value,
      supplierName: this.data.supplierNameList[e.detail.value]
    })
  },
  /**
   * 获得供应商的数组
   */
  getSupplierName: function() {
    wx.pro.showToast({
      title: '加载中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + '/merchant/supplier/getName',
      header: {
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'GET',
    }).then(res => {
      wx.pro.hideToast()
      console.log("获得供应商名字", res)
      if (res.data.code) {
        var supplierNameList = res.data.data.supplierNameList
        if (supplierNameList.length != 0) {
          this.setData({
            supplierIndex: 0,
            supplierNameList: supplierNameList,
            supplierName: supplierNameList[0]
          })
        } else {
          this.setData({
            modalName: 'NoSupplierModal'
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
  //保存按钮点击事件
  saveBindtap() {
    if (this.data.quantity == 0) {
      wx.showToast({
        title: '数量不能小于1',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else {
      //获得添加记录数据
      this.addGoodsReduce()
    }
  },
  //获得添加记录数据
  addGoodsReduce() {
    wx.pro.request({
      url: app.globalData.host + '/merchant/goods/increase',
      data: {
        quantity: this.data.quantity,
        date: this.data.date,
        flag: 1,
        supplierName: this.data.supplierName,
        gId: this.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'POST',
    }).then(res => {
      console.log("添加货物入库记录", res)
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
    this.setData({
      id: options.id,
      name: options.name
    })
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
    this.initData()
    this.getSupplierName()
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