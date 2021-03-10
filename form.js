class Form {
    constructor(){
        this.title = createElement('h1');
        this.greeting = createElement('h2');
        this.playButton = createButton("Play")
        this.resetButton = createButton("Reset");
        this.Input = createInput("Name");
    }

    hide(){
        this.title.hide();
        this.greeting.hide();
        this.playButton.hide();
        this.Input.hide();
    }

    display(){
        this.title.html("CAR RACING GAME");
        this.title.position(displayWidth/2 - 100 , 50);
        this.Input.position(displayWidth/2 - 100 , displayHeight/2 - 100);
        this.playButton.position(displayWidth/2 - 100 , displayHeight/2 - 50);
        this.resetButton.position(displayWidth - 200 , 30);

        this.playButton.mousePressed(()=>{
            this.Input.hide();
            this.playButton.hide();
            player.name = this.Input.value();
            playerCount ++;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html('WELCOME '+ player.name+ ' !');
            this.greeting.position(displayWidth/2 - 100 , displayHeight/2);
        })

        this.resetButton.mousePressed(()=>{
            player.updateCount(0);
            game.updateState(0);
            database.ref('/').update({
                players: null,
                finishedPlayers: 0
            })
        })
    }
}