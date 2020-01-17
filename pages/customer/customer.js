Page({
  data: {
    PageCur: 'me'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: '商户猫',
      imageUrl: '/images/logo-orange.png',
      path: '/pages/character/character'
    }
  },
})