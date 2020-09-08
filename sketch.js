var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var gameOver,gameOverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameOverImage = loadImage("gameOver.jpg");
  
}



function setup() {
  
 createCanvas(600, 200);
  
   monkey= createSprite(50,170,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  
  
  ground = createSprite(200,190,1500,5);
  ground.velocityX=-4;

   obstacleGroup = createGroup();
  foodGroup = createGroup();
  
}


function draw() {
  
 background("white");
  
  if(gameState===PLAY){
    
     //scoring
    score = score + Math.round(getFrameRate()/60);
    
  if(monkey.isTouching(foodGroup)){
    
    foodGroup.destroyEach();
       
     }
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  spawnobstacle();
   spawnBanana();
  
  monkey.collide(ground);
   
    if(keyDown("space")&& monkey.y >= 100) {
      
        monkey.velocityY = -12;
     
      
  }
    
       monkey.velocityY = monkey.velocityY + 0.8;
    
      if(obstacleGroup.isTouching(monkey)){
        gameState = END;
      }
     }
  
  if(gameState===END){
    
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    
    monkey.visible=false;
    ground.visible=false;
    
    Over();
    
     }
  
  text("Score: "+ score, 500,50);
    
    drawSprites();
  
}

function spawnobstacle(){
   if (frameCount % 100 === 0) {
     
    obstacle= createSprite(600,173,30,40);
     obstacle.x = Math.round(random(80,120));  
  obstacle.addImage( obstacleImage);
  obstacle.scale=0.09;
    obstacle.velocityX = -(6+ score/100);
     obstacle.lifeTime=600/3;
     obstacleGroup.collide(ground);
      obstacleGroup.add(obstacle);
     obstacle.y=180;
     obstacle.x=600;
   }
}

function spawnBanana(){
   if (frameCount % 100 === 0) {
  banana = createSprite(600,100,20,50);
 banana.y = Math.round(random(80,120));
  banana.addImage( bananaImage);
 banana.scale=0.07;
      banana.velocityX = -3;
     banana.lifeTime=600/3;
      foodGroup.add(banana);
   }
}

function Over(){
 gameOver=createSprite(300,100); 
   gameOver.addImage(gameOverImage);
  gameOver.scale=0.4;
}



