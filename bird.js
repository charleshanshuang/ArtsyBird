Bird = function(game, jumpSound, mainState) {
    this.game = game;
    this.sprite = null;
    this.jumpSound = jumpSound;
    this.tweenPositive = true;
    this.mainState = mainState;
};

Bird.prototype = {
    preload: function() {
        // Load the bird sprite
        this.loadBirdImage();
    },
    
    loadBirdImage: function() {
        var birdPath = 'assets/bird/';

        switch (birdImage)
        {
            case "1":
            case "2":
            case "4":
                birdPath += birdImage + ".png";
                break;
            case "9":
                birdPath += birdImage + ".gif";
                break;
            default: // 'bird'
                birdPath += birdImage + ".jpg";
                break;
        }

        this.game.load.image("bird", birdPath); 
    },
    
    create: function() {
        this.isAlive = true;
        
        // Display the bird on the screen
        this.sprite = this.game.add.sprite(100, 245, "bird");
        this.sprite.height = 50;
        this.sprite.width = 50;
        this.sprite.angle = 20;
        this.sprite.pivot.x = this.sprite.width / 2;
        this.sprite.pivot.y = this.sprite.height / 2;
        
        // Add gravity to the bird to make it fall
        this.game.physics.arcade.enable(this.sprite);
        
        // New anchor position
        this.sprite.anchor.setTo(-0.2, 0.5); 
    },
    
    start: function() {
        this.sprite.body.gravity.y = 1000;
    },
    
    
    update: function(game, pipes) {
        if (!this.mainState.hasStarted)
        {
            if (this.tweenPositive)
            {
                this.sprite.angle += 1;
                
                if (this.sprite.angle >= 20)
                {
                    this.tweenPositive = false;
                }
            }
            else
            {
                this.sprite.angle -= 1;
                
                if (this.sprite.angle <=  -20)
                {
                    this.tweenPositive = true;
                }
            }
        }
        else
        {
            if (this.isAlive === true)
            {
                if (this.sprite.angle < 20)  
                    this.sprite.angle += 1;

                game.physics.arcade.overlap(this.sprite, pipes.pipes, this.killBird, null, this); 
            }
        }
    },
    
    killBird: function() {
        this.isAlive = false;  
    },
    
    jump: function() {
        // Make the bird jump 
        if (this.isAlive === true)
        {
            // If the bird is dead, he can't jump
            if (this.isAlive == false)
                return; 
            
            // Add a vertical velocity to the bird
            this.sprite.body.velocity.y = -350;

            // Jump animation
            game.add.tween(this.sprite).to({angle: -20}, 100).start();
            
            this.jumpSound.play();
        }
        
    }
};