Bird = function(game, jumpSound) {
    this.game = game;
    this.sprite = null;
    this.isAlive = true;
    this.jumpSound = jumpSound;
    this.tweenPositive = true;
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

        this.game.load.image(birdImage, birdPath); 
    },
    
    create: function() {
        // Display the bird on the screen
        this.sprite = this.game.add.sprite(100, 245, birdImage);
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
        if (!game.hasStarted)
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
            // Add a vertical velocity to the bird
            this.sprite.body.velocity.y = -350;
            
            // If the bird is dead, he can't jump
            if (this.isAlive == false)
                return; 

            this.sprite.body.velocity.y = -350;

            // Jump animation
            game.add.tween(this.sprite).to({angle: -20}, 100).start();
            
            this.jumpSound.play();
        }
        
    }
};