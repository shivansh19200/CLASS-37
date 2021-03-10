class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", (data)=>{
            gameState = data.val();
        })
    }

    updateState(state){
        database.ref('/').update({
            gameState: state
        });
    }

    async start(){

        if(gameState == 0){
            player = new Player();
            var pcRef = await database.ref('playerCount').once("value");
            if (pcRef.exists()) {
                playerCount = pcRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }

        car1 = createSprite(100,200,50,50);
        car2 = createSprite(300,200,50,50);
        car3 = createSprite(500,200,50,50);
        car4 = createSprite(700,200, 50,50);

        passed = false;

        cars = [car1, car2, car3, car4];
    }

    play(){
        form.hide();

        Player.getPlayerInfo();
        player.getFinishedPlayers();

        if(allPlayers != undefined){
            background(0);

            //Index of the array, xPos and yPos of the cars
            var index = 0;
            var xPos = 175;
            var yPos;

            for (let plr in allPlayers) {

                //Adding 1 to index for every loop
                index += 1;
                //Positioning cars at a fixed distance from each other
                xPos += 200;

                //Using database to get the yPos for all the cars
                yPos = displayHeight - allPlayers[plr].distance;
                cars[index -1].x = xPos;
                cars[index - 1].y = yPos;

                if (index == player.index) {
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index -1].y;
                    fill("blue");
                    ellipse(xPos, yPos, 60, 60);
                }
                textAlign(CENTER);
                textSize(32);
                fill("pink");
                stroke("lightgreen");
                text(allPlayers[plr].name, cars[index-1].x , cars[index-1].y +75);

            }
        }

        if (keyIsDown(UP_ARROW) && player.index != null && passed != true) {
            player.distance = player.distance + 10;
            console.log(player.distance);
            player.update();
        }

        if (player.distance > 500 && passed == false) {
            Player.updateFinishedPlayers();
            player.rank = finishedPlayers;
            player.update();
            passed = true;
        }

        drawSprites();
    }

    setRank(){

    }


}