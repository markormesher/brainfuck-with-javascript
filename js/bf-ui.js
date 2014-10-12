var editor, startButton, killButton, clearButton, console, statusMsg;
var activeConsoleLine = "";

$(document).ready(function() {
    
    // get elements
    editor = $('div.editor textarea');
    startButton = $('.start_button');
    killButton = $('.kill_button');
    clearButton = $('.clear_button');
    console = $('div.output');
    statusMsg = $('span.status');
    activeConsoleLine;
    
    // event listeners
    startButton.click(function(e) {
        startBF();
    });
    
    killButton.click(function(e) {
        killBF(); 
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

function addToActiveLine(c) {
    activeConsoleLine += c;
    console.find('p:last-child').remove();
    console.append('<p>&gt; ' + activeConsoleLine + '<span class="cursor">_</span></p>');
    scrollConsole();
}

function newActiveLine(line) {
    console.find('p:last-child').remove();
    console.append('<p>&gt; ' + activeConsoleLine + '</p>');
    console.append('<p>&gt; <span class="cursor">_</span></p>');
    activeConsoleLine = "";
    scrollConsole();
}

function setButtons() {
    startButton.prop('disabled', running);
    killButton.prop('disabled', !running);
    clearButton.prop('disabled', running);
}