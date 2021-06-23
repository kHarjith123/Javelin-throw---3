const Engine = Matter.Engine;
const World = Matter.World;
const Constraint = Matter.Constraint;
const Bodies = Matter.Bodies;

var background1 , start;
var gameState = "start";
var engine, world;

var player_running;
var player_released;
var javelin;

function preload(){
  
  bg = loadImage("Images/bgg1.jpg");
  playbutton = loadImage("Images/Playbutton.png")
  player_running = loadAnimation("Images/player1.png","Images/player1.png","Images/player2.png",
  "Images/player2.png","Images/player3.png","Images/player3.png","Images/player4.png" , "Images/player4.png" )
  player_released = loadAnimation("Images/player5.png")
  playerHappy = loadAnimation("Images/playerHappy.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;
  
  background1 = createSprite(width/2,height/2);
  background1.addImage(bg)
  background1.scale = 2;
  background1.x = background1.width/2;

  start = createSprite(width/2+20,height/2);
  start.addImage(playbutton);

  player = createSprite(100,height-95,20,100);
  player.addAnimation("running",player_running);
  player.addAnimation("released",player_released);
  player.addAnimation("happy",playerHappy);
  player.scale = 2 

  javelin = new Javelin(110, height-178, PI/7);

  ground = new Ground( width/2 , height-10 , width , 20);
}

function draw() {
  background(255);

  Engine.update(engine);



  player.changeAnimation("released",player_released)

  if((mousePressedOver(start) || touches.length > 0) && gameState === "start"){

    gameState = "play"
    start.visible = false;

}

  if(gameState === "play"){

   player.changeAnimation( "running",player_running);

    background1.velocityX = -3 
    
    if (background1.x < 0){
      background1.x = background1.width/2;
    }
  }
 


if(keyDown("space") || touches.length > 0){

 gameState = " released";
  Matter.Body.applyForce(javelin.body,javelin.body.position, {x: random (300, 500) , y:-(random(100, height - 400)) });
  Matter.Body.setStatic(javelin.body, false);
  

  
}

if(gameState === " released"){
  player.changeAnimation("happy",playerHappy); 
  player.scale = 0.4;
  background1.velocityX = 0; 
}


  drawSprites();
  
  fill("green");
  textSize(33)
  text("JAVELIN THROW GAME",width/2-168,100);

  text(mouseX + ","+ mouseY, mouseX, mouseY);

  javelin.display();
  ground.display();
  



}