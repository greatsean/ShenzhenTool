const getSchoolList = (success)=>{
  wx.request({
    url: 'https://japi.wolaidai.com/jrocket2/api/v2/config_datas?items=schools',
    method:"GET",
    success,
  })
}
export {
  getSchoolList
}