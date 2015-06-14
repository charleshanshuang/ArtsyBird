var screenWidth = 500;
var screenHeight = 500;

var newAssetLoad = true;
var pipeImage;
var birdImage;
var bgImage;

var mainState = {

    chooseAssets: function() {
        // Image names
        // --Pipes
        var pipeImages = [
            'pipe',
            'prison'
        ];

        pipeImage = getRandomFromArray(pipeImages);

        // -- Bird
        var birdImages = [
            'bird',
            'dao',
            'dollar',
            'clock',
            'heart'
        ];

        birdImage = getRandomFromArray(birdImages);


        // -- Background
        var bgImages = [
            'sky',
            'rose',
            'market',
            'persistence-of-memory'
        ];

        bgImage = getRandomFromArray(bgImages);
    },
    
    preload: function() { 
        if (newAssetLoad) {
            this.chooseAssets();
            newAssetLoad = false;
        }
        
        this.background = new Background(this.game);
        this.background.preload(); 

        this.pipes = new Pipes(this.game);
        this.pipes.preload();
        
        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav');
        
        // Add the jump sound
        this.jumpSound = this.game.add.audio('jump');
        
        this.bird = new Bird(this.game, this.jumpSound);
        this.bird.preload();
     
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Pause the action, wait for player to jump first
        this.hasStarted = false;

        this.background.create();
        this.bird.create();
        this.pipes.create();

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
               
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  

        this.firstPipe = true;
    },

    update: function() {
        if (this.bird.sprite.inWorld == false)
        {
            this.restartGame(); 
        }
        
        this.bird.update(game, this.pipes);
    },

    jump: function() {
        if (!this.hasStarted)
        {
            this.bird.start();
            this.background.start();
            this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
            this.hasStarted = true;
            return;
        }
        
        this.bird.jump();
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;
            
        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);
    
        // Go through all the pipes, and stop their movement
        this.pipes.hitPipe();
    },

    restartGame: function() {
        game.state.start('main');
    },

    addRowOfPipes: function() {
        this.pipes.addRowOfPipes();
        
        if (this.firstPipe)
        {
            this.firstPipe = false;
        }
        else
        {
            this.score += 1;
        }
        this.labelScore.text = this.score;  
    },
};

var titleElement = document.getElementById("title");
titleElement.innerHTML = getTitle();
setTitleFormat(titleElement);
var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);  
game.state.start('main'); 