// pages/Component/Component.js


var types = ['default','primary','warn']
var pageObject={
  data:{
    defaultSize:'default',
    primarySize:'default',
    warnSize:'default',
    disabled:false,
    plain:false,
    loading:false
  },
  setDisabled:function(e){
    this.setData({
      disabled:!this.data.disabled
    })
  },
  setPlain:function(e)
  {
    this.setData({
      plain:!this.data.plain
    })
  },
  setLoading:function(e){
    this.setData({
      loading:!this.data.loading
    })
  },
  onGotUserInfo:function(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconSize:[20,30,40,50,60,70],
    iconColor:[
      'red','orange','yellow','green','rgb(0,255,255)','blue','purple'
    ],
    iconType:[
      'success','success_no_circle','info','warn','waiting','cancel','download','search','clear'
    ],
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})