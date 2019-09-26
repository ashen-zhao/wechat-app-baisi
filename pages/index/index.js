//index.js
//获取应用实例
const app = getApp()
var currentPage = 0
Page({
  data: {
    menuList: ['全部', '视频', '图片', '段子'],
    currentNav: 0,
    dataSource: []
  },
  onShareAppMessage: function () {
    return {
      title: '小鱼乐',
      path: '/page/index'
    }
  },
  onPullDownRefresh() {
    this.getListData(0)
  },
  onReachBottom: function () {
    currentPage = currentPage + 1
    this.getListData(currentPage)
  },
  onLoad: function() {
    this.getListData(0)
  },
  getListData: function(index) {
    let that = this
    wx.request({
      url: 'https://s.budejie.com/topic/list/jingxuan/29/baisi_xiaohao-iphone-4.1/0-20.json',
      success(res) {
        that.setData({
          dataSource: res.data.list
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  menuClick: function(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentNav: index
    })
    this.getListData(index)
  }
})