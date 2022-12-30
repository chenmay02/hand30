var colors = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a)
var colors_r = "e0e2db-d2d4c8-b8bdb5-889696-5f7470".split("-").map(a=>"#"+a)
var clr,clr_r

//資料集設定+++++++++++++
var positionX =[] //所有花的X軸位置，List串列，array陣列
var positionY =[]  //所有花的Y軸位置
var clrList =[] //所有花瓣顏色
var clr_r_List =[] //所有花圓心顏色
var sizeList =[]  //所有花的大小

//攝影機設定+++++++++++++
let handpose;
let video; //攝影機取得影像，放影像資料
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16




function setup() {
  createCanvas(windowWidth, windowHeight);  
  angleMode(DEGREES);//將方位度數改為角度模式

  for(var j=0;j<10;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)
    //紀錄資料
    positionX.push(random(width)) //把花X位置存入到positionX list資料內
    positionY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionX[j],positionY[j]) //花的座標，原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
    pop()
    }

  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
      predictions = results;
  });

  // Hide the video element, and just show the canvas
   video.hide();

}

function modelReady() {
  console.log("Model ready!");
}


function draw() {
  translate(width, 0);
  scale(-1, 1);
	
  background(255); 
	
	image(video,0,0,width, height)
	 
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指的距離

	

  for(var j=0;j<positionX.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionX[j],positionY[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
    r_Flower(clrList[j], clr_r_List[j],clr_r_r_List[j],sizeList[j],positionX[j],positionY[j])
  }
  
	drawKeypoints(); //取得手指位置
  
  

}


function modelReady() {
  console.log("Model ready!");
}


function draw() {  //一秒進到function執行60次
  translate(width, 0);
  scale(-1, 1);
	
  background(255); 
	
	image(video,0,0,width, height)
	 
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指的距離

	
  for(var j=0;j<positionX.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionX[j],positionY[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
    r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionX[j],positionY[j])
  }
  
	drawKeypoints(); //取得手指位置
  
}


function drawFlower(clr,clr_r,size=1){ 
      
  push()
    scale(size) //縮放

       fill(clr)
        ellipse(719+0/15,348+ 0/15,300)//身體大圓
        ellipse(712+0/15,158+ 0/15,200)//身體小圓
        ellipse(664+0/15,131+ 0/15,50)//左眼睛
        ellipse(759+0/15,137+ 0/15,50)//右眼睛
      
        fill(255,0,0)//鼻子填滿紅色
         triangle(694+0/15,165+ 0/15,729+0/15,164+ 0/15,710+0/15,206+ 0/15)
      
        fill(clr_r)//肚子鈕扣，填滿黑色
         ellipse(717+0/15,309+ 0/15,20)
         ellipse(718+0/15,363+ 0/15,20)
         ellipse(716+0/15,418+ 0/15,20)
      
        fill(0)//填滿黑色
         ellipse(664+0/15,129+ 0/15,20)//左眼球
         ellipse(760+0/15,136+ 0/15,20)//右眼球
    pop()
      }



      function mousePressed(){
        //紀錄資料
        positionX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionX list資料內
        positionY.push(mouseY)
        clrList.push(colors[int(random(colors.length))])
        clr_r_List.push(colors_r[int(random(colors_r.length))])
        sizeList.push(random(0.5,1.5))
        let data_length = positionX.length
        //畫圖
        push() 
          translate(positionX[data_length-1],positionY[data_length-1]) //花的座標，原點移到視窗的中心點
          clr = clrList[data_length-1]
          clr_r = clr_r_List[data_length-1]
          drawFlower(clr,clr_r,sizeList[data_length-1]) 
        pop()
            
        }
        
        function drawKeypoints() {
          for (let i = 0; i < predictions.length; i += 1) {
            const prediction = predictions[i];
            for (let j = 0; j < prediction.landmarks.length; j += 1) {
              const keypoint = prediction.landmarks[j];
              fill(0, 255, 0);
              // noStroke();
              if (j == 8) {				
                pointerX8 = map(keypoint[0],0,640,0,width)
                pointerY8 = map(keypoint[1],0,480,0,height)
                pointerZ8 = keypoint[2]
                console.log(pointerZ8)
                if(pointerZ8<-40)
                {
                  R_draw(pointerX8,pointerY8)
                }
                
                ellipse(pointerX8, pointerY8, 30, 30);
              } else
              if (j == 4) {   
            fill(255,0,0)
                pointerX4 = map(keypoint[0],0,640,0,width)
                pointerY4 = map(keypoint[1],0,480,0,height)
                // pointerZ = keypoint[2]
                // print(pointerZ)
                ellipse(pointerX4, pointerY4, 30, 30);
            
              } else
              if (j == 14) {
                pointerX14 = keypoint[0];
                pointerY14 =  keypoint[1];
              } else
              if (j == 16) {
                pointerX16 = keypoint[0];
                pointerY16 =  keypoint[1];
              }
              
            }
          
          }
        }
        //---------------------------
    
        function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
          push()
            translate(F_x,F_y);
          if(pointerY14<pointerY16){
            drawFlower(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+0.6))
          }else
          {
            //無名指沒有彎曲，張開無名指，花旋轉
            rotate(frameCount/20)
            drawFlower(F_clr,F_clr_r,F_size)
              
          }
          pop()
        }
        
        function R_draw(handX,handY)
        {
        positionX.push(handX) //把滑鼠按下的位置當作花X位置，存入到positionX list資料內
        positionY.push(handY)
        clrList.push(colors[int(random(colors.length))])
        clr_r_List.push(colors_r[int(random(colors_r.length))])
        sizeList.push(random(0.5,1.5))
        let data_length = positionX.length
        //畫圖
        push() 
          translate(positionX[data_length-1],positionY[data_length-1]) //花的座標，原點移到視窗的中心點
          clr = clrList[data_length-1]
          clr_r = clr_r_List[data_length-1]
          drawFlower(clr,clr_r,sizeList[data_length-1]) 
        pop()
        
        }
       
