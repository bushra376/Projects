window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
var imageFor = null;
var imageBack = null;
//var output;

function uploadFor() {
  var canvas1 = document.getElementById("can1");
  var fileinputFor = document.getElementById("finput");
  imageFor = new SimpleImage(fileinputFor);
  imageFor.drawTo(canvas1);
}

function uploadBack() {
  var canvas2 = document.getElementById("can2");
  var fileinputBack = document.getElementById("binput");
  imageBack = new SimpleImage(fileinputBack);
  imageBack.drawTo(canvas2);
}

function doGreenScreen() {
  if(imageFor == null || !imageFor.complete()){
    alert("foreground not loaded");
    return;
  }
  if(imageBack == null || !imageBack.complete()){
    alert("background not loaded");
    return;
  }
  
  clearCanvas();
  
  var output = new SimpleImage(imageFor.getWidth(), imageFor.getHeight());

  for (var pixel of imageFor.values()) {
    // if foreground pixel is green //
   // if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
    if(pixel.getGreen() > 240){
      var backPixel = imageBack.getPixel(pixel.getX(), pixel.getY());
      output.setPixel(pixel.getX(), pixel.getY(), backPixel);
    } 
    else {
      output.setPixel(pixel.getX(), pixel.getY(), pixel);
    }
  }
  
  var canvas1 = document.getElementById("can1");
  output.drawTo(canvas1);
}

function clearCanvas(){
  var canvas1 = document.getElementById("can1");
  var context1 = canvas1.getContext("2d");
  context1.clearRect(0,0,canvas1.width,canvas1.height);
  var canvas2 = document.getElementById("can2");
  var context2 = canvas2.getContext("2d");
  context2.clearRect(0,0,canvas2.width,canvas2.height);
  /*
  canvas1.height = 200;
  canvas1.width = 400;
  canvas2.height = 200;
  canvas2.width = 400;
  */
}