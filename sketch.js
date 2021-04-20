//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruitGroup,monsterGroup,gameOver;
var knifeImage,fruit1,fruit2,fruit3,fruit4,monster1,monster2,knifeSwooshSound ,gameoverSound,gameOverImg;


function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1= loadImage("fruit1.png");
  fruit2= loadImage("fruit2.png");
  fruit3= loadImage("fruit3.png");
  fruit4= loadImage("fruit4.png");
  monster1= loadImage("alien1.png");
  monster2= loadImage("alien2.png");
  knifeSwooshSound= loadSound("knifeSwoosh.mp3");
  gameoverSound= loadSound("gameover.mp3");
  gameOverImg= loadImage("gameover.png");
}



function setup() {
  createCanvas(600, 600);
   
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  fruitGroup=createGroup();
  monsterGroup= createGroup();
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
}

function draw() {
  background("lightblue")
  
  gameOver= createSprite(300,300,20,10);
  gameOver.addImage(gameOverImg);
  
  
  if(gameState===PLAY){
    gameOver.visible= false;
    //calling fruit and monster function
       fruits();
      monsters();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
             
     // Increase score if knife touching fruit
     if(fruitGroup.isTouching(knife)){
     fruitGroup.destroyEach();
     knifeSwooshSound.play();
     score= score+5;
   }

    
    // Go to end state if knife touching enemy
      if(monsterGroup.isTouching(knife)){
        monsterGroup.destroyEach();
         gameoverSound.play();
        gameState= END;
      }
          
  }
  
  if(gameState===END){
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.velocityX=0;
        monsterGroup.velocityX=0;
        knife.velocityEach=0;
       gameOver. visible= true;
  }
  
  
   

  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}



function fruits(){
  if(World.frameCount%80===0){
     fruit= createSprite(400,200,20,20);
     fruit.scale=0.2;
     var rand= Math.round(random(1,4));
    
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
    
    fruit.y= Math.round(random(50,340));
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
  
   
}

function monsters(){
  if(World.frameCount%70===0){
     monster= createSprite(400,200,20,20);
     r= Math.round(random(1,2));
     
    if(r==1){
      monster.addImage(monster1);
    }
    else{
      monster.addImage(monster2);
    }
    monster.y= Math.round(random(60,350));
    monster.velocityX=-7;
    monster.setLifetime=100;
    monsterGroup.add(monster);
  }
  
   
}
