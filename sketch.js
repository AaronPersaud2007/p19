var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;

  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3
   
}

function spawnDoors(){
  if (frameCount%160==0){
  door = createSprite(Math.round(random(120,400)),50);
  door.addImage("door",doorImg);
  door.velocityY = 2;
  door.lifetime = 800;
  doorsGroup.add(door);

  door.depth = ghost.depth

  ghost.depth = ghost.depth + 1

  climber = createSprite(200,120);
  climber.x = door.x
  climber.addImage("climber",climberImg);
  climber.velocityY = 2;
  climber.lifetime = 800
  climbersGroup.add(climber);
  climber.scale =0.4

  invisibleBlock = createSprite(200,120);
  invisibleBlock.velocityY = 2
  invisibleBlock.x = door.x
  invisibleBlock.width = 100
  invisibleBlock.height = 2
  invisibleBlock.lifetime = 800
  invisibleBlockGroup.add(invisibleBlock);
  }
  
}



function draw() {
  background(200);
  
 if (gameState == "play"){
  spawnDoors();
  if(tower.y > 400){
      tower.y = 300
    }
    
    if (keyDown ("right_arrow")){
      ghost.x=ghost.x+3
    }
    if (keyDown ("left_arrow")){
      ghost.x=ghost.x-3
    }
    if (keyDown("space")){
      ghost.velocityY = -5
    }
    ghost.velocityY += 0.8
    if (ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }
    if (ghost.isTouching(invisibleBlockGroup)||ghost.y > 600){
      gameState = "end";
      ghost.destroy();
    }
    drawSprites();
  }
  if (gameState == "end"){
    fill ("green");
    stroke ("red");
    textSize(30);
    text ("Game Over",230,350);
  }
}
