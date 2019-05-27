//index.js
//获取应用实例
const app = getApp()
const PAGE_SIZE = 10
const PAGE_NUMBER = 1
var currentPageNum = PAGE_NUMBER

Page({
  data: {
  },

  onLoad: function () {
  },
  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
   
  },
 
  jumpLunhou: function (e) {
    console.log('lxh>>>.',e);
    wx.navigateTo({
      url: '../fang/FangList',
    })
  },

  jumpLilv: function (e) {
    console.log('lxh>>>.', e);
    wx.navigateTo({
      url: '../calc/rate/Interest',
    })
  },

  jumpYuanxiao: function (e) {
    console.log('lxh>>>.', e);
    wx.navigateTo({
      url: '../school/SchoolList',
    })
  },

})
