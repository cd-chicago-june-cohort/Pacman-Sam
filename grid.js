var PLYR = 'plyr';
var WALL = 'wall';
var NOMS = 'noms';
var EMPT = 'empt';
var FRUT = 'frut';
var ORNG = 'gst1';
var BLUE = 'gst2';
var TUNL = 'tunl';
var PREY = 'prey';

//////Block this off - make room for building your grid//////////////////////


var grid = [
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, WALL, EMPT, BLUE, ORNG, EMPT, WALL, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, WALL],
    [WALL, NOMS, WALL, WALL, NOMS, NOMS, NOMS, WALL, WALL, EMPT, EMPT, WALL, WALL, NOMS, NOMS, NOMS, WALL, WALL, NOMS, WALL],
    [TUNL, NOMS, WALL, FRUT, NOMS, WALL, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, WALL, NOMS, FRUT, WALL, NOMS, TUNL],
    [WALL, NOMS, WALL, WALL, NOMS, WALL, NOMS, WALL, WALL, WALL, WALL, WALL, WALL, NOMS, WALL, NOMS, WALL, WALL, NOMS, WALL],
    [WALL, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, NOMS, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
];


////////////Grid is built//////////////////////////////////////////////////


function rotatePLYR(num) {
    var str = num.toString();
    return "'rotate(" + str + "deg)'";
}

console.log(grid);

function getVal(grid, point) {
    var row = grid[point.y];
    if (!row) {
        return null;
    }
    if (!row[point.x]) {
        return null;
    }
    return row[point.x];
};

//console.log(getVal (grid, {x: 2, y: 1}));


function setValue (grid, point, newValue) {
    var row = grid[point.y];
    if (!row) {
        return false;
    }
    var value = row[point.x];
    if (!value) {
        return false;
    }
    grid[point.y][point.x] = newValue;
    return true;
};

//console.log(setValue(grid, {x: 2, y: 1}, PLYR));
//console.log(getVal (grid, {x: 2, y: 1}));

function findNeighbors(grid, point) {
    var x = point.x;
    var y = point.y;
    var neighbors = {};
    neighbors.up    =   { x : x, y : y - 1 };
    neighbors.left  =   { x : x - 1, y : y };
    neighbors.right =   { x : x + 1, y : y };
    neighbors.down  =   { x : x, y : y + 1 };
    if (point.x == 0 && point.y == 3) {
        neighbors.left = {x : 19, y : 3}
    }
    if (point.x == 19 && point.y == 3) {
        neighbors.right = {x : 0, y : 3}
    }
    return neighbors;
};

function generateGrid(grid) {
    var newGrid = "";
    for (var i = 0; i < grid.length; i++) {
        newGrid = newGrid + "<div class='row'>";
        for (var j = 0; j < grid[i].length; j++) {
            var cell = grid[i][j];
            newGrid = newGrid + "<div class='" + cell + "'></div>";
        }
    newGrid = newGrid + "</div>"
    }
    return newGrid;
}

//console.log(generateGrid(grid));

$(document).ready(function () {
    $('#container').html(generateGrid(grid));
});