define(function (require) {
    function test() {

        Crafty.init(600, 300);
        Crafty.background('rgb(127,127,127)');
        //Paddles
        Crafty.e('Paddle, 2D, DOM, Color, Multiway')
            .color('rgb(255,0,0)')
            .attr({ x: 20, y: 100, w: 10, h: 100 })
            .multiway(4, { W: -90, S: 90 });
        Crafty.e("Paddle, 2D, DOM, Color, Multiway")
            .color('rgb(0,255,0)')
            .attr({ x: 580, y: 100, w: 10, h: 100 })
            .multiway(4, { UP_ARROW: -90, DOWN_ARROW: 90 });
        //Ball
        Crafty.e("2D, DOM, Color, Collision")
            .color('rgb(0,0,255)')
            .attr({ x: 300, y: 150, w: 10, h: 10,
                    dX: Crafty.math.randomInt(2, 5),
                    dY: Crafty.math.randomInt(2, 5) })
            .bind('EnterFrame', function () {
                //hit floor or roof
                if (this.y <= 0 || this.y >= 290)
                    this.dY *= -1;

                if (this.x > 600) {
                    this.x = 300;
                    Crafty("LeftPoints").each(function () {
                        this.text(++this.points + " Points") });
                }
                if (this.x < 10) {
                    this.x = 300;
                    Crafty("RightPoints").each(function () {
                        this.text(++this.points + " Points") });
                }

                this.x += this.dX;
                this.y += this.dY;
            })
            .onHit('Paddle', function () {
            this.dX *= -1;
        })

        //Score boards
        Crafty.e("LeftPoints, DOM, 2D, Text")
            .attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
            .text("0 Points");
        Crafty.e("RightPoints, DOM, 2D, Text")
            .attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
            .text("0 Points");
    }

    var conf = require('common/conf');

    function init() {
        Crafty.init(conf.display.width, conf.display.height,  T.g('main'));

        Crafty.sprite(16, IMG_SPRITES, {
            grass1: [0,0],
            grass2: [1,0],
            grass3: [2,0],
            grass4: [3,0],
            flower: [0,1],
            bush1: [0,2],
            bush2: [1,2],
            player: [0,3]
        });

        loadingScene();
        mainScene();

        Crafty.scene("loading");
        
    }

    function loadingScene() {
        Crafty.scene('loading', function() {
            //load takes an array of assets and a callback when complete
            Crafty.load([IMG_SPRITES], function() {
                Crafty.scene('main'); //when everything is loaded, run the main scene
            });
            
            //black background with some loading text
            Crafty.background('#000');
            Crafty.e('2D, DOM, Text').attr({w: 100, h: 20, x: 150, y: 120})
                .text('Loading')
                .css({'text-align': 'center'});
        });

    }

    function mainScene() {
        var GRID = 16;

        Crafty.scene("main", function() {
            for(var i = 0; i < conf.display.width / GRID ; i++) {
                //generate the grass along the y-axis
                for(var j = 0; j < conf.display.height / GRID; j++) {
                    var grassType = Math.round(Crafty.math.randomNumber(1, 4));
                    Crafty.e("2D, Canvas, SpriteAnimation, grass" + grassType)
                        .attr({x: i * 16, y: j * 16});
                    
                }
            }
        });
    }

    function addFlower(x, y) {
        Crafty.e("2D, Canvas, SpriteAnimation, flower").attr({
            x: x,
            y: y
        });
    }

    function addBuilding(x, y, w, h) {
        Crafty.e('building, 2D, DOM, Color')
            .color('gray').attr({
                x: x, y: y, w: w, h: h
            });
    }

    return {
        init: init,
        addFlower: addFlower,
        addBuilding: addBuilding
    };
});