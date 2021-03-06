﻿/*
*(c) Copyright 2011 Simone Masiero. Some Rights Reserved. 
*This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 License
*Modification by Александр Смит 2014-2015 (https://github.com/DarkScorpion)
*/

$(function () {
  $(document).keydown(
    function (keyEvent) {
      Typer.addText(keyEvent); //Capture the keydown event and call the addText, this is executed on page load
    }
  );
});

var Typer = {
  text: null,
  accessCountimer: null,
  index: 0, //current cursor position
  speed: 3, //speed of the Typer
  blinkInterval: 500, //blink interval for cursor
  
  init: function (filePath) //inizialize Hacker Typer
  {
    accessCountimer = setInterval(function () {
      Typer.updateText();
    }, Typer.blinkInterval); //inizialize timer for blinking cursor
    
    $.get(filePath, function (data) { //get the text file
      Typer.text = data; //save the textfile in Typer.text
    });
  },

  write: function (str) //append to console content
  {
    $("#console").append(str);
    return false;
  },

  makeAccess: function () //create Access Granted popUp  FIXED in css: popup is on top of the page and doesn't show is the page is scrolled
  {
    Typer.hidepop(); //hide all popups
    var accessDiv = $("<div id='gran'>").html(""); //create new blank div and id "gran"
    accessDiv.addClass("accessGranted"); //add class to the div for css
    accessDiv.html("<h1>ACCESS GRANTED</h1>"); //set content of div
    $(document.body).prepend(accessDiv); //prepend div to body
    return false;
  },
  makeDenied: function () //create Access Denied popUp  FIXED in css: popup is on top of the page and doesn't show is the page is scrolled
  {
    Typer.hidepop(); // hide all popups
    var deniedDiv = $("<div id='deni'>").html(""); // create new blank div and id "deni"
    deniedDiv.addClass("accessDenied");// add class to the div for css
    deniedDiv.html("<h1>ACCESS DENIED</h1>");// set content of div
    $(document.body).prepend(deniedDiv);// prepend div to body
    return false;
  },

  hidepop: function () //remove all existing popups
  {
    $("#deni").remove();
    $("#gran").remove();
  },

  addText: function (key) //Main function to add the code
  {
    if (key.keyCode == 18) { // key 18 = alt key
      Typer.makeAccess(); // make access popup
      
    } else if (key.keyCode == 17) {// key 17 = ctrl
      Typer.makeDenied(); // make denied popup
      
    } else if (key.keyCode == 27) { // key 27 = esc key
      Typer.hidepop(); // hide all popups

    } else if (Typer.text) { // otherway if text is loaded
      /* //A strange piece of code, without which everything continues to work!
      var cont = $("#console").html(); // get the console content
      if (cont.substring(cont.length - 1, cont.length) == "|") { // if the last char is the blinking cursor
        var consoleDiv = $("#console");
        consoleDiv.html(consoleDiv.html().substring(0, cont.length - 1)); // remove it before adding the text
      }
      */
      if (key.keyCode != 8) { // if key is not backspace
        Typer.index += Typer.speed; // add to the index the speed
      } else {
        if (Typer.index > 0) // else if index is not less than 0 
          Typer.index -= Typer.speed; //remove speed for deleting text
      }
      var text = $("<div/>").text(Typer.text.substring(0, Typer.index)).html();// parse the text for stripping html enities
      var rtn = new RegExp("\n", "g"); // newline regex
      var rts = new RegExp("\\s", "g"); // whitespace regex
      var rtt = new RegExp("\\t", "g"); // tab regex
      $("#console").html(text.replace(rtn, "<br/>").replace(rtt, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts, "&nbsp;"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
      window.scrollBy(0, 50); // scroll to make sure bottom is always visible
    }
    if (key.preventDefault && key.keyCode != 122) { // prevent F11(fullscreen) from being blocked
      key.preventDefault()
    };
    if (key.keyCode != 122) { // otherway prevent keys default behavior
      key.returnValue = false;
    }
  },

  updateText: function () // blinking cursor
  {
    var console = $("#console"); // get console
    var text = console.html(); // get content of console
    if (text.substring(text.length - 1, text.length) == "|") { // if last char is the cursor
      console.html(console.html().substring(0, text.length - 1)); // remove it
    }
    else {
      Typer.write("|"); // else write it
    }
  }

}
