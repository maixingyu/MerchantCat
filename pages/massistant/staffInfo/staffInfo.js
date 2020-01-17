// pages/massistant/staffInfo/staffInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MainHeight: app.globalData.MainHeight,
    CustomBar: app.globalData.CustomBar,
    imgHost: app.globalData.imgHost,
    nameValue: '姓名',
    sexValue: '性别',
    telValue: '电话',
    idCardValue: '身份证',
    addressValue: '地址',
    remarksValue: '备注',

    avatarChange: false,
    id: '',
    avatar: 'default.png',
    name: '',
    sex: '',
    tel: '',
    idCard: '',
    address: '',
    remarks: '',

    modalTitle: '',
    modalValue: '',
    inputType: '',


  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          avatar: res.tempFilePaths[0],
          avatarChange: true
        })
        this.avatarChange()
      }
    });

  },
  avatarChange: function() {
    wx.pro.showToast({
      title: '修改中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.uploadFile({
      url: app.globalData.host + "/client/staff/alterAvatar",
      header: {
        'content-type': 'multipart/form-data',
        'authorization': wx.getStorageSync("authorization")
      },
      filePath: this.data.avatar,
      name: 'file',
      formData: {
        id: this.data.id
      }
    }).then(res => {
      console.log("修改头像", res)
      wx.pro.hideToast()
      var jsonData = JSON.parse(res.data)
      if (jsonData.code == 100) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          mask: true,
        })
      } else {
        wx.showToast({
          title: jsonData.msg,
          icon: 'none',
          mask: true,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  showModal(e) {
    var flag = e.currentTarget.dataset.flag
    switch (flag) {
      case 'name':
        this.setData({
          modalTitle: this.data.nameValue,
          modalValue: this.data.name,
          inputType: 'name'
        })
        break;
      case 'tel':
        this.setData({
          modalTitle: this.data.telValue,
          modalValue: this.data.tel,
          inputType: 'tel'
        })
        break;
      case 'idCard':
        this.setData({
          modalTitle: this.data.idCardValue,
          modalValue: this.data.idCard,
          inputType: 'idCard'
        })
        break;
      case 'address':
        this.setData({
          modalTitle: this.data.addressValue,
          modalValue: this.data.address,
          inputType: 'address'
        })
        break;
      case 'remarks':
        this.setData({
          modalTitle: this.data.remarksValue,
          modalValue: this.data.remarks,
          inputType: 'remarks'
        })
        break;
      default:
        break;
    }
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  bindInput: function(e) {
    this.setData({
      modalValue: e.detail.value
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    var flag = e.currentTarget.dataset.flag
    if (flag != undefined) {
      this.setData({
        [flag]: this.data.modalValue
      });
      this.alterInfo(flag)
    }
  },
  alterInfo: function(flag) {
    var paramValue = ''
    switch (flag) {
      case 'name':
        paramValue = this.data.name;
        break;
      case 'tel':
        paramValue = this.data.tel;
        break;
      case 'idCard':
        paramValue = this.data.idCard;
        break;
      case 'address':
        paramValue = this.data.address;
        break;
      case 'remarks':
        paramValue = this.data.remarks;
        break;
      default:
        break;
    }
    console.log("key:", flag)
    console.log("fasong:", paramValue)
    wx.pro.request({
      url: app.globalData.host + '/client/staff/alterOther/' + this.data.id + "/" + flag + "/" + paramValue,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'PUT',
    }).then(res => {
      console.log("修改"+flag,res)
      if (res.data.code == 100) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          mask: true,
        })
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
  sexShowModal: function(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  sexHideModal: function(e) {
    this.setData({
      modalName: null
    })
  },
  sexChange: function(e) {
    this.setData({
      sex: e.detail.value
    })
    this.alterSex()
  },
  alterSex: function() {
    wx.pro.request({
      url: app.globalData.host + '/client/staff/alterOther/' + this.data.id + "/sex/" + this.data.sex,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'PUT',
    }).then(res => {
      console.log("修改性别", res)
      if (res.data.code == 100) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          mask: true,
        })
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
  deleteStaff: function() {
    wx.pro.request({
      url: app.globalData.host + '/client/staff/delete/' + this.data.id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'DELETE',
    }).then(res => {
      console.log("删除员工",res)
      if (res.data.code == 100) {
        wx.navigateBack()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: 'true'
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
      avatar: options.avatar,
      name: options.name,
      sex: options.sex,
      tel: options.tel,
      idCard: options.idCard,
      address: options.address,
      remarks: options.remarks
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