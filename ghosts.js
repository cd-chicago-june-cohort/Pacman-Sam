//setInterval(ghosts(), 300);

//ex: var ghostPos = {x: 6, y: 1};

function ghostStrategy(ghostPos, playerPos) {
    var neighbors = findNeighbors(grid, ghostPos);
    var moves = [neighbors.down, neighbors.left, neighbors.up, neighbors.right];
    if (playerPos.y > ghostPos.y) {
        moves[0] = neighbors.down;
        moves[2] = neighbors.up;
    };
    if (playerPos.y < ghostPos.y) {
        moves[0] = neighbors.up;
        moves[2] = neighbors.down;
    }
    if (playerPos.x > ghostPos.x) {
        moves[1] = neighbors.right;
        moves[3]= neighbors.left;
    };
    if (playerPos.x < ghostPos.x) {
        moves[1] = neighbors.left;
        moves[3] = neighbors.right;
    }
    for (var i = 0; i < moves.length; i++) {
        var destVal = getVal(grid, moves[i]);
        if (destVal !== null && destVal !== WALL && destVal !== TUNL) {
            var ghostDest = moves[i];
            return ghostDest;
        }
    }
}

///interval function should only pass out new location



// //var ghostPos;
// var ghostDest = ghostStrategy(ghostPos, playerPos);


// function ghostMove() {
//     var swapVal = getVal(grid, ghostDest);
//     setValue(grid, ghostDest, ORNG);
//     setValue(grid, ghostPos, swapVal);
//     ghostPos = ghostDest;
//     updateDisplay();
// }

// function ghosts(ghost, ghostPos, playerPos) {
//     var ghostDest = ghostStrategy(ghostPos, playerPos);
//     if (ghostDest !== null && ghostDest !== WALL) {
//         return false;
//     }
//     var currentValue = getVal(grid, ghostPos);
//     setValue(grid, ghostDest, ghost);
//     setValue(grid, ghostPos, currentValue);
//     ghostPos = ghostDest;
//     return true;
// }





