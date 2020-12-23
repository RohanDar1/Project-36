
var dogimg, happyimg;
var database;
var dog, happydog, foodS, foodStock;
var food1;
var feed, add;
var lastFed;

function preload()
{
  dogimg = loadImage("images/dogImg.png")
  happyimg = loadImage("images/dogImg1.png")
 


}

function setup() {

	createCanvas(1000, 400);
  database = firebase.database();

  dog = createSprite(500, 250, 50, 50)
  dog.addImage(dogimg);
  dog.scale=0.2

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

feed = createButton ("Feed Drago");
feed.position(700, 95);
feed.mousePressed(feedDog)

add=createButton("Add Food");
add.position(800, 95);
add.mousePressed(addFoods)

food1 = new Food

  

}


function draw() {  

  background ("yellow")


text ("Food Remaining: "+foodS, 150, 100)
text("Note: Press Left Arrow to Feed Drago", 150, 400)

fill (255, 255, 254);
textSize(15);

database.ref('FeedTime').on("value", function(data){lastFed=data.val()})

if (lastFed>=12){
  text ("Last Feed: "+lastFed%12+" P.M.", 350, 30)
}
else if(lastFed==0){
  text ("Last Feed: 12 A.M.", 350, 30)
}
else {
  text ("Last Feed: "+lastFed%12+" A.M.", 350, 30)
}

drawSprites();

food1.display();
}



function readStock(data)
{
foodS = data.val();
food1.updateFoodStock(foodS);
}

/*function writeStock(x){

  if (x<=0){
    x=0
  }
  else {
    x=x-1
  }
  database.ref('/').update({

    Food:x
  })
}*/

function feedDog(){
  dog.addImage(happyimg)
//food1.deductFood();
food1.updateFoodStock(food1.getFoodStock()-1);
database.ref('/').update({
Food:food1.getFoodStock(),
FeedTime:hour()
})
}

function addFoods(){
foodS++;
database.ref('/').update({
Food:foodS
})
}