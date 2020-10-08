document.addEventListener('DOMContentLoaded',()=>{    
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 150
        },
        stick2 :{
            right: 0,
            top : 150
        },
        ball2: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        }
    };

    var CONSTS = {
    	gameSpeed: 20,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0
    };

    function start() {
        draw();
        setEvents();
        roll();
        loop();
    }
    function start1cpu() {
        CONSTS.stick2Speed = 2.5;
        draw();
        setEvent1cpu();
        rollforcpu();
        loop();
    }

    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick))
        .appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick))
        .appendTo('#pong-game');
    }

    function setEvents() {
        $(document).on('keydown', function (e) {
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 4.2;
            }
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 4.2;
            }
        });
        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = -4.2;
            }
            if (e.keyCode == 38) {
                
                CONSTS.stick2Speed = -4.2;
      
                
            }
        });
    }
    function setEvent1cpu() {
        $(document).on('keydown', function (e) {
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 4.2;
            }
       
        });
        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = -4.2;
            }
  
        });
    }


    function loop() {
        window.pongLoop = setInterval(function () {
            CSS.stick1.top += CONSTS.stick1Speed;
            CSS.stick2.top += CONSTS.stick2Speed;
            $('#stick-1').css('top', CSS.stick1.top);
            $('#stick-2').css('top', CSS.stick2.top);

            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left += CONSTS.ballLeftSpeed;
            //stick1  border control
            if (CSS.stick1.top <= 0 ||
                CSS.stick1.top >= CSS.arena.height - CSS.stick1.height) {
                CONSTS.stick1Speed = CONSTS.stick1Speed * -1;

            }

            //stick2  border control
            if (CSS.stick2.top <= 0 ||
                CSS.stick2.top >= CSS.arena.height - CSS.stick2.height) {
                CONSTS.stick2Speed = CONSTS.stick2Speed * -1;
            }


            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
                
            }


            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

            //stick1 hit
            if (CSS.ball.left <= CSS.stick.width && CSS.ball.left<=(CSS.arena.width/2)) {
                //roll();
                CSS.ball.top >= CSS.stick1.top && CSS.ball.top <= CSS.stick1.top + CSS.stick1.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1);
                //CSS.ball.top > CSS.stick2.top && CSS.ball.top < CSS.stick2.top + CSS.stick2.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1);
            }
            //stick2 hit
             if (CSS.stick2.top + CSS.stick2.height >= CSS.ball.top && CSS.ball.left>=(CSS.arena.width/2) && CSS.ball.left <= 890 && CSS.ball.left >= 870 ){
                
                CSS.ball.top >= CSS.stick2.top && CSS.ball.top <= CSS.stick1.top + CSS.stick2.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1);
                //CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1
            }


            

            if (CSS.ball.left >= 890) {
                CONSTS.score1=CONSTS.score1+1;
                console.log("Stick1 score..."+CONSTS.score1)
                var score1 = document.getElementById("score1-p");
                score1.innerText=  CONSTS.score1 ;
                 roll();
                if (CONSTS.score1==5) {
                    score1=5;
                    alert("Player 1 is WON....")
                    $( "div" ).remove( "#pong-ball");
                    CSS.ball.top = 250;
                    CSS.ball.left = 350;

                    CONSTS.ballTopSpeed = 0;
                    CONSTS.ballLeftSpeed = 0;
                    //freeze sticks
                    CONSTS.stick1Speed = 0;
                    CONSTS.stick2Speed = 0;
                
                }
               
            }
            if (CSS.ball.left < 8 ){
                CONSTS.score2=CONSTS.score2+1;
                console.log("Player 2 score..."+CONSTS.score2);
                var score2 = document.getElementById("score2-p");
                score2.innerText=  CONSTS.score2 ;
                roll();
                if (CONSTS.score2==5) {
                    score2=5;
                    alert("Player 2 or CPU is WON....")
                    $( "div" ).remove( "#pong-ball");
                    CSS.ball.top = 250;
                    CSS.ball.left = 350;

                    CONSTS.ballTopSpeed = 0;
                    CONSTS.ballLeftSpeed = 0;
                    //freeze sticks
                    CONSTS.stick1Speed = 0;
                    CONSTS.stick2Speed = 0;
                
                }
            }
            $(document).on('newball', function (e) {
                if (e.keyCode == 32) {
                    $('<div/>', {id: 'pong-ball2'}).css(CSS.ball).appendTo('#pong-game');
                    $('#pong-ball2').css({top: CSS.ball2.top,left: CSS.ball.left});
                    CSS.ball.top += CONSTS.ballTopSpeed;
                    CSS.ball.left += CONSTS.ballLeftSpeed;
                    roll2();
                }
            
            });
          
        }, CONSTS.gameSpeed);
    }

    function roll() {
        CSS.ball.top = 250;
        CSS.ball.left = 350;

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -1 - 2.5;
        CONSTS.ballLeftSpeed = side * (Math.random() * 1 + 2.5);
        //CSS.ball.left = CSS.ball.left * 1.3; 
    }
    function roll2() {
        CSS.ball2.top = 250;
        CSS.ball2.left = 350;

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -1 - 2.5;
        CONSTS.ballLeftSpeed = side * (Math.random() * 1 + 2.5);
        //CSS.ball.left = CSS.ball.left * 1.3; 
    }
    function rollforcpu() {
        CSS.ball.top = 250;
        CSS.ball.left = 350;

        var side = -1;


        CONSTS.ballTopSpeed = Math.random() * -1 - 2.5;
        CONSTS.ballLeftSpeed = side * (Math.random() * 1 + 2.5);
        //CSS.ball.left = CSS.ball.left * 1.3; 
    }


    document.getElementById("start").addEventListener('click', start);
    document.getElementById("start1cpu").addEventListener('click', start1cpu);
    //start();
});