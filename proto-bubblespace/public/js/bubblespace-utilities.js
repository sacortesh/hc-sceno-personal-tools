//Logique generale

function RTProgress(url, element, symbol, max, nextStep){

    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("Accept","application/json");
    xmlHttp.send( null );
    var xmlObtained = xmlHttp.responseText;

    var JSONData = JSON.parse(xmlObtained);
    var current = JSONData.state;
    current = parseInt(current);

    $("#" + element).css('width', current *100  / max + "%").attr('aria-valuenow', current);
    document.getElementById(element).innerHTML = current + " " + symbol;

    var t=setTimeout(function(){
        RTProgress(url,element,symbol,max,nextStep)
    }, nextStep);
}

function RTSlider(url, element, nextStep){

    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("Accept","application/json");
    xmlHttp.send( null );
    var xmlObtained = xmlHttp.responseText;

    var JSONData = JSON.parse(xmlObtained);
    var current = JSONData.state;
    current = parseInt(current);

    $("#" + element).slider('setValue', current);
    var t=setTimeout(function(){
        RTSlider(url,element,nextStep)
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

$(function(){

    $("#ledCold").slider({
        formatter: function(value) {
            return value;
        }
    });

    $("#ledCold").on("slideStop", function(slideEvt){
        onSlide("http://10.255.0.170:8080/" + "rest/items/led_cold/", slideEvt.value);
    });

    $("#fan").slider({
        formatter: function(value) {
            return value;
        }
    });

    $("#fan").on("slideStop", function(slideEvt){
        onSlide(targetURL + "rest/items/fan/", slideEvt.value);
    });
});

$( document ).ready(function () {

    RTProgress("http://10.255.0.170:8080/" + "rest/items/luminosity", "luminosityBar", "lux", 1000, 2000);
    RTProgress("http://10.255.0.170:8080/" + "rest/items/temperature", "temperatureBar", "°C", 100, 2000);
    RTProgress("http://10.255.0.170:8080/" + "rest/items/humidity", "humidityBar", " %", 100, 2000);

    RTSlider("http://10.255.0.170:8080/" + "rest/items/led_cold", "ledCold", 2000);
    RTSlider("http://10.255.0.170:8080/" + "rest/items/fan", "fan", 2000);

    RTGraphic("http://10.255.0.170:8080/" + "rrdchart.png?items=temperature,current,humidity,luminosity&period=h", "currentImage", 5000);

})
