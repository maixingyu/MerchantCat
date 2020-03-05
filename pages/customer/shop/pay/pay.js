const utils = require('../../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    MainHeight: app.globalData.MainHeight,
    index: null,
    discountList: [],
    discountIdList: [],
    mId: 0,
    username: '',
    orderParams: {}, // 支付发起参数
    orderResults: {}, // 支付结果
    preparePay: false, // 用户点击了支付按钮（订单信息交由 payjs 组件）
    paying: false, // 标记用户是否已经点击了「支付」并成功跳转到 PAYJS 小程序，该参数由 payjs 组件维护，用户可监听以在 onShow 生命周期函数中判断
    money: 0
  },
  /**
   * 选择优惠券
   */
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 查找客户再此商店的优惠券
   */
  findDiscount: function() {
    wx.pro.request({
      url: app.globalData.host + "/customer/shop/findDiscount/" + this.data.mId,
      header: {
        'authorization': wx.getStorageSync("authorization"),
      },
      method: 'GET',
    }).then(res => {
      console.log("查询优惠券", res)
      if (res.data.code == 100) {
        if (res.data.data.discountList.length!=0){
          var discountList = []
          var discountIdList = []
          for (var i = 0; i < res.data.data.discountList.length; i++) {
            discountIdList.push(res.data.data.discountList[i].id)
            discountList.push(res.data.data.discountList[i].money)
          }
          this.setData({
            discountIdList: discountIdList,
            discountList: discountList
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 伤处已使用过的优惠券
   */
  deleteDiscount: function() {
    var index = this.data.index
    if (index != null) {
      wx.pro.request({
        url: app.globalData.host + "/customer/shop/deleteDiscount/" + this.data.discountIdList[index],
        header: {
          'authorization': wx.getStorageSync("authorization"),
        },
        method: 'DELETE',
      }).then(res => {
        console.log("使用优惠券", res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  /**
   * 输入金额
   */
  infoInput: function(e) {
    this.setData({
      money: e.detail.value
    })
  },

/**
 * 确认支付
 */
  infoSubmit: function() {
    var money = this.data.money
    if ((money == '') && (money == 0)) {
      wx.showToast({
        title: '输入的金额必须大于0',
        icon: 'none',
        mask: 'true'
      })
    } else {
      this.onTapPay()
    }
  },
  /**
   * 客户端支付网络请求
   */
  customerPay: function() {
    wx.pro.showToast({
      title: '提交中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.request({
      url: app.globalData.host + "/customer/shop/addOrder",
      header: {
        'authorization': wx.getStorageSync("authorization"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        orderNumber: this.data.orderResults.responseData.out_trade_no,
        money: this.data.money,
        mId: this.data.mId
      }
    }).then(res => {
      console.log("支付", res)
      wx.pro.hideToast()
      if (res.data.code == 100) {
        //删除使用过的优惠券
        this.deleteDiscount()
        wx.navigateBack()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  onTapPay: function() {
    // 事件处理函数 - 点击支付按钮
    this.setData({
      preparePay: true
    })
  },
  onLoad: function(options) {
    this.setData({
      mId: options.mId,
      username: options.username
    })
    //
    this.findDiscount()
  },
  onShow: function() {
    // 若处于支付中状态则交由 payjs 支付组件处理
    if (this.data.paying) return;
    // 尚未支付
    // 获取、设置支付参数
    let orderParams = utils.getOrderParams()
    this.setData({
      orderParams
    })
  },

  /**
   * 支付成功的事件处理函数
   * 
   * res.detail 为 payjs 小程序返回的订单信息
   * 
   * 可通过 res.detail.payjsOrderId 拿到 payjs 订单号
   * 可通过 res.detail.responseData 拿到详细支付信息
   */
  bindPaySuccess(res) {
    console.log('success', res)
    console.log('[支付成功] PAYJS 订单号：', res.detail.payjsOrderId)
    this.setData({
      orderResults: res.detail
    })
    this.customerPay()
  },
  /**
   * 支付失败的事件处理函数
   * 
   * res.detail.error 为 true 代表传入小组件的参数存在问题
   * res.detail.navigateSuccess 代表了是否成功跳转到 PAYJS 小程序
   * res.detail.info 可能存有失败的原因
   * 
   * 如果下单成功但是用户取消支付则可在 res.detail.info.payjsOrderId 拿到 payjs 订单号
   */
  bindPayFail(res) {
    console.log('fail', res)
    if (res.detail.error) {
      console.error('发起支付失败', res.detail.info)
    } else if (res.detail.navigateSuccess) {
      console.log('[取消支付] PAYJS 订单号：', res.detail.info.payjsOrderId)
    }
  },
  /**
   * 支付完毕的事件处理函数
   * 
   * 无论支付成功或失败均会执行
   * 应当在此销毁 payjs 组件
   */
  bindPayComplete() {
    console.log('complete')
    this.setData({
      preparePay: false, // 销毁 PAYJS 组件
    })
  },
  /**
   * 组件内部数据被修改时的事件
   * 
   * 当前仅用于监听 paying 数据
   * 当用户跳转到 PAYJS 小程序并等待返回的过程中 paying 值为 true
   */
  bindDataChange(res) {
    if (res.detail.paying) {
      this.setData({
        paying: res.detail.paying
      })
    }
  },
})