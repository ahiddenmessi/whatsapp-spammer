// ==UserScript==
// @name         WhatsApp Web Spammer
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Spam people with this beautiful WhatsApp Web spammer.
// @author       Dan6erbond
// @match        https://web.whatsapp.com/*
// @grant        none
// ==/UserScript==

//WhatsApp Web Spammer
//Insert this code into console
//This script is also available on Greasyfork:
//https://greasyfork.org/de/scripts/36066-whatsapp-web-spammer

var repeatingSpamFunction = null;
var repeatingCreateSpamButtonFunction = null;
var message = '';
var composeBarID = '_3oju3';
var inputID = '_2S1VP';
var sendButtonID = '_2lkdt';

document.onclick = function(){
  createSpamButton();
};

function createSpamButton () {
  if(document.getElementById('spamButton') != null)
    return;
  var composeBar = document.getElementsByClassName(composeBarID)[0];
  if(composeBar == null)
    return;
  composeBar.oninput = function(){
    editSpamButton();
  };
  var spamButton = document.createElement('button');
  spamButton.setAttribute("id", "spamButton");
  spamButton.innerHTML = 'SPAM';
  spamButton.style.fontSize = '100%';
  spamButton.style.padding = '0px 0px 10px 10px';
  composeBar.append(spamButton);
  editSpamButton();
}

function sendMessage () {
  var evt = new Event('input', {
    bubbles: true
  });

  var input = document.getElementsByClassName(inputID)[0];
  input.innerHTML = message;
  input.dispatchEvent(evt);

  document.getElementsByClassName(sendButtonID)[0].click();
}

function doSpam(element) {
  if(element.innerHTML == 'SPAM'){
    var input = document.getElementsByClassName(inputID)[0];
    if(input.innerHTML == '' || input.innerHTML == null){
      window.alert('Please Enter a Text to be spammed before using the spam button.');
      return;
    }
    element.innerHTML = 'STOP';
    message = input.innerHTML;
    var interval = parseInt (prompt('Please enter spam-interval:', '500'));
    repeatingSpamFunction = window.setInterval(function(){
      sendMessage();
    }, interval);
  } else {
    element.innerHTML = 'SPAM';
    window.clearInterval(repeatingSpamFunction);
  }
  editSpamButton();
}

function editSpamButton(){
  var spamButton = document.getElementById('spamButton');
  var input = document.getElementsByClassName(inputID)[0];
  if(input.innerHTML == '' || input.innerHTML == null){
    spamButton.style.cursor = 'not-allowed';
    spamButton.style.color = '#D3D3D3';
    spamButton.onclick = null;
  } else {
    spamButton.style.cursor = 'pointer';
    spamButton.style.color = '#039be5';
    spamButton.onclick = function(){
      doSpam(this);
    };
  }
}