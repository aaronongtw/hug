    var x = 0,
        y = 0, tierNum, cellNum

    function createBear() {

        var dir

        var bearbear = document.createElement('div');
        bearbear.className = 'bear';
        document.body.appendChild(bearbear);

        var moveBearbear = function() {
            bearbear.style.top = (y * 40)+10 + 'px';
            bearbear.style.left = (x * 40)+10  + 'px'

        }


        moveBearbear();

        var turn = function(direction) {
            console.log("our direction is " + direction);
            dir = direction;
        }

        var advance = function(step) {
            step = step || 1;
            if (dir === "up") {
                y = y - step;
            } else if (dir === "down") {
                y = y + step;
            } else if (dir === "left") {
                x = x - step;
            } else if (dir === "right") {
                x = x + step
            }

            moveBearbear()
        }



        return {
            x: x,
            y: y,
            turn: turn,
            advance: advance,
            left: function() {
                turn("left");
                advance();
            },
            right: function() {
                turn("right");
                advance();
            },
            down: function() {
                turn("down");
                advance();
            }
        }


    }

    var bear = createBear();
    var wallFlag = false;
    var count = 0;
    var maze
    var complete = 0;

    $(document).ready(function() {
        createTable();
        drawMaze();
        startbear();
    })


    var resetMaze = function() {
        complete += 1
        clearTimeout(bearMove)
        $('.cells').css('border', 'none')
        x = 0
        y = 0
        $('.complete').html('<h1>' + complete + '</h1>')
    }


    var startbear = function(oldX) {
        oldX = oldX || 0
        var rX = x
        var rY = y
        if (rY >= (tierNum)) {
            resetMaze()
            drawMaze()
        } else if (maze[rY][rX] === 1) {
            if (rX === 0) {
                bear.right()
            } else if (rX === (cellNum-1)) {
                bear.left()
            } else {
                if (oldX == rX) {
                    if (rX > (cellNum/2)) {
                        bear.right()
                    } else {
                        bear.left()
                    }
                } else if (oldX > rX) {
                    bear.left()
                } else {
                    bear.right()
                }
            }
        } else {
            bear.down()

        }
        bearMove = setTimeout(function() {
            startbear(rX)
        }, 100)
    }

    var drawMaze = function() {
        maze = createMaze()
        for (var y = 0; y < maze.length; y++) {
            for (var x = 0; x < maze[y].length; x++) {
                if (maze[y][x] == 1)
                    $('.tier')[y].children[x].style.borderBottom = "4px solid black"
            }
        }
    }

    var createMaze = function() {
        maze = []
        for (var i = 0; i < tierNum; i++) {
            maze.push(createTier())
        }
        // maze = [createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier(), createTier()]
        return maze
    }

    var createTier = function() {
        count = 0
        wallFlag = false
        tierArray = []
        for (var i = 0; i < cellNum; i++) {
        tierArray.push(createWall())
        }
        // tierArray = [createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall(), createWall()]
        return tierArray
    }
    var createWall = function() {
        wallGenAlg = cellNum/100
        if (count == (cellNum-1)) {
            return 0
        } else {
            if (wallFlag == false) {
                if (Math.random() > (0.61+wallGenAlg)) {
                    wallFlag = true
                    return 0
                } else {
                    count += 1
                    console.log(count)
                    return 1
                }
            } else {
                return 1
            }
        }
    }

    var createTable = function() {
        $('body').append('<table id="screen"></table>')
        tierNum = Math.floor(window.innerHeight/40)
        cellNum = Math.floor(window.innerWidth/40)
        console.log(tierNum)
        console.log(cellNum)
        for (var i = 0; i < tierNum; i++) {
            console.log(i)
            $('#screen').append('<tr class="tier" id="row'+i+'">')
            for (var j = 0; j < cellNum; j++) {
                whichRow = "#row" + i
                $(whichRow).append('<td class="cells"></td>')
            }
            $('#screen').append('</tr>')
        }
    }
