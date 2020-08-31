//Create variables here
var dog;
var milk;
var database;
var foodStock;
var foodS = 20;
var gameState;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
  }

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,30,30);
  dog.addImage(dogImg2);
  milk = createSprite(150,250,1,1)
  dog.scale = 0.4;
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
    fill("blue");
    textSize(15);
    stroke('yellow');
    strokeWeight(1);
  text("YOUR DOG IS HUNGRY.FEED IT",100,20);
  text("Note:Press UP_ARROW key To Feed Drago Milk",50,40);
      if(keyWentUp(UP_ARROW)){
      WriteStock(foodS);
      foodS = foodS - 1;
      dog.addImage(dogImg);
  }
  if(keyWentDown(UP_ARROW)){
      dog.addImage(dogImg2);
  }


  
  drawSprites();
  //add styles here
  fill("yellow");
  textSize(15);
  text("food remaining : "+foodS,50,80);
    if(foodS<1){
    fill("blue");
    textSize(20);
   text("yay!Drago is happy",150,440);
   text("(press the spacebar to play again)",100,470);
   foodS = 0;
   dog.addImage(dogImg);
}
  }

function readStock(data)
{
   foodS-data.val();
}
function WriteStock(x){

if(x<=0){
  x = 0;
}
else{
  x=x-1
}

database.ref('/').update({
  Food:x
})

}
function keyPressed(){
if(keyCode === 32){
  fill("yellow");
  textSize(15);
  text("hi",470,300);
   foodS = 20;
   dog.addImage(dogImg2);
  }
}



