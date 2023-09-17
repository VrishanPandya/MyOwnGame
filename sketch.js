
var PLAY=1;
var END=0;
var gameState=1;

var Sword,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit,backround, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh,SwordClank,gameComplete;

function preload(){
  
    SwordImage = loadImage("Katana.png");
    SwordSlash = loadImage("Lightning Katana.png")
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("Enemy 1.png");
  fruit2 = loadImage("Enemy 2.png");
  fruit3 = loadImage("Enemy 1.png");
  fruit4 = loadImage("Enemy 2.png");
  upgrade1 = loadImage("Thunder Upgrade.png");
  Mute  = loadImage("AudioOff.png");
  UnMute = loadImage("AudioOn.png");
  //JungleImage = loadImage("Jungle.jpg");

  gameOverImage = loadImage("gameover.png");

  gameComplete = loadSound("GameComplete.wav");
  gameOverSound = loadSound("GameOver.wav");
  SwordClank = loadSound("SwordClank.wav");
  backroundMusic = loadSound("FastMix-2022-02-04_-_War_Crown_-_www.FesliyanStudios.com_.mp3")
}



function setup() {
  createCanvas(600, 600);
  backroundMusic.play();
  backroundMusic.setVolume(0.5);
  
  //creating sword
   Sword=createSprite(40,200,20,20);
   Sword.x=300;
   Sword.y=300;
   Sword.addImage("Wooden",SwordImage);
   Sword.scale=0.2;
   Sword.addAnimation("Lightning",SwordSlash);
   /*MuteButton2=createImg("AudioOn.png");
   MuteButton2.position(450,20);
   MuteButton2.size(70,70);
   MuteButton2.mouseClicked(mute);*/
   //button2.createSprite(450,50,20,20)


  //set collider for sword
  Sword.setCollider("rectangle",0,0,50,50);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  upgradeGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  MuteButton();
  
  if(gameState===PLAY){

   
    
    //Call fruits and Monster function
    fruits();
    Monster();
    //MuteButton();
    
    
    // Move sword with mouse
    //Sword.y=World.mouseY;
    //Sword.x=World.mouseX;
    

    //W
    if(keyIsDown(87)){
      Sword.y=Sword.y-5;
    }
    //A
    if(keyIsDown(65)){
      Sword.x=Sword.x-5;
    }
    //S
    if(keyIsDown(83)){
      Sword.y=Sword.y+5;
    }
    //D
    if(keyIsDown(68)){
      Sword.x=Sword.x+5;
    }
  
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(Sword)){
      //Sword.changeAnimation("Lightning",SwordSlash);
      
      
      fruitGroup.destroyEach();
      
       SwordClank.play();
      // knifeSwooshSound.play;
      // knifeSwooshSound();
      // knifeSwooshSoundplay();


      // score=score;
      // score=+2;
      // score=2;
       score=score+2;

    }
    else
    {
      setTimeout(1500);
      Sword.changeAnimation("Wooden",SwordImage);
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(Sword)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        Sword.addImage(gameOverImage);
        Sword.scale=2;
        Sword.x=300;
        Sword.y=300;
      }
      }
    }

  if(score === 10){
 gameState=END;   
gameComplete.play();
score=score+1;

fruitGroup.destroyEach();
monsterGroup.destroyEach();
fruitGroup.setVelocityXEach(0);
monsterGroup.setVelocityXEach(0);

  }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,10,50);

  textSize(20);
text("Hold Esc To Mute Bg Audio",150,50);
}


function MuteButton(){
  //if(gameState === PLAY);
button1=createSprite(450,50,20,20);
button1.addAnimation("Ritu",UnMute);
button1.addAnimation("Vrishan",Mute);
button1.scale=0.05;
 if(keyIsDown(27)){
  mute();
 }
}








function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  //Increase the velocity of fruit after score 4 

       fruit.velocityX= (7+(score/4));
      // fruit.velocityY= (7+(score));
      // fruit.velocity= (7+(score/4));
      // fruit.velocityX= (7);
     
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}



function mute(){
  if(backroundMusic.isPlaying()){
    button1.changeAnimation("Vrishan",Mute);
    backroundMusic.stop();
    
  }
  else{
    backroundMusic.play();
    button1.changeAnimation("Ritu",UnMute);

  }

}







