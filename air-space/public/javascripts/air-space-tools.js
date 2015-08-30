//Logique generale
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}




function RTProgress(url, element, field, symbol, max, nextStep){

    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("Accept","application/json");
    xmlHttp.send( null );
    var xmlObtained = xmlHttp.responseText;

    var JSONData = JSON.parse(xmlObtained);
    var current = JSONData[field];
    current = parseInt(current);

    console.log(current);

    $("#" + element).css('width', current *100  / max + "%").attr('aria-valuenow', current);
    $("#" + element).html = current + " " + symbol;

    var t=setTimeout(function(){
        RTProgress(url, element, field, symbol, max, nextStep)
    }, nextStep);
}

function RTSlider(url, field, element){

    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("Accept","application/json");
    xmlHttp.send( null );
    var xmlObtained = xmlHttp.responseText;
    console.log(url);

    console.log(xmlObtained);


    var JSONData = JSON.parse(xmlObtained);
    var current = JSONData[field];
    current = parseInt(current);

    return current;
}

function RTGraphic(url, element, nextStep){

    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var complement = Math.floor((Math.random() * 100000) + 1);


    $("#" + element).attr('src', url  + "&rdm=" + complement);
    var t=setTimeout(function(){
        RTGraphic(url,element,nextStep)
    }, nextStep);
}

function onSlide(url, value){
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true );
    xmlHttp.setRequestHeader("Content-type","application/json");
    xmlHttp.send(value);
}

