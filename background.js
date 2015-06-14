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
           this.game.load.image(bgImage, bgPath);
        }  
    },

    create: function() {
        if (bgImage != 'sky')
        {
            this.sprite = this.game.add.sprite(0, 0, bgImage);
            this.sprite.width = screenWidth * 3;
            this.sprite.height = screenHeight * 3;
            
            this.sprite.y = getRandomFromRange(-(this.sprite.height - screenHeight), this.sprite.height - screenHeight);
        }
        else
        {
            this.game.stage.backgroundColor = '#71c5cf';
        }
    },
    
    start: function() {
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.velocity.x = -10;
    }
};