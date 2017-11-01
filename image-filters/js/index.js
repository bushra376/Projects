window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;

var canvas = document.getElementById("can"); //Canvas
var origImage = document.getElementById("finput"); //Uploaded Image
var image = null;
var imageGrey = null;
var imageRed = null;
var imageRainbow = null;
var imageBorder = null;
var imageBlur = null;

function upload() {
  image = new SimpleImage(origImage);
  imageGrey = new SimpleImage(origImage);
  imageRed = new SimpleImage(origImage);
  imageRainbow = new SimpleImage(origImage);  
  imageBorder =  new SimpleImage(origImage);  
  imageBlur =   new SimpleImage(origImage);  
  
  image.drawTo(canvas);
}

function makeGrey() {
  if (ImageLoadCheck(imageGrey)) {
    doGrey();
    imageGrey.drawTo(canvas);
  }
}
function makeRed() {  
  if (ImageLoadCheck(imageRed)) {
    doRed();
    imageRed.drawTo(canvas);
  }
}
function makeRainbow() {
  if (ImageLoadCheck(imageRainbow)) {
    doRainbow();
    imageRainbow.drawTo(canvas);
  }
}

function makeBorder(){
  if(ImageLoadCheck(imageBorder)){
    doBorder();
    imageBorder.drawTo(canvas);
  }
}

function reset() {
  if (ImageLoadCheck(image)) {
    image.drawTo(canvas);    
  }
  imageGrey = new SimpleImage(origImage);
  imageRed = new SimpleImage(origImage);
  imageRainbow = new SimpleImage(origImage);
  imageBorder = new SimpleImage(origImage);  
  imageBlur =  new SimpleImage(origImage);    
}
function ImageLoadCheck(dummyImg) {
  if (dummyImg == null || !dummyImg.complete()) {
    alert("picture not loaded");
    return false;
  } else {
    return true;
  }
}
function doGrey() {
  for (var pixel of imageGrey.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}
function doRed() {
  for (var pixel of imageRed.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if(avg < 128){
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);      
    }
    else{
      pixel.setRed(255);
      pixel.setGreen((2*avg)-255);
      pixel.setBlue((2*avg)-255);      
    }
  }
}
function doRainbow() {
  var width = imageRainbow.getWidth();
  var height = imageRainbow.getHeight();
  var segment = width / 7;

  for (var pixel of imageRainbow.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;    
    
    if (pixel.getX() <= segment) {    
      if(avg < 128){
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
      }else{
        pixel.setRed((0.4 * avg)+ 153);
        pixel.setGreen((2* avg)-255);
        pixel.setBlue(( 0.4 * avg)+153);
      }
    } //Violet
    
    if ((pixel.getX() > segment) && (pixel.getX() <= (2*segment))) {
      if(avg < 128){
        pixel.setRed(0.8 * avg);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      }else{
        pixel.setRed((1.2 * avg) - 51);
        pixel.setGreen((2* avg)-255);
        pixel.setBlue(255);
      }     
    } // indigo
    
    if ((pixel.getX() > (2*segment)) && (pixel.getX() <= (3*segment))) {
      if(avg < 128){
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      }else{
        pixel.setRed((2 * avg) - 255);
        pixel.setGreen((2* avg) -255);
        pixel.setBlue(255);
      }
    } // blue
    
    if((pixel.getX() > (3*segment)) && (pixel.getX() <= (4*segment))) {
      if(avg < 128){
        pixel.setRed(0);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed((2 * avg) - 255);
        pixel.setGreen(255);
        pixel.setBlue(( 2 * avg) - 255);
      }          
    } // green
    
    if ((pixel.getX() > (4*segment)) && (pixel.getX() <= (5*segment))){
      if(avg < 128){
        pixel.setRed(2 * avg);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(( 2 * avg) - 255);
      }    
    } // yellow
    
    if ((pixel.getX() > (5*segment)) && (pixel.getX() <= (6*segment))) {
      if(avg < 128){
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8 * avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen((1.2 * avg) - 51);
        pixel.setBlue(( 2 * avg) - 255);
      }      
    } // orange
    
    if ((pixel.getX() > (6*segment)) && (pixel.getX() <= (7*segment))) {      
      if(avg < 128){
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen((2* avg) - 255);
        pixel.setBlue(( 2 * avg) - 255);
      }   
    } //red       
  }
}
function doBorder(){
  var widthOfSegment = imageBorder.getWidth()/5;
  var height = imageBorder.getHeight();
  var heightOfBorder = imageBorder.getHeight()/10;
  
  for(var pixel of imageBorder.values()){
    if((pixel.getY() < heightOfBorder) || (pixel.getY() > (height - heightOfBorder ))){
      
      if (pixel.getX() <= widthOfSegment) {      
          pixel.setRed((pixel.getRed()+255)/2);
          pixel.setGreen((pixel.getGreen()+215)/2);
          pixel.setBlue((pixel.getBlue()+0)/2);      
        } //SpringGreen

        if ((pixel.getX() > widthOfSegment) && (pixel.getX() <= (2*widthOfSegment))) {
          pixel.setRed((pixel.getRed()+85)/2);
          pixel.setGreen((pixel.getGreen()+0)/2);
          pixel.setBlue((pixel.getBlue()+140)/2);      
        } // indigo

        if ((pixel.getX() > (2*widthOfSegment)) && (pixel.getX() <= (3*widthOfSegment))) {
          pixel.setRed((pixel.getRed()+100)/2);
          pixel.setGreen((pixel.getGreen()+149)/2);
          pixel.setBlue((pixel.getBlue()+237)/2);
        } // cornflourblue

        if((pixel.getX() > (3*widthOfSegment)) && (pixel.getX() <= (4*widthOfSegment))) {
          pixel.setRed((pixel.getRed()+220)/2);
          pixel.setGreen((pixel.getGreen()+20)/2);
          pixel.setBlue((pixel.getBlue()+60)/2);
        } // crimson

        if ((pixel.getX() > (4*widthOfSegment)) && (pixel.getX() <= (5*widthOfSegment))){
          pixel.setRed((pixel.getRed()+255)/2);
          pixel.setGreen((pixel.getGreen()+127)/2);
          pixel.setBlue((pixel.getBlue()+80)/2);
        } // coral      
    }
  }
}

function makeBlur(){  
  if(ImageLoadCheck(imageBlur)){
    doBlur();
    //imageBlur.drawTo(canvas);
  }  
}

function doBlur(){
  var dummyBlur = new SimpleImage(origImage.getWidth(), origImage.getHeight());
  for(var pixel of imageBlur.values()){
   
    if(Math.random() >= 0.5){
      dummyBlur.setPixel(pixel.getX(), pixel.getY(), pixel);
    }else{
      var check = 0;  
      var Xpix = 0;
      var Ypix = 0;
      while(check != 1){
         Xpix = Math.floor(Math.random() * 10);
         Ypix = Math.floor(Math.random() * 10);
        
         if(((Xpix + pixel.getX()) < (imageBlur.getWidth()-1)) && ((Ypix + pixel.getY())  < (imageBlur.getHeight() - 1)))
         {
           check = 1;  
         }
      }
      var newPixel = imageBlur.getPixel(Xpix, Ypix);
      dummyBlur.setPixel(pixel.getX(), pixel.getY(), newPixel);
    }
  }
  
  imageBlur = dummyBlur;
  imageBlur.drawTo(canvas);
}