var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var players, player1,player2,player3,player4

var track, player1_img, player2_img, player3_img, player4_img;

function preload(){
  track = loadImage("../images/track.jpg");
  player1_img = loadImage("../images/girl-chasing-the-robber (1).png");
  player2_img = loadImage("../images/Jake-chasing-the-robber (1).png");
  player3_img = loadImage("../images/jake-red (1).png");
  player4_img = loadImage("../images/Tricky-chasing-the-robber (1).png");
  obstacle1_img = loadImage("../images/obstacle (1).png")
  obstacle2_img = loadImage("../images/obstacle2 (1).png")
  obstacle2_img = loadImage("../images/obstacle3 (1).png")
  ground = loadImage("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}