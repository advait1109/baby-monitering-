statuses ="";
object = [];
song="";
function preload(){
    song=loadSound("sounds.mp3");
}
function start(){
    console.log("start");
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting objects";
}
function setup() {
    console.log("setup");
    canvas = createCanvas(380, 380);
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    canvas.center();
    }
function draw() {
    image(video, 0, 0, 380, 380);
    r=random(255);
    g=random(255);
    b=random(255);
    if (statuses != "") {
        for (var i = 0; i < object.length; i++) {
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            textSize(18);
            
            if (object[i].length>0){
            text("baby"+ " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            console.log("fordraw");
            song.stop();
        }
        else{
            textSize(18);
            document.getElementById("status").innerHTML="No Baby";
            song.play();
        }
        }
    }
}
function modelLoaded() {
    console.log('Model has Loaded');
    statuses = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        object = results;
        console.log("results");
    }
}