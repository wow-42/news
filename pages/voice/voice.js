// pages/voice/voice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    maxtime: '',
     loadingHidden: false,
     isplay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData('newlist')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.onBackgroundAudioPause(function() {
      // callback
      that.setData({
        isplay:false
      })
    })
    wx.onBackgroundAudioStop(function() {
      // callback
      that.setData({
        isplay:false
      })
    })
  },
  onUnload: function () {
    this.setData({
      isplay:false
    })
  },
  playVoice: function (e) {
    console.log(e);
    wx.playBackgroundAudio({
      dataUrl: e.currentTarget.dataset.voiceuri
    })
    this.setData({
      isplay:true
    })
  },
  /*暂停歌曲 */
  pauseVoice: function(){
    var that = this
    
    wx.stopBackgroundAudio({
      success: function(res){
        console.log('暂停歌曲')
        that.setData({
          isplay:false
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  /**
   * 上拉刷新
   */
  bindscrolltoupper: function () {
    //加载最新
    this.requestData('newlist');
    console.log("到头部")
  },

  /**
   * 加载更多
   */
  bindscrolltolower: function () {
    console.log('到底部')
    //加载更多
    this.requestData('list');
  },
  requestData(a){
    var that = this 
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        maxtime: that.data.maxtime,
        type: '31'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        console.log('上一页', that.data.list)
        that.setData({
          // 拼接数组
          list: that.data.list.concat(res.data.list),
          loadingHidden: true,
          maxtime: res.data.info.maxtime
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  goDis(e){
    console.log("taolun:"+e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../diss/diss?id=${id}`,
    })
  }
})