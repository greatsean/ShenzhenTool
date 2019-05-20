// pages/fang/FangList.js
//获取应用实例
const app = getApp()
const PAGE_SIZE = 10
const PAGE_NUMBER = 1
var currentPageNum = PAGE_NUMBER

Page({
  data: {
    lunhouData: [], //列表显示数据
    houseIndex: 1,
    houseTypeArr: ["安居", "公租"],
    searchIndex: 0,
    searchTypeArr: ["姓名", "身份证", "回执号", "指定页码"]
  },

  onLoad: function() {
    this.firstLoad()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log("dongtaihuoqu:" + JSON.stringify(res))
    //     wx.showToast({
    //       icon: "none",
    //       title: JSON.stringify(res),
    //     })
    //   },
    // })
    let that = this
    wx.getSystemInfo({
      success({
        windowHeight
      }) {
        console.log("dongtaihuoqu:" + windowHeight)

        wx.createSelectorQuery().select('#lunhou').fields({
          size: true
        }, function(res) {
          console.log(res)
          // that.setData({
          //   baseItemHeight: res.height
          // });
          // that.getData();
        }).exec();

        // var dddd=wx.createSelectorQuery().select('#lunhou');
        // console.log(dddd.style.height)
        // console.log(JSON.stringify(dddd))
      }
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    //下拉刷新，清除旧数据
    var searchParam = {
      waittype: parseInt(that.data.houseIndex) + 1
    }
    that.resetData()
    that.loadData(searchParam)

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    var searchParam = {
      waittype: parseInt(that.data.houseIndex) + 1,
      pageNumber: ++currentPageNum,
    }
    that.loadData(searchParam)
  },

  resetData: function() {
    var that = this
    currentPageNum = PAGE_NUMBER
    that.setData({
      lunhouData: [], //清除旧数据
    })
  },

  firstLoad: function(reqQuery) {
    this.setData({
      houseIndex: 1
    })
    this.loadData({
      waittype: 2,
      pageNumber: PAGE_NUMBER,
      pageSize: PAGE_SIZE,
      xingm: '',
    })
  },
  loadData: function(reqQuery) {
    wx.showLoading({
      title: '数据加载中',
    })
    var that = this
    console.log("查询的参数是：", JSON.stringify(reqQuery))
    wx.request({
      // url: 'http://bzflh.szjs.gov.cn/TylhW/lhmcAction.do',
      url: 'http://zjj.sz.gov.cn/bzflh/lhmcAction.do',
      // url: 'http://bzflh.szjs.gov.cn/TylhW/lhmcAction.do?method=queryYgbLhmcList&pageNumber=1&pageSize=10&waittype=2&num=0&shoulbahzh=&xingm=&idcard=',//GET请求地址
      data: {
        //必要参数
        method: 'queryYgbLhmcList',
        pageSize: reqQuery.pageSize ? reqQuery.pageSize : PAGE_SIZE,
        pageNumber: reqQuery.pageNumber ? reqQuery.pageNumber : PAGE_NUMBER,
        waittype: reqQuery.waittype ? reqQuery.waittype : '2', //2是公租房，1是安居房
        xingm: reqQuery.xingm ? reqQuery.xingm : '',
        //以下非必要参数
        num: 0,
        shoulbahzh: reqQuery.shoulbahzh ? reqQuery.shoulbahzh : '',
        idcard: reqQuery.idcard ? reqQuery.idcard : '',
      },
      header: {
        // 'content-type': 'application/json; charset=utf-8' // 默认值。以json格式提交数据，用于POST请求
        'content-type': 'application/x-www-form-urlencoded' // 以query形式提交参数
      },
      method: "POST", //GET
      success: function(res) {
        var jsonData = res.data.rows;
        console.log("网络请求返回数据：", jsonData)
        var showData = that.data.lunhouData
        if (showData && showData.length > 0) { //已有数据就追加
          showData = showData.concat(jsonData) //添加集合数据
        } else {
          showData = jsonData
        }
        for (var i = 0; i < showData.length; i++) {
          var d = showData[i]
          d.xingmShortStr = "*" + d.XINGM.substring(1)
        }
        that.setData({
          lunhouData: showData,
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  houseTypeChange: function(e) {
    var that = this
    var value = e.detail.value
    console.log('picker发送选择改变，携带值为', value)
    that.setData({
      houseIndex: value,
    })
    that.resetData() //清除旧数据
    var searchParam = {
      waittype: parseInt(value) + 1
    }
    that.loadData(searchParam)

  },

  searchTypeChange: function(e) {
    var that = this
    var value = e.detail.value;
    console.log('picker发送选择改变，携带值为', value)
    that.setData({
      searchIndex: value
    })

  },

  onSearch: function(e) {
    wx.showLoading({
      title: '数据加载中',
    })
    var that = this
    var value = e.detail.value
    console.log('confirm发送选择改变，携带值为', JSON.stringify(e))
    console.log('confirm发送选择改变，携带值为', value)
    that.resetData() //清除旧数据
    var searchParam
    switch (parseInt(that.data.searchIndex)) {
      case 0: //姓名
        searchParam = {
          xingm: value
        }
        break;
      case 1: //身份证
        searchParam = {
          idcard: value
        }
        break;
      case 2: //回执号
        searchParam = {
          shoulbahzh: value
        }
        break;
      case 3: //指定页码
        searchParam = {
          pageNumber: value
        }
        break;
    }
    searchParam.waittype = parseInt(that.data.houseIndex) + 1
    that.loadData(searchParam)
  },
  doItemClick: function(e) {
    console.log('lxh',e);
    const {
      item: {
        WAIT_TPYE,
        LHMC_ID
      }={}
    } = e.target.dataset
    wx.navigateTo({
      url: `../common/web/browser?id=${LHMC_ID}&waittype=${WAIT_TPYE}`,
    })
  }

})