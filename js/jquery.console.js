// JQuery Console 1.0
// Sun Feb 21 20:28:47 GMT 2010
//
// Copyright 2010 Chris Done, Simon David Pratt. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//    1. Redistributions of source code must retain the above
//       copyright notice, this list of conditions and the following
//       disclaimer.
//
//    2. Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials
//       provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT HOLDERS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

// TESTED ON
//   Internet Explorer 6
//   Opera 10.01
//   Chromium 4.0.237.0 (Ubuntu build 31094)
//   Firefox 3.5.8, 3.6.2 (Mac)
//   Safari 4.0.5 (6531.22.7) (Mac)
//   Google Chrome 5.0.375.55 (Mac)

(function($){
    $console = ('undefined' != typeof window.console ? window.console : null);
    $.fn.console = function(config){
        ////////////////////////////////////////////////////////////////////////
        // Constants
        // Some are enums, data types, others just for optimisation
        var keyCodes = {
	    // left
	    37: moveBackward,
	    // right
	    39: moveForward,
	    // up
	    38: previousHistory,
	    // down
	    40: nextHistory,
	    // backspace
	    8:  backDelete,
	    // delete
	    46: forwardDelete,
            // end
	    35: moveToEnd,
	    // start
	    36: moveToStart,
	    // return
	    13: commandTrigger,
	    // tab
	    18: doNothing
	};
    var shiftCodes = {
        13: executeTrigger
    };
	var ctrlCodes = {
	    // C-a
	    65: moveToStart,
	    // C-e
	    69: moveToEnd,
	    // C-d
	    68: forwardDelete,
	    // C-n
	    78: nextHistory,
	    // C-p
	    80: previousHistory,
	    // C-b
	    66: moveBackward,
	    // C-f
	    70: moveForward,
	    // C-k
	    75: deleteUntilEnd
	};
	var altCodes = {
	    // M-f
	    70: moveToNextWord,
	    // M-b
	    66: moveToPreviousWord,
	    // M-d
	    68: deleteNextWord
	};
        var cursor = '<span class="jquery-console-cursor">&nbsp;</span>';

        ////////////////////////////////////////////////////////////////////////
        // Globals
        var container = $(this);
        var inner = $('<div class="jquery-console-inner"></div>');
        // erjiang: changed this from a text input to a textarea so we
        // can get pasted newlines
        var typer = $('<textarea class="jquery-console-typer"></textarea>');
        // Prompt
        var promptBox;
        var prompt;
        var promptLabel = config && config.promptLabel? config.promptLabel : "> ";
        var continuedPromptLabel = config && config.continuedPromptLabel?
        config.continuedPromptLabel : "> ";
        var column = 0;
        var promptText = '';
        var restoreText = '';
        var continuedText = '';
        // Prompt history stack
        var history = [];
        var ringn = 0;
        // For reasons unknown to The Sword of Michael himself, Opera
        // triggers and sends a key character when you hit various
        // keys like PgUp, End, etc. So there is no way of knowing
        // when a user has typed '#' or End. My solution is in the
        // typer.keydown and typer.keypress functions; I use the
        // variable below to ignore the keypress event if the keydown
        // event succeeds.
        var cancelKeyPress = 0;
	// When this value is false, the prompt will not respond to input
	var acceptInput = true;
	// When this value is true, the command has been canceled
	var cancelCommand = false;
    var working = false;

        // External exports object
        var extern = {};

        ////////////////////////////////////////////////////////////////////////
        // Main entry point
        (function(){
            container.append(inner);
            inner.append(typer);
            typer.css({position:'fixed',bottom:0,left:'-9999px'});
            if (config.welcomeMessage)
                message(config.welcomeMessage,'jquery-console-welcome');
            newPromptBox();
            if (config.autofocus) {
                inner.addClass('jquery-console-focus');
                typer.focus();
                setTimeout(function(){
                    inner.addClass('jquery-console-focus');
                    typer.focus();
                },100);
            }
            extern.inner = inner;
            extern.typer = typer;
            extern.scrollToBottom = scrollToBottom;
        })();

        ////////////////////////////////////////////////////////////////////////
        // Reset terminal
        extern.reset = function(){
            var welcome = (typeof config.welcomeMessage != 'undefined');
            inner.parent().fadeOut(function(){
                inner.find('div').each(function(){
                    if (!welcome) {
                        $(this).remove();
		    } else {
			welcome = false;
		    }
                });
                newPromptBox();
                inner.parent().fadeIn(function(){
                    inner.addClass('jquery-console-focus');
                    typer.focus();
                });
            });
        };

        ////////////////////////////////////////////////////////////////////////
        // Reset terminal
        extern.notice = function(msg,style){
            var n = $('<div class="notice"></div>').append($('<div></div>').text(msg))
                .css({visibility:'hidden'});
            container.append(n);
            var focused = true;
            if (style=='fadeout')
                setTimeout(function(){
                    n.fadeOut(function(){
                        n.remove();
                    });
                },4000);
            else if (style=='prompt') {
                var a = $('<br/><div class="action"><a href="javascript:">OK</a><div class="clear"></div></div>');
                n.append(a);
                focused = false;
                a.click(function(){ n.fadeOut(function(){ n.remove();inner.css({opacity:1}) }); });
            }
            var h = n.height();
            n.css({height:'0px',visibility:'visible'})
                .animate({height:h+'px'},function(){
                    if (!focused) inner.css({opacity:0.5});
                });
            n.css('cursor','default');
            return n;
        };

        extern.trigger = function(){
            executeTrigger();
            container.click();
        }

        extern.feed = function(lines){
            var lines = lines.split(/\r\n|\n|\r/g);
            for(var i = 0; i < lines.length; i++)
            {
                if(i > 0)
                {
                    commandTrigger();
                }
                typer.consoleInsert(lines[i]);
            }
        }

        ////////////////////////////////////////////////////////////////////////
        // Make a new prompt box
        function newPromptBox() {
            column = 0;
            promptText = '';
	    ringn = 0; // Reset the position of the history ring
	    enableInput();
            promptBox = $('<div class="jquery-console-prompt-box"></div>');
            var label = $('<span class="jquery-console-prompt-label"></span>');
            var labelText = extern.continuedPrompt? continuedPromptLabel : promptLabel;
            promptBox.append(label.text(labelText).show());
            label.html(label.html().replace(' ','&nbsp;'));
            prompt = $('<span class="jquery-console-prompt"></span>');
            promptBox.append(prompt);
            inner.append(promptBox);
            updatePromptDisplay();
        };

        ////////////////////////////////////////////////////////////////////////
        // Handle setting focus
        container.click(function(){
            inner.addClass('jquery-console-focus');
            inner.removeClass('jquery-console-nofocus');
            typer.focus();
            return false;
        });

        ////////////////////////////////////////////////////////////////////////
        // Handle losing focus
        typer.blur(function(){
            inner.removeClass('jquery-console-focus');
            inner.addClass('jquery-console-nofocus');
        });

        ////////////////////////////////////////////////////////////////////////
        // Bind to the paste event of the input box so we know when we
        // get pasted data
        typer.bind('paste', function(e) {
            // wipe typer input clean just in case
            typer.val("");
            // this timeout is required because the onpaste event is
            // fired *before* the text is actually pasted

            setTimeout(function() {
                var lines = (e.clipboardData || typer.val()).split(/\r\n|\n|\r/g);
                for(var i = 0; i < lines.length; i++)
                    setTimeout((function(line, first) {
                        return function() {
                            if(!first)
                                commandTrigger();
                            typer.consoleInsert(line);
                        }
                    })(lines[i], i == 0), i);
                setTimeout(function() { typer.val(""); }, lines.length);
            }, 0);
        });

        ////////////////////////////////////////////////////////////////////////
        // Handle key hit before translation
        // For picking up control characters like up/left/down/right

        typer.keydown(function(e){
            cancelKeyPress = 0;
            var keyCode = e.keyCode;
	    // C-c: cancel the execution
	    if(e.ctrlKey && keyCode == 67) {
    		cancelKeyPress = keyCode;
    		cancelExecution();
    		return false;
	    }
	    if (acceptInput) {
    		if (e.shiftKey && keyCode in shiftCodes) {
                cancelKeyPress = keyCode;
                (shiftCodes[keyCode])();
                return false;
            } else if (e.ctrlKey && keyCode in ctrlCodes) {
                cancelKeyPress = keyCode;
                (ctrlCodes[keyCode])();
                return false;
            } else if (keyCode in keyCodes) {
                cancelKeyPress = keyCode;
    		    (keyCodes[keyCode])();
    		    return false;
    		} else if (e.altKey  && keyCode in altCodes) {
                cancelKeyPress = keyCode;
    		    (altCodes[keyCode])();
    		    return false;
    		}
	    }
        });

        ////////////////////////////////////////////////////////////////////////
        // Handle key press
        typer.keypress(function(e){
            var keyCode = e.keyCode || e.which;
            if (isIgnorableKey(e)) {
                return false;
            }
          // // C-v: don't insert on paste event
            if (e.ctrlKey && String.fromCharCode(keyCode).toLowerCase() == 'v') {
              return true;
            }
            if (acceptInput && cancelKeyPress != keyCode && keyCode >= 32){
                if (cancelKeyPress) return false;
                if (typeof config.charInsertTrigger == 'undefined' ||
                    (typeof config.charInsertTrigger == 'function' &&
                     config.charInsertTrigger(keyCode,promptText)))
                    typer.consoleInsert(keyCode);
            }
            if ($.browser.webkit) return false;
        });

        function isIgnorableKey(e) {
            // for now just filter alt+tab that we receive on some platforms when
            // user switches windows (goes away from the browser)
            return ((e.keyCode == keyCodes.tab || e.keyCode == 192) && e.altKey);
        };

        ////////////////////////////////////////////////////////////////////////
        // Rotate through the command history
        function rotateHistory(n){
            if (history.length == 0) return;
            ringn += n;
            if (ringn < 0) ringn = history.length;
            else if (ringn > history.length) ringn = 0;
            var prevText = promptText;
            if (ringn == 0) {
                promptText = restoreText;
            } else {
                promptText = history[ringn - 1];
            }
            if (config.historyPreserveColumn) {
                if (promptText.length < column + 1) {
                    column = promptText.length;
                } else if (column == 0) {
                    column = promptText.length;
                }
            } else {
                column = promptText.length;
            }
            updatePromptDisplay();
        };

	function previousHistory() {
	    rotateHistory(-1);
	};

	function nextHistory() {
	    rotateHistory(1);
	};

        // Add something to the history ring
        function addToHistory(line){
            history.push(line);
            restoreText = '';
        };

        // Delete the character at the current position
        function deleteCharAtPos(){
            if (column < promptText.length){
                promptText =
                    promptText.substring(0,column) +
                    promptText.substring(column+1);
                restoreText = promptText;
                return true;
            } else return false;
        };

	function backDelete() {
            if (moveColumn(-1)){
                deleteCharAtPos();
                updatePromptDisplay();
            }
	};

	function forwardDelete() {
            if (deleteCharAtPos())
                updatePromptDisplay();
	};

	function deleteUntilEnd() {
	    while(deleteCharAtPos()) {
		updatePromptDisplay();
	    }
	};

	function deleteNextWord() {
	    // A word is defined within this context as a series of alphanumeric
	    // characters.
	    // Delete up to the next alphanumeric character
	    while(column < promptText.length &&
		  !isCharAlphanumeric(promptText[column])) {
		deleteCharAtPos();
		updatePromptDisplay();
	    }
	    // Then, delete until the next non-alphanumeric character
	    while(column < promptText.length &&
		  isCharAlphanumeric(promptText[column])) {
		deleteCharAtPos();
		updatePromptDisplay();
	    }
	};

        ////////////////////////////////////////////////////////////////////////
        // Validate command and trigger it if valid, or show a validation error
        function commandTrigger() {
            var line = promptText;
            if (typeof config.commandValidate == 'function') {
                var ret = config.commandValidate(line);
                if (ret == true || ret == false) {
                    if (ret) {
                        handleCommand();
                    }
                } else {
                    commandResult(ret,"error");
                }
            } else {
                handleCommand();
            }
        };

        function executeTrigger() {
            if(working) return;
            if (typeof config.execute == 'function') {
                disableInput();
                addToHistory(promptText);
                var text = promptText;
                if (extern.continuedPrompt) {
                  if (continuedText)
                    continuedText += '\n' + promptText;
                  else continuedText = promptText;
                } else continuedText = undefined;
                if (continuedText) text = continuedText;
                working = true;
                var ret = config.execute(text,function(msgs){
                    extern.continuedPrompt = false;
                    continuedText = undefined;
                    commandResult(msgs.msg, msgs.className);
                    extern.continuedPrompt = true;
                    working = false;
                });
                if (extern.continuedPrompt && !continuedText)
                  continuedText = promptText;

                if (typeof ret == 'boolean') {
                    if (ret) {
                        // Command succeeded without a result.
                    } else {
                        working = false;
                        extern.continuedPrompt = false;
                        commandResult('No query entered.', "error");
                    }
                } else if (typeof ret == "string") {
                    commandResult(ret,"success");
                } else if (typeof ret == 'object' && ret.length) {
                    commandResult(ret);
                } else if (extern.continuedPrompt) {
                    commandResult();
                }
            }
        }

        // Scroll to the bottom of the view
        function scrollToBottom() {
            if (jQuery.fn.jquery > "1.6") {
                inner.animate({ scrollTop: inner.prop("scrollHeight") }, { queue : false });
            }
            else {
                inner.attr({ scrollTop: inner.attr("scrollHeight") });
            }
        };

	function cancelExecution() {
	    if(typeof config.cancelHandle == 'function') {
		config.cancelHandle();
	    }
	}

        ////////////////////////////////////////////////////////////////////////
        // Handle a command
        function handleCommand() {
            if (typeof config.commandHandle == 'function') {
		        disableInput();
                addToHistory(promptText);
                var text = promptText;
                if (extern.continuedPrompt) {
                  if (continuedText)
                    continuedText += '\n' + promptText;
                  else continuedText = promptText;
                } else continuedText = undefined;
                if (continuedText) text = continuedText;
                var ret = config.commandHandle(text,function(msgs){
                    commandResult(msgs);
                });
                if (extern.continuedPrompt && !continuedText)
                {
                  continuedText = promptText;
                }
                if (typeof ret == 'boolean') {
                    if (ret) {
                        // Command succeeded without a result.
                        commandResult();
                    } else {
                        working = false;
                        extern.continuedPrompt = false;
                        commandResult('No query entered', 'jquery-console-message-error');
                    }
                } else if (typeof ret == "string") {
                    commandResult(ret,"jquery-console-message-success");
                } else if (typeof ret == 'object' && ret.length) {
                    commandResult(ret);
                } else if (extern.continuedPrompt) {
                    commandResult();
                } else {
                    if(!working)
                    {
                        extern.continuedPrompt = true;
                        newPromptBox();
                    }
                }
            }
        };

        ////////////////////////////////////////////////////////////////////////
        // Disable input
	function disableInput() {
	    acceptInput = false;
	};

        // Enable input
	function enableInput() {
	    acceptInput = true;
	}

        ////////////////////////////////////////////////////////////////////////
        // Reset the prompt in invalid command
        function commandResult(msg,className) {
            column = -1;
            updatePromptDisplay();
            if (typeof msg == 'string') {
                message(msg,className);
            } else if ($.isArray(msg)) {
                for (var x in msg) {
                    var ret = msg[x];
                    message(ret.msg,ret.className);
                }
            } else if(msg) { // Assume it's a DOM node or jQuery object.
              inner.append(msg);
            }
            newPromptBox();
        };

        ////////////////////////////////////////////////////////////////////////
        // Display a message
        function message(msg,className) {
            var mesg = $('<div class="jquery-console-message"></div>');
            if (className) mesg.addClass(className);
            mesg.filledText(msg).hide();
            inner.append(mesg);
            mesg.show();
        };

        ////////////////////////////////////////////////////////////////////////
        // Handle normal character insertion
        // data can either be a number, which will be interpreted as the
        // numeric value of a single character, or a string
        typer.consoleInsert = function(data){
            // TODO: remove redundant indirection
            var text = isNaN(data) ? data : String.fromCharCode(data);
            var before = promptText.substring(0,column);
            var after = promptText.substring(column);
            promptText = before + text + after;
            moveColumn(text.length);
            restoreText = promptText;
            updatePromptDisplay();
        };

        ////////////////////////////////////////////////////////////////////////
        // Move to another column relative to this one
        // Negative means go back, positive means go forward.
        function moveColumn(n){
            if (column + n >= 0 && column + n <= promptText.length){
                column += n;
                return true;
            } else return false;
        };

	function moveForward() {
            if(moveColumn(1)) {
		updatePromptDisplay();
		return true;
	    }
	    return false;
	};

	function moveBackward() {
            if(moveColumn(-1)) {
		updatePromptDisplay();
		return true;
	    }
	    return false;
	};

	function moveToStart() {
            if (moveColumn(-column))
                updatePromptDisplay();
	};

	function moveToEnd() {
            if (moveColumn(promptText.length-column))
                updatePromptDisplay();
	};

	function moveToNextWord() {
	    while(column < promptText.length &&
		  !isCharAlphanumeric(promptText[column]) &&
		  moveForward()) {
	    }
	    while(column < promptText.length &&
		  isCharAlphanumeric(promptText[column]) &&
		  moveForward()) {
	    }
	};

	function moveToPreviousWord() {
	    // Move backward until we find the first alphanumeric
	    while(column -1 >= 0 &&
		  !isCharAlphanumeric(promptText[column-1]) &&
		  moveBackward()) {
	    }
	    // Move until we find the first non-alphanumeric
	    while(column -1 >= 0 &&
		  isCharAlphanumeric(promptText[column-1]) &&
		  moveBackward()) {
	    }
	};

	function isCharAlphanumeric(charToTest) {
	    if(typeof charToTest == 'string') {
		var code = charToTest.charCodeAt();
		return (code >= 'A'.charCodeAt() && code <= 'Z'.charCodeAt()) ||
		    (code >= 'a'.charCodeAt() && code <= 'z'.charCodeAt()) ||
		    (code >= '0'.charCodeAt() && code <= '9'.charCodeAt());
	    }
	    return false;
	};

	function doNothing() {};

        extern.promptText = function(text){
            if (text) {
                promptText = text;
                column = promptText.length;
                updatePromptDisplay();
            }
            return promptText;
        };

        ////////////////////////////////////////////////////////////////////////
        // Update the prompt display
        function updatePromptDisplay(){
            var line = promptText;
            var html = '';
            if (column > 0 && line == ''){
                // When we have an empty line just display a cursor.
                html = cursor;
            } else if (column == promptText.length){
                // We're at the end of the line, so we need to display
                // the text *and* cursor.
                html = htmlEncode(line) + cursor;
            } else {
                // Grab the current character, if there is one, and
                // make it the current cursor.
                var before = line.substring(0, column);
                var current = line.substring(column,column+1);
                if (current){
                    current =
                        '<span class="jquery-console-cursor">' +
                        htmlEncode(current) +
                        '</span>';
                }
                var after = line.substring(column+1);
                html = htmlEncode(before) + current + htmlEncode(after);
            }
            prompt.html(html);
            scrollToBottom();
        };

        // Simple HTML encoding
        // Simply replace '<', '>' and '&'
        // TODO: Use jQuery's .html() trick, or grab a proper, fast
        // HTML encoder.
        function htmlEncode(text){
            return (
                text.replace(/&/g,'&amp;')
                    .replace(/</g,'&lt;')
                    .replace(/</g,'&lt;')
                    .replace(/ /g,'&nbsp;')
                    .replace(/\n/g,'<br />')
            );
        };

        return extern;
    };
    // Simple utility for printing messages
    $.fn.filledText = function(txt){
        $(this).text(txt);
        $(this).html($(this).html().replace(/\n/g,'<br/>'));
        return this;
    };
})(jQuery);