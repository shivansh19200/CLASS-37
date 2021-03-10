var database;
var gameState = 0 ;
var playerCount;
var car1, car2, car3, car4;
var cars;
var passed;
var allPlayers;
var finishedPlayers = 0;
var form, player, game;

function setup(){
    createCanvas(displayWidth - 20 , displayHeight);
    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background(0);

    if (playerCount == 4 && finishedPlayers == 0) {
        game.updateState(1);
    }

    if(gameState == 1){
        game.play();
    }

    if (finishedPlayers == 4) {
        game.updateState(2);
    }

    if (gameState == 2 && finishedPlayers == 4) {
        game.setRank();
    }
}