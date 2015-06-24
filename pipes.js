Pipes = function(game) {
    this.game = game;
};

Pipes.prototype = {
    preload: function() {
        // Load the bird sprite
        this.loadPipeImage(); 
    },
    
    loadPipeImage: function() {
        var pipePath = 'assets/pipe/';

        switch (pipeImage)
        {
            case "1":
            case "3":
                pipePath += pipeImage + ".png";
                break;
            default: 
                pipePath += pipeImage + ".jpg";
                break;
        }
        
        game.load.image("pipe", pipePath); 
    },
    
    create: function() {
        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, "pipe");
    },
    
    hitPipe: function() {
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },
    
    addRowOfPipes: function() {
        var holeWidth = 2;
        
        // 1 - 6, from range of 0-7
        var hole = Math.floor(Math.random()* (8 - holeWidth - 1))+1;

        
        for (var i = 0; i < 8; i++)
            if (i < hole || i > hole + holeWidth - 1 ) 
                this.addOnePipe(400, i*60+10);
    },
    
    addOnePipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.width = 60;
        pipe.height = 60;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
};