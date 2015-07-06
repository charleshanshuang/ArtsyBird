var screenWidth = 500;
var screenHeight = 500;

var newAssetLoad = true;
var pipeImage;
var birdImage;
var bgImage;

var mainState = {

    init: function() {
        this.input.maxPointers = 1;
        
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(500, 500, 500, 500);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(500, 500, 500, 500);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(false, true);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    
    },
    
    gameResized: function (width, height) {
    },
    
    enterIncorrectOrientation: function () {

        this.game.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        this.game.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    },
    
    chooseAssets: function() {
        pipeImage = getRandomFromRange(1, 5).toString();

        birdImage = getRandomFromRange(1, 9).toString();
        
        bgImage = getRandomFromRange(1, 17).toString();
    },
    
    preload: function() { 
        if (newAssetLoad) {
            this.chooseAssets();
            this.background = new Background(this.game);
            this.background.preload();
            
            // Load the jump sound
            game.load.audio('jump', 'assets/jump.wav');

            // Add the jump sound
            this.jumpSound = this.game.add.audio('jump');
            
            this.bird = new Bird(this.game, this.jumpSound, this);
            this.bird.preload();
            
            this.pipes = new Pipes(this.game);
            this.pipes.preload();

            this.title = getTitle();
            
            newAssetLoad = false;
        }
        
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
        
        this.game.input.onDown.add(this.jump, this);
        
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  

        this.labelTitle = this.game.add.text(screenWidth / 2, screenHeight - 20, this.title, { font: "30px Arial", fill: "#ffffff" });
        setTitleFormat(this.labelTitle);
        this.labelTitle.anchor.set(0.5);
        this.labelTitle.stroke = "#000000";
        this.labelTitle.strokeThickness = 6;
        this.labelTitle.shadowColor = "#000009";
        this.labelTitle.shadowOffsetX = 5;
        this.labelTitle.shadowOffsetY = 5;
        
        
        
        this.firstPipe = true;
    },

    update: function() {
        if (this.bird.sprite.inWorld == false)
        {
            this.restartGame(); 
        }
        
        this.bird.update(game, this.pipes);
        
        this.background.update();
    },

    jump: function() {
        if (!this.hasStarted)
        {
            this.bird.start();
            this.background.start();
            this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
            this.hasStarted = true;
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

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);  
game.state.start('main'); 