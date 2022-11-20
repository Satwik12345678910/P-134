video="";
img="";
status="";
baby = [] ;

function setup()
{
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    babyDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Baby ";
}

function draw()
{
     image(video,0,0,380,380);

     if(status !="")
     {
        babyDetector.detect(video,gotResult);
        for(i = 0 ; i < baby.length; i++)
        {

            document.getElementById("status").innerHTML=" Status : Baby Detected ";
            document.getElementById("number_of_baby").innerHTML="Baby's detected are : " + baby.length;
             
            fill("#3f4bd6");
            percent = floor(baby[i].confidence * 100);
            text(baby[i].label+" "+ percent+"%",baby[i].x + 15,baby[i].y + 15);
            noFill();
            stroke("#3f4bd6");
            rect(baby[i].x,baby[i].y,baby[i].width,baby[i].height);
        }
     }
}

function modelLoaded()
{
    console.log(" Model Loadeed ! ");
    status = true;
}

function gotResult(error,results)
{
    if (error)
    {
        console.log(error);
    }
    
    console.log(results);
    baby=results;
}