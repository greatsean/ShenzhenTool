// pages/calc/rate/Interest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleTxt1: '分期金额（元）：',
    titleTxt2: '分期数：',
    titleTxt3: '一次性手续费（%）：',
    titleTxt4: '每期手续费（%）：',
    calcType: 1,
    calcArray: ['分期', '复利'],
    v1: '',
    v2: '',
    v3: '',
    v4: '',
    v5: '',
    v6: ''
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

  },

  bindInputEvent: function(e) {
    this.setData({
      [e.target.id]: e.detail.value
    });
  },

  calcTypeChange: function(e) {
    const calcType = parseInt(e.detail.value);
    if (calcType == 0) {
      this.setData({
        titleTxt1: '分期金额（元）：',
        titleTxt2: '分期数：',
        titleTxt3: '一次性手续费（%）：',
        titleTxt4: '每期手续费（%）：'
      });
    } else if (calcType == 1) {
      this.setData({
        titleTxt1: '存入本金：',
        titleTxt2: '存入期数：',
        titleTxt3: '期利率（%）：',
        titleTxt4: '复利期数：'
      });
    }
    this.setData({
      calcType
    });
  },

  doCalc: function(e) {
    const {
      calcType,
      v1,
      v2,
      v3,
      v4
      // v1: amt,
      // v2: period,
      // v3: fee_one_time,
      // v4: interest
    } = this.data;
    if (calcType == 0) {
      // this.calcFenqi(amt, period, fee_one_time, interest);
      this.calcFenqi(v1, v2, v3, v4);
    } else if (calcType == 1) {
      this.calcFuli(v1, v2, v3, v4);
    }
  },

  //计算复利
  calcFuli: function(amt, period, fee_one_time, interest) {
    
    var yearly_interest = (Math.pow((1 + parseFloat(fee_one_time / 100)), period) - 1) * 100;
    this.setData({
      nominal_yearly_interest: parseFloat(fee_one_time).toFixed(2) + "%",
      yearly_interest: yearly_interest.toFixed(2) + "%"
    });
  },
  //计算分期
  calcFenqi: function(amt, period, fee_one_time, interest) {

    var one_time_interest = (parseFloat(amt) * parseFloat(fee_one_time) / 100).toFixed(2); //一次性手续费
    var borrowed_per_month = (parseFloat(amt) / parseFloat(period)).toFixed(2); //每月还本金
    var interest_per_month = (parseFloat(amt) * parseFloat(interest) / 100).toFixed(2); //每月还利息
    var amt_per_month = parseFloat(borrowed_per_month) + parseFloat(interest_per_month); //每月还款额
    //总还款利息
    var total_interest = parseFloat(one_time_interest) + (interest_per_month * period);
    //总还款金额
    var total_amt = parseFloat(total_interest) + parseFloat(amt);
    //名义年利率
    var nominal_yearly_interest = (((total_interest / period) * 12) / amt) * 100;
    //实际年利率
    var tmp1 = parseFloat(amt) - parseFloat(one_time_interest);
    var tmp2 = parseFloat(total_interest) / parseFloat(period);
    var tmp3 = (parseFloat(tmp2) / parseFloat(tmp1)) * 24 * parseFloat(period);
    var tmp4 = parseFloat(tmp3) / (parseFloat(period) + 1);
    var yearly_interest = tmp4 * 100;

    this.setData({
      nominal_yearly_interest: nominal_yearly_interest.toFixed(2) + "%",
      yearly_interest: yearly_interest.toFixed(2) + "%"
    });
  }
})