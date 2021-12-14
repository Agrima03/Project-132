bedroom="";
status="";
object=[];

function preload(){
    bedroom= loadImage("Bed_room.jpg");
}

function setup(){
    canvas= createCanvas(600,400);
    canvas.position(400,230);
    object_detector= ml5.objectDetector("cocossd",modelLoaded);
    status= document.getElementById("status").innerHTML="Status: Object Detecting";
}

function modelLoaded(){
    console.log("MODEL LOADED");
    status= true;
    object_detector.detect(bedroom,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
      }
      else{
        console.log(results);
        object= results;
      }
}

function draw(){
    image(bedroom,0,0,800,500);
    if(status != ""){
      for(i=0; i<object.length; i++){
       document.getElementById("status").innerHTML= "Status: Object Detected";
       fill("#FF0000");
       percent= floor(object[i].confidence*100);
       text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
       noFill();
       stroke("#FF0000");
       rect(object[i].x,object[i].y,object[i].width,object[i].height);
      }
    }
}