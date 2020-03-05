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
    categoryIndex: 0,
    typenameIndex: 0,
    categoryArray: ['个人支出', '日常费用', '运营成本'],
    typenameArray: [],
    personalList: ['交通', '餐饮', '娱乐', '医疗', '社交', '运动', '其他'],
    dailyList: ['水费', '电费', '国税', '地税', '电话费', '办公用品', '其他'],
    operationList: ['员工工资', '房租', '管理费用', '物流', '进货成本', '员工借支', '奖金', '其他'],
    id: 1,
    category: '个人支出',
    typename: '交通',
    money: 53.33,
    date: '2019-03-27',
    time: '09:30',
    remarks: '111111啊实打实的1'
  },
  //是否显示模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    //定义取消模态框后的格式格式
    var moneyInput = this.data.money
    if (moneyInput == '') {
      this.setData({
        money: '0.00'
      })
    }
    //判断倒数第一位是否是小数点
    var getCharAt1 = moneyInput.charAt(moneyInput.length - 1)
    if (getCharAt1 == ".") {
      this.setData({
        money: moneyInput + "00"
      })
    }
    //判断倒数第二位是否是小数点
    var getCharAt2 = moneyInput.charAt(moneyInput.length - 2)
    if (getCharAt2 == ".") {
      this.setData({
        money: moneyInput + "0"
      })
    }
    //如果没有输入小数点,而且非空
    if (moneyInput.indexOf(".") == -1 && moneyInput != '') {
      this.setData({
        money: moneyInput + ".00"
      })
    }
  },
  //金额输入框，定义金额输入格式
  moneyBindinput(e) {
    e.detail.value = e.detail.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

    if (e.detail.value.indexOf(".") < 0 && e.detail.value != "") {
      e.detail.value = parseFloat(e.detail.value);
    } else if (e.detail.value.indexOf(".") == 0) {
      e.detail.value = e.detail.value.replace(/[^$#$]/g, "0.");
      e.detail.value = e.detail.value.replace(/\.{2,}/g, ".");
    }
    this.setData({
      money: e.detail.value.toString()
    })
  },
  //category改变
  categoryChange(e) {
    this.setData({
      categoryIndex: e.detail.value,
      category: this.data.categoryArray[e.detail.value]
    })
    this.categoryAndTypename()
  },
  //typename改变
  typenameChange(e) {
    this.setData({
      typenameIndex: e.detail.value,
      typename: this.data.typenameArray[e.detail.value]
    })
  },
  //类型于类别的联动
  categoryAndTypename() {
    if (this.data.category == this.data.categoryArray[0]) {
      this.setData({
        categoryIndex: 0,
        typenameArray: this.data.personalList,
        typenameIndex: 0,
        typename: this.data.personalList[0]
      })
    } else if (this.data.category == this.data.categoryArray[1]) {
      this.setData({
        categoryIndex: 1,
        typenameArray: this.data.dailyList,
        typenameIndex: 0,
        typename: this.data.dailyList[0]
      })
    } else {
      this.setData({
        categoryIndex: 2,
        typenameArray: this.data.operationList,
        typenameIndex: 0,
        typename: this.data.operationList[0]
      })
    }
  },
  //时间改变
  timeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  //日期改变
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //获得备注
  remarksBindinput(e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  //保存按钮点击事件
  saveBindtap() {
    if (this.data.money == "0.00") {
      wx.showToast({
        title: '输入的金额不能0.00哦',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else {
      //提交修改数据
      wx.pro.request({
        url: app.globalData.host + '/merchant/record/alter',
        data: {
          id: this.data.id,
          category: this.data.category,
          typename: this.data.typename,
          money: this.data.money,
          date: this.data.date,
          time: this.data.time,
          remarks: this.data.remarks
        },
        header: {
          'authorization': wx.getStorageSync("authorization")
        },
        method: 'PUT',
      }).then(res => {
        console.log("修改记账记录",res)
        if (res.data.code == 100) {
          wx.navigateBack({
            url: '../record/record'
          })
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
      url: app.globalData.host + '/merchant/record/delete/' + this.data.id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': wx.getStorageSync("authorization")
      },
      method: 'DELETE',
    }).then(res => {
      if (res.data.code == 100) {
        wx.navigateBack({
          url: '../homepage/homepage'
        })
      } else {
        wx.showToast({
          title: '服务器出错',
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
      category: options.category,
      typename: options.typename,
      money: options.money,
      date: options.date,
      time: options.time,
      remarks: options.remarks
    })
    //初始化界面
    var categoryIndex = this.data.categoryArray.indexOf(this.data.category)
    if (categoryIndex == 0) {
      this.setData({
        categoryIndex: 0,
        typenameArray: this.data.personalList
      })
    } else if (categoryIndex == 1) {
      this.setData({
        categoryIndex: 1,
        typenameArray: this.data.dailyList
      })
    } else {
      this.setData({
        categoryIndex: 2,
        typenameArray: this.data.operationList
      })
    }
    var typenameIndex = this.data.typenameArray.indexOf(this.data.typename)
    this.setData({
      typenameIndex: typenameIndex
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
})