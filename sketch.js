var flappy ,flappyImage , flappystop ;
var pipe , pipe1,pipe2,pipe3 , pipe4 , pipe5 ;  
var bg , startbg ; 
var ground ; 
var GameState = 0 ;
var title , playButton ,play ; 
var getready ; 
var pipegroup  ;

function preload(){
     bg = loadImage('Images/bg.png');
     startbg = loadImage('Images/startbg.png');
     title = loadImage('Images/title.png');
     playButton = loadImage('Images/PLAY_BUTTON.png');
     flappyImage = loadAnimation('Images/flappy1.png','Images/flappy2.png','Images/flappy3.png','Images/flappy4.png');
     flappystop = loadAnimation('Images/flappy4.png');
     pipe1 = loadImage('Images/p1.png');
     pipe2 = loadImage('Images/p2.png');
     pipe3 = loadImage('Images/p3.png');
     pipe4 = loadImage('Images/p4.png');
     pipe5 = loadImage('Images/p5.png');
    getready = loadImage('Images/getready.png');
    }

function setup(){
    createCanvas(displayWidth - 50 ,displayHeight - 200);

    ground = createSprite(width,height/2,2*width,height);
    ground.addImage(bg);
    ground.visible = false ; 

    play = createSprite(width/2,height-200);
    play.visible = false ; 

    flappy = createSprite(200,height/2);
    flappy.visible = false ; 
    flappy.addAnimation("running",flappyImage);
    flappy.addAnimation("stop",flappystop);
    flappy.scale = 0.6 ; 

    pipegroup = new Group();

    



}

function draw (){ 

    if(GameState == 0 ){
        background(startbg);
        imageMode(CENTER);
        image(title,width/2,125,500,100);

        image(getready,width/2,height/2,500,100);

        play.visible = true ; 
        play.addImage(playButton);
        play.scale = 2 ;  

        if(mousePressedOver(play)){
             GameState = 1 ; 
             play.visible = false ; 
             getready.visible = false ; 
        }
        
    }

    else if(GameState == 1 ){
        background("white");
        ground.visible = true ; 
        ground.velocityX = -3 ; 

        if(ground.x < 0){
            ground.x = ground.width/2 ; 
        }

        flappy.visible = true ; 

        if(mousePressedOver(ground)){
            flappy.velocityY = -5 ; 
        }
        flappy.velocityY -= -0.5

        pipes();

        if(pipegroup.isTouching(flappy)){
            GameState = 2
        }
    }

    else if(GameState == 2){
        background('white');
        ground.velocityX = 0 ; 
        flappy.velocityY = 0 ;
        pipegroup.setVelocityXEach(0);
        pipegroup.setLifetimeEach(-1);
    }

    drawSprites();
}

function pipes(){
    if(frameCount % 100 == 0){
        pipe = createSprite(width,height/2,80,height);
        var choose = Math.round(random(1,5));

        switch(choose){
            case 1 :pipe.addImage(pipe1);
            break ; 

            case 2 :pipe.addImage(pipe2);
            break;

            case 3 :pipe.addImage(pipe3);
            break ; 

            case 4 :pipe.addImage(pipe4);
            break;

            case 5 :pipe.addImage(pipe5);
            break;
        }

        pipe.velocityX = -3 ; 
        pipe.lifetime = Math.round(width/3);
        pipe.scale = 1.1 ; 
        pipe.debug = true ; 

        pipegroup.add(pipe);
    }
}
