var editor, startButton, killButton, clearButton, console, activeConsoleLine;
var running = false;

$(document).ready(function() {
    
    // get elements
    editor = $('div.editor textarea');
    startButton = $('.start_button');
    killButton = $('.kill_button');
    clearButton = $('.clear_button');
    console = $('div.output');
    activeConsoleLine;
    
    // event listeners
    startButton.click(function(e) {
        start();
    });
    
    killButton.click(function(e) {
        kill(); 
    });
    
    clearButton.click(function(e) {
        console.children().remove();
        console.append('<p>&gt; <span class="cursor">_</span></p>');
        scrollConsole();
    });
    
    flashCursor();
    
});

function flashCursor() {
    $('span.cursor').toggle();
    setTimeout(function(){flashCursor();}, 600);
}

function scrollConsole() {
    console.scrollTop(100000000);
}

function addConsoleLine(line) {
    console.find('p:last-child').remove();
    console.append('<p>&gt; ' + line + '</p>');
    console.append('<p>&gt; <span class="cursor">_</span></p>');
    scrollConsole();
}

function setButtons() {
    startButton.prop('disabled', running);
    killButton.prop('disabled', !running);
    clearButton.prop('disabled', running);
}

function start() {
    // admin work
    if (running) return;
    running = true;
    setButtons();
    
    addConsoleLine('Hi');
}

function kill() {
    // admin work
    if (!running) return;
    running = false;
    setButtons();
    
    addConsoleLine('Bye');
}