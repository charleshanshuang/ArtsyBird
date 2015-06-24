Background = function(game) {
    this.game = game;
};

Background.prototype = {
    preload: function() {
        this.loadBGImage();
    },
    
    loadBGImage: function() {
        var bgPath = 'assets/background/';

        switch (bgImage)
        {
            case "1":
                bgPath += bgImage.toString() + ".png";
                break;
            default: 
                bgPath += bgImage.toString() + ".jpg";
                break;
        }

        this.game.load.image("background", bgPath);  
    },

    create: function() {
        this.sprite = this.game.add.sprite(0, 0, "background");
        this.sprite.width = screenWidth * 3;
        this.sprite.height = screenHeight * 3;

        this.sprite.y = getRandomFromRange(-(this.sprite.height - screenHeight), this.sprite.height - screenHeight);
    },
    
    start: function() {
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.velocity.x = -10;
    },
    
    update: function() {
        if (this.sprite.x <= -(this.sprite.width - screenWidth)) //this.sprite.width - screenWidth)
        {
            this.tweenBack();
        }
    },
    
    tweenBack: function() {
        game.add.tween(this.sprite).to({x: 0}, 1000).start();
    }
};