// index.js
Page({
  data: {
    levels:[
      'level01.webp',
      'level02.webp',
      'level03.webp',
      'level04.webp'
    ]
  },
  chooseLevels:function(e)
  {
      //console.log(e)
      let level = e.currentTarget.dataset.level
      wx.navigateTo({
        url: '../game/game?level='+level
      })
  }
})
