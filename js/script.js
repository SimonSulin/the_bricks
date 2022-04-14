var play_btn = document.getElementById('ply');

function drawIt() {
    var x = 150;
    var y = 150;
    var dx = 2;
    var dy = 4;
    var WIDTH;
    var HEIGHT;
    var r = 10;
    var ctx;
    var paddlex;
    var paddleh;
    var paddlew;
    var rightDown = false;
    var leftDown = false;
    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
    var tocke; //deklaracija spremenljivke
    var x1;



    function init() {
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        x1 = setInterval(draw, 10);
        // dodajanje kode v metodo init
        points = 0;
        $("#points").html(points);

        var play_btn = document.getElementById('ply');
        play_btn.style.display = 'none';
    }

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    //END LIBRARY CODE

    function draw() {
        clear();
        circle(x, y, 10);
        //premik ploščice levo in desno
        if (rightDown) {
            if ((paddlex + paddlew) < WIDTH) {
                paddlex += 5;
            } else {
                paddlex = WIDTH - paddlew;
            }
        } else if (leftDown) {
            if (paddlex > 0) {
                paddlex -= 5;
            } else {
                paddlex = 0;
            }
        }

        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

        //riši opeke
        for (i = 0; i < NROWS; i++) {
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }
        rowheight = BRICKHEIGHT + PADDING + r / 2; //Smo zadeli opeko?
        colwidth = BRICKWIDTH + PADDING + r / 2;
        row = Math.floor(y / rowheight);
        col = Math.floor(x / colwidth);
        //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
        if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy;
            bricks[row][col] = 0;
            points += 1;
            $("#points").html(points);
        }
        if (x + dx > WIDTH - r || x + dx < r)
            dx = -dx;

        if (y + dy < r)
            dy = -dy;
        else if (y + dy > HEIGHT - r) {
            //Odboj kroglice, ki je odvisen od odboja od ploščka 
            if (x > paddlex && x < paddlex + paddlew) {
                dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
                dy = -dy;
            } else if (y + dy > HEIGHT - r) {
                clearInterval(x1);
                play_btn.style.display = 'block';
                loosealeart();

            }
        }

        x += dx;
        y += dy;

        if (points > 24) {
            clearInterval(x1);
            play_btn.style.display = 'block';
            winaleart();

        }



    }

    function init_paddle() {
        paddlex = WIDTH / 2;
        paddleh = 10;
        paddlew = 75;
    }

    function onKeyDown(evt) {
        if (evt.keyCode == 39)
            rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
    }

    function onKeyUp(evt) {
        if (evt.keyCode == 39)
            rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
    }
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function initbricks() { //inicializacija opek - polnjenje v tabelo
        NROWS = 5;
        NCOLS = 5;
        BRICKWIDTH = (WIDTH / NCOLS) - 1;
        BRICKHEIGHT = 15;
        PADDING = 1;
        bricks = new Array(NROWS);
        for (i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            for (j = 0; j < NCOLS; j++) {
                bricks[i][j] = 1;
            }
        }
    }



    init();
    init_paddle();
    initbricks();
}
let play = document.getElementById("play");
let audio = new Audio('audio/music.mp3');

function playSong() {

    audio.loop = true;
    audio.volume = 0.4;
    audio.play();
    document.getElementById("play").style.display = "block";
    document.getElementById("pause").style.display = "none";
}

function stopSong() {
    audio.pause();
    document.getElementById("play").style.display = "none";
    document.getElementById("pause").style.display = "block";
}

function Sweetaleart() {
    Swal.fire({
        title: 'Credits',
        toast: true,
        text: 'Made by Simon Šulin!',
        showConfirmButton: true,
        position: 'center',

    })
}

function info() {
    Swal.fire({
        title: 'Info',
        toast: true,
        text: 'To win you must destroy all of the bricks.You have to move the paddle using the left and right arrow key and bounce the ball of of it.',
        showConfirmButton: true,
        position: 'center',

    })
}

function winaleart() {
    Swal.fire({
        title: 'You won',
        text: 'Thank you for playing'

    })
}

function loosealeart() {
    Swal.fire({
        title: 'You lost',
        text: 'Try again by pressing the play button at the bottom'

    })
}