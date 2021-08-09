var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieIMG,zombiesGroup
var ammo,ammoIMG,ammoGroup,music1
var heart1,heart2,heart3,heart1IMG,heart2IMG,heart3IMG
var bullets = 70;
var gameState = "fight"
var lives = 3
var score=0;
function preload(){
  
  shooterImg = loadImage("shooter_2.png")
  shooter_shooting = loadImage("shooter_3.png")

  bgImg = loadImage("bg.jpeg")
  zombieIMG = loadImage("zombie.png")
  music1 = loadSound("explosion.mp3")
  ammoIMG = loadImage("ammo.png")

  heart1IMG = loadImage("heart_1.png")
  heart2IMG = loadImage("heart_2.png")
  heart3IMG = loadImage("heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)

  
heart1=createSprite(displayWidth-190,40,20,20)
heart1.addImage(heart1IMG)
heart1.visible = false
heart1.scale=0.3

heart2=createSprite(displayWidth-190,40,20,20)
heart2.addImage(heart2IMG)
heart2.visible = false
heart2.scale=0.3

heart3=createSprite(displayWidth-190,40,20,20)
heart3.addImage(heart3IMG)
heart3.visible = true
heart3.scale=0.3
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


zombiesGroup = new Group()
ammoGroup = new Group()

score = 0;
}

function draw() {
  background(0); 
  
  bg.addImage(bgImg)
  bg.scale = 1.1

  fill("yellow")
  textSize(35)
  text("Score: " + score, windowWidth-250,50);

  if(ammoGroup.isTouching(zombiesGroup)){
    zombiesGroup.destroyEach()
    ammoGroup.destroyEach()
    music1.play()
    score = score+1
    if(score==25){
      gameState="won"
    }
  }



  //moving the player up and down and making the game mobile compatible using touches
  if (gameState == "fight"){

    
    
  
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
}

if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  ammo =createSprite(player.x,player.y-20,20,50)
  ammo.addImage(ammoIMG)
  ammo.velocityX = +90
  ammo.scale=0.2
  player.addImage(shooter_shooting)
  ammoGroup.add(ammo)
 bullets = bullets-1
 
if ( bullets == 0){
  gameState = "bullets"
}
}
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  
}


if(zombiesGroup.isTouching(ammoGroup)){
  for(var i=0; i<zombiesGroup.length;i++){
    if(zombiesGroup[i].isTouching(ammoGroup)){
      zombiesGroup[i].destroy();
      ammoGroup.destroyEach();
    }
  }
}

if(zombiesGroup.isTouching(player)){
  for(var i=0; i<zombiesGroup.length;i++){
    if(zombiesGroup[i].isTouching(player)){
      zombiesGroup[i].destroy();
      lives = lives-1;
    }
  }
}
if  (lives == 2){
  heart2.visible = true
  heart3.visible = false
}
if (lives == 1){
  heart1.visible = true
 heart2.visible = false
}
if (lives == 0 ){
  gameState = "Lost"
  heart1.visible = false
}
spawnZombies()

}
drawSprites();


if (gameState =="Lost"){


  fill("red")
  textSize(100)
  text("You Lose",windowWidth/2-100,windowHeight/2)
  zombiesGroup.destroyEach()
  player.destroy()
 
}
else if(gameState == "won"){
  fill("Green")
  textSize(100)
  text("You Won",windowWidth/2-100,windowHeight/2+100)
  zombiesGroup.destroyEach()
  player.destroy()
  

}
else if (gameState == "bullets"){
  fill("White")
  textSize(100)
  fill("red")
  text("You ran out of bullets",350,350)
  zombiesGroup.destroyEach()
  player.destroy()
  ammoGroup.destroyEach()
  
}
//player goes back to original standing image once we stop pressing the space bar
}


function spawnZombies(){
  if(frameCount % 280 === 0) {
    var zombie= createSprite(windowWidth,120,10,40);
    zombie.y = Math.round(random(0,windowHeight-100));
    zombie.addImage(zombieIMG);
    zombie.scale = 0.25;
    zombie.velocityX = -(6 +1*score/10);

    zombie.debug=true
    zombie.setCollider("rectangle",0,0,400,950)

    zombie.lifetime=500
    zombiesGroup.add(zombie)
  }
}
