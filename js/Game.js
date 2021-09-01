class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage("car1",player1_img);
    player1.scale=1.5;
    player1.setCollider("rectangle",0,0,10,40);
    player2 = createSprite(300,200);
    player2.addImage("car2",player2_img);
    player3 = createSprite(500,200);
    player3.addImage("car3",player3_img);
    player4 = createSprite(700,200);
    player4.addImage("car4",player4_img);
    players = [player1, player2, player3, player4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
     player.getCarAtEnd()
    if(allPlayers !== undefined){
      background(72,72,72);
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y;
          fill("yellow");
          textSize(23);
          text(allPlayers[plr].name, x - 45, y + 130);
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown("A") && player.index !== null){
      console.log("LeftArrow");
      players[index-1].x -=10 
      //player.update();
    }
    if(keyIsDown("D") && player.index !==null){
      console.log("LeftArrow");
      players[index-1].x +=10
      //player.update();
    }
  

    if(player.distance > 3500){
      gameState = 2;
      player.rank+=1
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }
}
