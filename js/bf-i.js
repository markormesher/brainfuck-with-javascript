var running = false;
var paused = false;

var commands, cells, currentCommand, currentCell;

function reset() {
    commands = [];
    cells = [0];
    currentCommand = 0;
    currentCell = 0;
}
reset();

function buildLoopMap(input) {
    var loopMap = [];
    var workingStack = [];
    for (var position in input) {
        command = input[position];
        
        if (command == '[') {
            workingStack.push(position);   
        }
        
        if (command == ']') {
            start = workingStack.pop();
            loopMap[start] = position;
            loopMap[position] = start;
        }
    }
    
    return loopMap;
}

function start() {
    // admin work
    if (running) return;
    running = true;
    setButtons();
    
    // lock editor
    editor.prop('disabled', true);
    
    // read code
    var rawCommands = editor.val().split('');
    commands = rawCommands.filter(function(c) {
        return c == '+' || c == '-' || c == '<' || c == '>' || c == '.' || c == ',' || c == '[' || c == ']';
    });
    
    if (commands.length == 0) {
        addToActiveLine('Nothing to execute');
    }
    
    var loopMap = buildLoopMap(commands);
    
    // execute the code!
    while (currentCommand < commands.length && running && !paused) {
        var command = commands[currentCommand];
        
        // increment current cell
        if (command == '+') {
            ++cells[currentCell];
        }
        
        // decrement current cell
        if (command == '-') {
            --cells[currentCell];
        }
        
        // print to console
        if (command == '.') {
            addToActiveLine(String.fromCharCode(cells[currentCell]));
        }
        
        // read from console
        if (command == ',') {
            // TODO
        }
        
        // move to next cell
        if (command == '>') {
            ++currentCell;
            if (currentCell == cells.length) {
                cells.push(0);
            }
        }
        
        // move to previous cell
        if (command == '<') {
            --currentCell;
            if (currentCell < 0) {
                if (activeConsoleLine != '') {
                    newActiveLine();
                }
                addToActiveLine('Fatal error: tried to move to cell -1');
                running = false;
            }
        }
        
        // start loop
        if (command == '[' && cells[currentCell] == 0) {
            currentCommand = loopMap[currentCommand];
        }
        
        // end of loop
        if (command == ']' && cells[currentCell] != 0) {
            currentCommand = loopMap[currentCommand];
        }
        
        ++currentCommand;
    }
    
    newActiveLine();
    
    // unlock editor
    editor.prop('disabled', false);
    
    // admin work
    running = false;
    setButtons();
    reset();
}

function kill() {
    // admin work
    if (!running) return;
    running = false;
    setButtons();
}