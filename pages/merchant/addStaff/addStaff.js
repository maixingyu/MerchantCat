const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    MainHeight: app.globalData.MainHeight,
    imgList: [],
    name: '',
    sex: '男',
    tel: '',
    idCard: '',
    address: '',
    remarks: ''
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },
  sexChange: function(e) {
    if (e.detail.value == "男") {
      this.setData({
        sex: '男'
      })
    } else {
      this.setData({
        sex: '女'
      })
    }
  },
  infoInput: function(e) {
    var flag = e.currentTarget.dataset.flag
    switch (flag) {
      case "name":
        this.setData({
          name: e.detail.value
        })
        break;
      case "tel":
        this.setData({
          tel: e.detail.value
        })
        break;
      case "idCard":
        this.setData({
          idCard: e.detail.value
        })
        break;
      case "address":
        this.setData({
          address: e.detail.value
        })
        break;
      case "remarks":
        this.setData({
          remarks: e.detail.value
        })
        break;
    }
  },

  infoSubmit: function() {
    var length = this.data.imgList.length
    var name = this.data.name
    var sex = this.data.sex
    var tel = this.data.tel
    var idCard = this.data.idCard
    var address = this.data.address
    var remarks = this.data.remarks
    if ((length != 0) && (name != '') && (tel != '') && (idCard != '') && (address != '')) {
      this.infoUpload()
    } else {
      wx.showToast({
        title: '请按照格式填写内容',
        icon: 'none',
        mask: 'true'
      })
    }
  },
  //上传照片
  infoUpload: function() {
    wx.pro.showToast({
      title: '提交中',
      icon: 'loading',
      mask: 'true'
    })
    wx.pro.uploadFile({
      url: app.globalData.host + "/merchant/staff/add",
      header: {
        'content-type': 'multipart/form-data',
        'authorization': wx.getStorageSync("authorization")
      },
      filePath: this.data.imgList[0],
      name: 'file',
      formData: {
        name: this.data.name,
        sex: this.data.sex,
        tel: this.data.tel,
        idCard: this.data.idCard,
        address: this.data.address,
        remarks: this.data.remarks
      }
    }).then(res => {
      console.log("添加员工信息",res)
      wx.pro.hideToast()
      var jsonData = JSON.parse(res.data)
      if (jsonData.code == 100) {
       wx.navigateBack()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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