var LEFT = 'ArrowLeft';
var RIGHT = 'ArrowRight';
var UP = 'ArrowUp';
var DOWN = 'ArrowDown';


$(document).ready(function(){

    var pacman = 0;

    function updateDisplay () {
        var gridHTML = generateGrid(grid);
        $('#container').html(gridHTML);
        $('.plyr').css('transform', 'rotate(' + pacman + 'deg)');
        ghostPrey = ghostPrey;
    };

    var playerPos = { x : 4, y : 3 };
    var bluePos = { x : 9, y : 1};
    var blueDest = {x : 9, y : 2};
    var orangePos = {x : 10, y : 1};
    var orangeDest = {x : 10, y : 2};
    var ghostPrey = false;

    setValue(grid, playerPos, PLYR);
    updateDisplay();

    $('#start').click( function () {

        function blueLoc() {
            if (ghostPrey) {
                blueDest = bPreyStrategy(bluePos, playerPos);
                var swapBlueVal = getVal(grid, blueDest);
                grid[blueDest.y][blueDest.x] = BPRY;
                // if (swapBlueVal === BPRY || swapBlueVal === OPRY) {
                //     swapBlueVal = EMPT;
                // }
                grid[bluePos.y][bluePos.x] = swapBlueVal;
                bluePos = blueDest;
            } else {
                blueDest = blueStrategy(bluePos, playerPos);
                var swapBlueVal = getVal(grid, blueDest);
                if (swapBlueVal === PLYR) {
                    alert("Sorry, you lost. Better luck next time.");
                    $('form').submit();
                };
                grid[blueDest.y][blueDest.x] = BLUE;
                grid[bluePos.y][bluePos.x] = swapBlueVal;
                bluePos = blueDest;
            }
        }

        function orangeLoc() {
            //trial
            if (ghostPrey) {
                orangeDest = oPreyStrategy(orangePos, playerPos);
                var swapOrangeVal = getVal(grid, orangeDest);
                grid[orangeDest.y][orangeDest.x] = OPRY;
                // if (swapOrangeVal === OPRY || swapOrangeVal === BPRY) {
                //     swapOrangeVal = EMPT;
                // }
                grid[orangePos.y][orangePos.x] = swapOrangeVal;
                orangePos = orangeDest;
            } else { 
                orangeDest = orangeStrategy(orangePos, playerPos);
                var swapOrangeVal = getVal(grid, orangeDest);
                if (swapOrangeVal === PLYR) {
                    alert("Sorry, you lost. Better luck next time.");
                    $('form').submit();
                };
                grid[orangeDest.y][orangeDest.x] = ORNG;
                grid[orangePos.y][orangePos.x] = swapOrangeVal;
                orangePos = orangeDest;
            }
        }

        // setInterval(blueLoc, 1000);
        // setInterval(orangeLoc, 1000);
        var blueMoveID = setInterval(blueLoc, 1000);
        var orangeMoveID = setInterval(orangeLoc, 1000);
        setInterval(updateDisplay, 1000);

        $('#one-button').html('<form><input type="submit" id="reset" name="Reset" value="Reset"></form>');

        var score = 0;
        $('#score').text('Score: ' + score.toString());

        updateDisplay();

        function setPlayerPosition(destination, destinationValue) {
            ///get ghost to disappear if eaten
            if (destinationValue === OPRY) {
                clearInterval(orangeMoveID);
            }
            if (destinationValue === BPRY) {
                clearInterval(blueMoveID);
            }
            ///////
            if (destinationValue === ORNG || destinationValue === BLUE) {
                alert("Sorry, you lost. Better luck next time.");
                $('form').submit();
            }
            if (destinationValue === null || destinationValue === WALL) {
                return false;
            }
            setValue(grid, destination, PLYR);
            setValue(grid, playerPos, EMPT);
            playerPos = destination;
            return true;
        };

        $(document).keydown(function(event){
            var key = event.key;
            var neighbors = findNeighbors(grid, playerPos);
            //var pacman = 0;
            var destination = null;
            if (key === LEFT) {
                destination = neighbors.left;
                pacman = 180;
            }
            if (key === RIGHT) {
                destination = neighbors.right;
                pacman = 0;
            }
            if (key === UP) {
                destination = neighbors.up;
                pacman = 270;
            }
            if (key === DOWN) {
                destination = neighbors.down;
                pacman = 90;
            }


            var destinationValue = null;
            if (destination) {
                event.preventDefault();
                destinationValue = getVal(grid, destination);
            }

            if (destinationValue === NOMS) {
                score += 10;
            }
            if (destinationValue === FRUT) {
                score += 50;
            }
            if (score == 650) {
                alert("Congratulations! You won!");
                $('form').submit();
            }

            ///trial
            if (destinationValue === FRUT) {
                setValue(grid, orangePos, OPRY);
                setValue(grid, bluePos, BPRY);
                ghostPrey = true;
                setTimeout(function() {
                    ghostPrey = false;
                }, 6000);
            }

            var shouldUpdateDisplay = setPlayerPosition(destination, destinationValue);
            if (shouldUpdateDisplay) {
                updateDisplay();
                $('#score').text('Score: ' + score.toString());
            }
        });
    });
});