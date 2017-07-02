

function blueStrategy(ghostPos, playerPos) {
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
        if (destVal !== null && destVal !== WALL && destVal !== TUNL && destVal != ORNG) {
            var ghostDest = moves[i];
            return ghostDest;
        }
    }
}

function orangeStrategy(ghostPos, playerPos) {
    var neighbors = findNeighbors(grid, ghostPos);
    var moves = [neighbors.down, neighbors.left, neighbors.up, neighbors.right];
    if (playerPos.x > ghostPos.x) {
        moves[1] = neighbors.right;
        moves[2] = neighbors.left;
    };
    if (playerPos.x < ghostPos.x) {
        moves[1] = neighbors.left;
        moves[2] = neighbors.right;
    }
    if (playerPos.y > ghostPos.y) {
        moves[0] = neighbors.down;
        moves[3]= neighbors.up;
    };
    if (playerPos.y < ghostPos.y) {
        moves[0] = neighbors.up;
        moves[3] = neighbors.down;
    }
    for (var i = 0; i < moves.length; i++) {
        var destVal = getVal(grid, moves[i]);
        if (destVal !== null && destVal !== WALL && destVal !== TUNL && destVal != BLUE) {
            var ghostDest = moves[i];
            return ghostDest;
        }
    }
}

////orange ghost prey moving strategy

function oPreyStrategy(ghostPos, playerPos) {
    var neighbors = findNeighbors(grid, ghostPos);
    var moves = [neighbors.down, neighbors.left, neighbors.up, neighbors.right];
    if (playerPos.x > ghostPos.x) {
        moves[1] = neighbors.left;
        moves[2] = neighbors.right;
    };
    if (playerPos.x < ghostPos.x) {
        moves[1] = neighbors.right;
        moves[2] = neighbors.left;
    }
    if (playerPos.y > ghostPos.y) {
        moves[0] = neighbors.up;
        moves[3]= neighbors.down;
    };
    if (playerPos.y < ghostPos.y) {
        moves[0] = neighbors.down;
        moves[3] = neighbors.up;
    }
    for (var i = 0; i < moves.length; i++) {
        var destVal = getVal(grid, moves[i]);
        if (destVal !== null && destVal !== WALL && destVal !== TUNL && destVal != BLUE) {
            var ghostDest = moves[i];
            return ghostDest;
        }
    }
}


///blue ghost prey strategy 

function bPreyStrategy(ghostPos, playerPos) {
    var neighbors = findNeighbors(grid, ghostPos);
    var moves = [neighbors.down, neighbors.left, neighbors.up, neighbors.right];
    if (playerPos.y > ghostPos.y) {
        moves[0] = neighbors.up;
        moves[2] = neighbors.down;
    };
    if (playerPos.y < ghostPos.y) {
        moves[0] = neighbors.down;
        moves[2] = neighbors.up;
    }
    if (playerPos.x > ghostPos.x) {
        moves[1] = neighbors.left;
        moves[3]= neighbors.right;
    };
    if (playerPos.x < ghostPos.x) {
        moves[1] = neighbors.right;
        moves[3] = neighbors.left;
    }
    for (var i = 0; i < moves.length; i++) {
        var destVal = getVal(grid, moves[i]);
        if (destVal !== null && destVal !== WALL && destVal !== TUNL && destVal != ORNG) {
            var ghostDest = moves[i];
            return ghostDest;
        }
    }
}




