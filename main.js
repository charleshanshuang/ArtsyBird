var title = 'The [X] of [Y]';


function getRandomFromArray(array){
    var randIndex = Math.floor(Math.random() * array.length);
    return array[randIndex];
}

        

var screenWidth = 500;
var screenHeight = 500;

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, 'gameDiv');

// Image names
// --Pipes
var pipeImages = [
    'pipe',
    'prison'
];

var pipeImage = getRandomFromArray(pipeImages);

// -- Bird
var birdImages = [
    'bird',
    'dao',
    'dollar',
    'clock',
    'heart'
];

var birdImage = getRandomFromArray(birdImages);


// -- Background
var bgImages = [
    'sky',
    'rose',
    'market',
    'persistence-of-memory'
];

var bgImage = getRandomFromArray(bgImages);


var mainState = {

    preload: function() { 
        game.stage.backgroundColor = '#71c5cf';

        this.loadBGImages();

        this.loadBirdImage();

        this.loadPipeImage();


        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav');     
    },

    loadBGImages: function() {
        var bgPath = 'assets/background/';

        switch (bgImage)
        {
            case 'rose':
                bgPath += 'rose.png';
                break;
            case 'market':
                bgPath += 'stockmarket.jpg';
                break;
            case 'persistence-of-memory':
                bgPath += 'persistence-of-memory.jpg';
                break;
            default: // 'sky'
                bgPath = '';
                break;
        }

        if (bgImage != 'sky')
        {
           game.load.image(bgImage, bgPath);
        }  
    },

    loadBirdImage: function() {
        var birdPath = 'assets/bird/';

        switch (birdImage)
        {
            case 'dao':
                birdPath += 'taiji.jpg';
                break;
            case 'dollar':
                birdPath += 'dollar.jpg';
                break;
            case 'clock':
                birdPath += 'clock.png';
                break;
            case 'heart':
                birdPath += 'heart.png';
                break;
            default: // 'bird'
                birdPath += 'bird.png';
                break;
        }

        game.load.image(birdImage, birdPath); 
    },

    loadPipeImage: function() {
        var pipePath = 'assets/pipe/';

        switch (pipeImage)
        {
            case 'prison':
                pipePath += 'prison-bars.jpg'
                break;
            case 'pipe':
                pipePath += 'pipe.png';
                break;
            default: // 'pipe'
                pipePath += 'pipe.png';
                break;
        }

        game.load.image(pipeImage, pipePath); 
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Pause the action, wait for player to jump first
        this.hasStarted = false;

        if (bgImage != 'sky')
        {
            this.background = this.game.add.sprite(0, 0, bgImage);
            this.background.width = screenWidth;
            this.background.height = screenHeight;
        }

        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, pipeImage);             

        this.bird = this.game.add.sprite(100, 245, birdImage);
        this.bird.height = 50;
        this.bird.width = 50;
        game.physics.arcade.enable(this.bird); 

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5); 
 
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
               

        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  

        this.firstPipe = true;
        
        // Add the jump sound
        this.jumpSound = this.game.add.audio('jump');
    },

    update: function() {
        if (this.bird.inWorld == false)
            this.restartGame(); 

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this); 

        // Slowly rotate the bird downward, up to a certain point.
        if (this.bird.angle < 20)
            this.bird.angle += 1;     
    },

    jump: function() {
        if (!this.hasStarted)
        {
            this.bird.body.gravity.y = 1000;
            this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
            this.hasStarted = true; 
        }

        // If the bird is dead, he can't jump
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.bird).to({angle: -20}, 100).start();

        // Play sound
        this.jumpSound.play();
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
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function() {
        game.state.start('main');
    },

    addOnePipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;  
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },


    addRowOfPipes: function() {
        var holeWidth = 2;
        
        // 1 - 6, from range of 0-7
        var hole = Math.floor(Math.random()* (8 - holeWidth - 1))+1;

        
        for (var i = 0; i < 8; i++)
            if (i < hole || i > hole + holeWidth - 1 ) 
                this.addOnePipe(400, i*60+10);   
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

game.state.add('main', mainState);  
game.state.start('main'); 



var titleXList = [
'Failure',
'Ambition',
'Folly',
'Consequences',
'Arrogance',
'Audacity',
'Humility',
'Hopelessness'
];

var titleYList = [
'Meaning',
'Humanity',
'Existence',
'Peace',
'Creativity',
'Creation'
];

var fontWeightList = [
'lighter',
'bolder'
];

var fontStyleList = [
'normal',
'italic',
'oblique'
];

var fontFamilyList = [
'Impact',
'Lucida Sans Unicode',
'Courier New',
'Helvetica',
'Book Antiqua'
];

title = title.replace('[X]', getRandomFromArray(titleXList));
title = title.replace('[Y]', getRandomFromArray(titleYList));

var titleElement = document.getElementById("title");

titleElement.innerHTML = title;

titleElement.style.fontWeight = getRandomFromArray(fontWeightList);
titleElement.style.fontStyle = getRandomFromArray(fontStyleList);
titleElement.style.fontFamily = getRandomFromArray(fontFamilyList);