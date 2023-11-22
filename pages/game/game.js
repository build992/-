// pages/game/game.js

var data =require('../../utils/data.js')

//地图数据(墙，道路，终点)
var map =[
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
//箱子数据
var box =[
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
//方块数据
var w = 40
//主角所在位置
var row = 0
var col = 0
Page({

  data: {
  },

// 上
up: function(){
  //如果主角不在最顶端
  if(row>0){ 
    if(map[row-1][col] != 1 && box[row-1][col] != 4){       // 不是箱子、墙
      row = row-1;
    }
    else if(box[row-1][col] == 4) {                         //箱子
      if(row-1 > 0) {                                      //箱子不是靠顶端
      if(map[row-1-1][col] != 1 && box[row-1-1][col] !=4){
        box[row-1-1][col] = 4
        box[row-1][col] = 0
        row -=1;
        }  
      }
    }     
         this.drawCanvas()
         this.CheckWin()
  }
  },
//下
down: function(){
  if(row<7){                                               //如果主角不在最底端
    if(map[row+1][col] != 1 && box[row+1][col] != 4){       // 不是箱子、墙
      row = row + 1;
    }
    else if(box[row+1][col] == 4) {                         //碰到箱子
      if(row + 1 < 7) {                                      //箱子不是靠底端
      if(map[row+2][col] != 1 && box[row+2][col] !=4){
        box[row+2][col] = 4
        box[row+1][col] = 0
        row +=1;
        }  
      }
    }     
         this.drawCanvas()
         this.CheckWin()
  }
},
//左
left: function(){
  if(col >0){                                               //如果主角不在最左端
    if(map[row][col-1] != 1 && box[row][col-1] != 4){       // 不是箱子、墙
      col = col - 1;
    }
    else if(box[row][col-1] == 4) {                         //碰到箱子
      if(col - 1 > 0 ) {                                      //箱子不是靠底端
      if(map[row][col-2] != 1 && box[row][col-2] !=4 ){
        box[row][col-2] = 4
        box[row][col-1] = 0
        col -=1;
        }  
      }
    }     
         this.drawCanvas()
         this.CheckWin()
  }

},
//右
right: function(){
  if(col <7){                                               //如果主角不在最左端
    if(map[row][col+1] != 1 && box[row][col+1] != 4){       // 不是箱子、墙
      col = col + 1;
    }
    else if(box[row][col+1] == 4) {                         //碰到箱子
      if(col + 1 > 0 ) {                                      //箱子不是靠底端
      if(map[row][col+2] != 1 && box[row][col+2] !=4 ){
        box[row][col+2] = 4
        box[row][col+1] = 0
        col +=1;
        }  
      }
    }     
         this.drawCanvas()
         this.CheckWin()
  }
}, 

//游戏成功

IsWin:function(){
  for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
      if(box[i][j] == 4 && map[i][j] != 3){    //有的箱子没有放在猪头上
        return false;
      }
    }
  }
  return true;
},

//弹出窗口


CheckWin:function()
{
  if(this.IsWin())
  {
    wx.showModal({
      title: '恭喜',
      content: '游戏成功！！！',
      showCancel:false
    })
  }

},

// 初始化地图
  initMap:function(level)
  {
    //读取当前地图数据
    let mapData = data.maps[level]
    //记录地图数据
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        box[i][j]=0
        map[i][j]=mapData[i][j]   
      
        //当前位置是箱子
        if(mapData[i][j]==4){
          box[i][j] = 4
          map[i][j] = 2
        }
        //当前位置是主角
        else if(mapData[i][j] == 5){
          map[i][j] = 2
          //更新主角位置 
          row = i
          col = j
        }
       }
    }
  },
  ResStart:function()
  {
    this.initMap(this.data.level-1)
    this.drawCanvas()
  },
  onLoad(options) {
    //console.log(options.level)
    let level = options.level
    this.setData({
      level:parseInt(level)+1
    })
    //
    this.ctx = wx.createCanvasContext('myCanvas')

    this.initMap(level)
    this.drawCanvas()
  },
 
  //构建地图
  drawCanvas:function()
  {
    let ctx = this.ctx
    //初始化
    ctx.clearRect(0,0,320,320)

    //循环绘制地图
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        let img = 'ice'  // 初始都是道路

        if(map[i][j] == 1){ //加入墙
          img='stone'
        }

        else if(map[i][j] == 3){  //加入终点
          img = 'pig'
        }
        //绘制
        ctx.drawImage('/image/icons/'+img+'.png',j*w,i*w,w,w)
        //叠加绘制
        if(box[i][j] == 4)
        {
          ctx.drawImage('/image/icons/box.png',j*w,i*w,w,w)
        }
      }
    }
    ctx.drawImage('/image/icons/main.png',col*w,row*w,w,w)
    // 渲染
      ctx.draw()

  }
  
})