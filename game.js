var LEFT = 'ArrowLeft';
var RIGHT = 'ArrowRight';
var UP = 'ArrowUp';
var DOWN = 'ArrowDown';


$(document).ready(function(){

    
    function updateDisplay () {
        var gridHTML = generateGrid(grid);
        $('#container').html(gridHTML);
    };

    var playerPos = { x : 4, y : 3 };
    var ghostPos = { x : 9, y : 1};
    var ghostDest = {x : 9, y : 2};

    setValue(grid, playerPos, PLYR);
    updateDisplay();

    $('#start').click( function () {

        function tictoc() {
            console.log('hi');    
        } 

        //setInterval(tictoc, 1000);

        function ghostLoc() {
            ghostDest = ghostStrategy(ghostPos, playerPos);
            console.log(ghostDest);
            var swapVal = getVal(grid, ghostDest);
            console.log(swapVal);
            grid[ghostDest.y][ghostDest.x] = BLUE;
            console.log(getVal( grid,grid[ghostDest.y][ghostDest.x] ));
            grid[ghostPos.y][ghostPos.x] = swapVal;
            ghostPos = ghostDest;
            //var show = getVal(grid, ghostPos);
            //console.log(show);
        }

        setInterval(ghostLoc, 1000);
        setInterval(updateDisplay, 1000);

        $('#one-button').html('<form><input type="submit" id="reset" name="Reset" value="Reset"></form>');

        // var ghostDest = ghostStrategy(ghostPos, playerPos);
        // console.log(ghostPos);
        // console.log(ghostDest);
        // function ghostMove() {
        //     var swapVal = getVal(grid, ghostDest);
        //     setValue(grid, ghostDest, BLUE);
        //     setValue(grid, ghostPos, swapVal);
        //     ghostPos = ghostDest;
        //     //updateDisplay();
        // }
        //setInterval(ghostMove(), 6000);

        var score = 0;
        $('#score').text('Score: ' + score.toString());

        updateDisplay();

        function setPlayerPosition(destination, destinationValue) {
            if (destinationValue === null || destinationValue === WALL || destinationValue === ORNG || destinationValue === BLUE) {
                return false;
            }
            setValue(grid, destination, PLYR);
            console.log(destination);
            setValue(grid, playerPos, EMPT);
            playerPos = destination;
            return true;
        };

        ////////////////////////ghost stuff//////////////////////

        // var ghostsMove = ghosts(ORNG, ghostPos, playerPos);
        // console.log(ghostsMove);
        // setInterval(ghosts(ORNG, ghostPos, playerPos), 500);
        // if (ghostsMove) {
        //     updateDisplay();
        // }

        ///////////////////////////////////////////////////////////////////

        $(document).keydown(function(event){
            var key = event.key;
            var neighbors = findNeighbors(grid, playerPos);
            var pacman = null;
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
                $('form').submit();
            }

            var shouldUpdateDisplay = setPlayerPosition(destination, destinationValue);

            // var ghostsMove = ghosts(ORNG, ghostPos, playerPos);
            // console.log(ghostsMove);
            // setInterval(ghosts(ORNG, ghostPos, playerPos), 500);
            // if (ghostsMove) {
            //     updateDisplay();
            // }

            if (shouldUpdateDisplay) {
                updateDisplay();
                $('#score').text('Score: ' + score.toString());
                $('.plyr').css('transform', 'rotate(' + pacman + 'deg)');
            }
        });
    });
});