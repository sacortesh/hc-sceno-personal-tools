//Logique generale

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

function RTSlider(url, field, element, nextStep){

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

    $("#" + element).slider('setValue', current);
    var t=setTimeout(function(){
        RTSlider(url, field, element, nextStep)
    }, nextStep);
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
    xmlHttp.setRequestHeader("Content-type","text/plain");
    xmlHttp.send(value);
    //var xmlObtained = xmlHttp.responseText;
}

