// pages/school/SchoolList.js
import {
  getSchoolList
} from './../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolData: [],
    searchBox: ''
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
    getSchoolList((res) => {
      console.log('lxh', res)
      const {
        data: {
          schools: {
            data
          }
        }
      } = res;
      this.backupData = data
      this.setData({
        schoolData: data
      });
    });
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
    this.exeTimer && clearTimeout(this.exeTimer);
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

  },
  bindinput: function(e) {
    let currentValue = e.detail.value;
    this.setData({
      [e.target.id]: currentValue
    });
    clearTimeout(this.exeTimer);

    this.exeTimer = setTimeout(() => {
      let data = [];
      this.backupData.forEach((v, index) => {
        if (v.name.indexOf(currentValue) != -1) {
          data.push(v);
        }
      });
      console.log('lxh', data);
      wx.showToast({
        title: `找到${data.length}个结果`,
      })
      this.setData({
        schoolData: data
      });
    }, 1500);

  },
  onSearchAction: function(e) {

    console.log('lxh', e);
    console.log('lxh', this.data.searchBox);
  },
  onItemClick: function (e) {
    let item = e.currentTarget.dataset.item;
    console.log('lxh', item);
    wx.showToast({
      title: item.name,
      icon:'none'
    })
  }
})