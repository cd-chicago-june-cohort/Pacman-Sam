var PLYR = 'plyr';
var WALL = 'wall';
var NOMS = 'noms';
var EMPT = 'empt';

var grid {
    [WALL, WALL, WALL, WALL],
    [WALL, EMPT, NOMS, WALL],
    [WALL, NOMS, PLYR, WALL],
    [WALL, WALL, WALL, WALL]
};

function findVal(grid, point) {
    var row = point.y;
    if (!row) {
        return null;
    }
    if (!row[point.x]) {
        return null;
    }
    return row[point.x];
};

function findNeighbors(grid, point) {
    var x = point.x;
    var y = point.y;
    var neighbors = {};
    neighbors.up    =   { x : x, y : y - 1 };
    neighbors.left  =   { x : x - 1, y : y };
    neighbors.right =   { x : x + 1, y : y };
    neighbors.down  =   { x : x, y : y + 1 };
}

function generateGrid(grid) {
    var newGrid = "";
    for (var i = 0; i < grid.length; i++) {
        newGrid = newGrid + "<div class='row'>";
        var row = grid[i];
        for (var j = 0; j < row.length; j++) {
            var cell = findVal(grid, {grid[i], row[j]});
            newGrid = newGrid + "<div class='" + cell + "'></div>";
        }
        newGrid = newGrid + "</div>"
    }
    return newGrid;
}

$(document).ready(function () {
    $('#container').html(generateGrid(grid));
});