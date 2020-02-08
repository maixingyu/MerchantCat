const app = getApp()
const util = require("../../../utils/util.js")
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tab: ['个人支出', '日常费用', '运营成本'],
    //Personal  daily  operation
    personalList: ['交通', '餐饮', '娱乐', '医疗', '社交', '运动', '其他'],
    dailyList: ['水费', '电费', '国税', '地税', '电话费', '办公用品', '其他'],
    operationList: ['员工工资', '房租', '管理费用', '物流', '进货成本', '员工借支', '奖金', '其他'],
    personal: '交通',
    daily: '水费',
    operation: '员工工资',
    typenameIndex: 0,
    category: '个人支出',
    typename: '交通',
    money: "0.00",
    pickerDate: '2019-12-31',
    date: '2019-12-31',
    time: '12:01',
    remarks: '',
  },
  //导航栏切换
  tabSelect: function(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    this.initData()
  },
  //界面发生切换初始化公有的值
  initData() {
    this.setData({
      typenameIndex: 0,
      money: "0.00",
      personal: '交通',
      daily: '水费',
      operation: '员工工资',
      date: util.getDate(new Date),
      time: util.getTime(new Date),
      remarks: '',
    })
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
  //支出类别单选框改变事件
  Bindchange(e) {
    if (this.data.TabCur == 0) {
      this.setData({
        personal: e.detail.value,
        typenameIndex: this.data.personalList.indexOf(e.detail.value)
      })
    } else if (this.data.TabCur == 1) {
      this.setData({
        daily: e.detail.value,
        typenameIndex: this.data.dailyList.indexOf(e.detail.value)
      })
    } else {
      console.log(e.detail.value)
      console.log(this.data.operationList.indexOf(e.detail.value))
      this.setData({
        operation: e.detail.value,
        typenameIndex: this.data.operationList.indexOf(e.detail.value)
      })
    }
  },
  //日常费用类别单选框改变事件
  dailyBindchange(e) {

  },
  //日常费用类别单选框改变事件
  operationBindchange(e) {

  },
  //时间改变
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  //日期改变
  DateChange(e) {
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
      if (this.data.TabCur == 0) {
        this.setData({
          category: this.data.tab[0],
          typename: this.data.personal
        })
      } else if (this.data.TabCur == 1) {
        this.setData({
          category: this.data.tab[1],
          typename: this.data.daily
        })
      } else {
        this.setData({
          category: this.data.tab[2],
          typename: this.data.operation
        })
      }
      //获得添加记录数据
      this.addOneRecord()
    }
  },
  //获得添加记录数据
  addOneRecord() {
    wx.pro.request({
      url: app.globalData.host + '/merchant/record/add',
      data: {
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
      method: 'POST',
    }).then(res => {
      console.log("添加记账记录", res)
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      date: util.getDate(new Date),
      pickerDate: util.getDate(new Date),
      time: util.getTime(new Date)
    })
  },
})