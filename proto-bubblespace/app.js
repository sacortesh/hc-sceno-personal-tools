var express = require('express');
var app = express();
var hbs = require('hbs');
var services = require('./services');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var port = 9090;

function httpGet(theUrl)
{
	var xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.setRequestHeader("Accept","application/json");
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

function first(obj) {
	for (var a in obj) return a;
}



//var xmlObtained = httpGet("http://10.255.0.187:8080/rest/items");
//console.log(xmlObtained);
//var jsonTransformed = xml2json.xml2json(xmlObtained, "    ");
//console.log(jsonTransformed);



app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
app.use(express.static('public'));

//Cette partie gere les routes (adresses, etc) accesibles du serveur par un client


app.get('/', function(request, response){
	console.log("Route root detected");
	response.render(404,
	{
		title:"404 Not Found"
	});
});

app.get('/admin', function(request, response) {
	console.log("Route api detected");
	response.render('admin',
		{title:"Administration des services",
		servicesPublished:services.getPublishedServices()
	});
});

app.get('/service/:id', function(request, response) {

	var id = request.params.id;
	var xmlObtained = null;
	var transformed;
	var dataSent = null;
	var serviceValide = true;

	if (id == "magestic"){

		//Cette space est vide car toute la fonctionalité était mieux place cote client que coté serveur.
		//C'est pas toujours le même cas.

	}

	else
	{
		serviceValide = false
	}

	if (serviceValide){
		console.log("Routing to service: " + id);
		var ser = services.getPublishedService(id);
		response.render(id,
		{
			title:ser.title,
			data:dataSent
		})
	} else{
		console.log("Service " + id + " undefined");
		response.render(404,
		{
			title:"404 Not Found"
		});
	}



});
//Si la route n'est pas geré, donc afficher la page d'erreur

app.use(app.router);

app.use(function(req, res, next){
	console.log("Cannot understand request");

	res.status(404);

  // respond with html page
  if (req.accepts('html')) {
  	res.render(404, { title:"404 Not Found" });
  	return;
  }

  // respond with json
  if (req.accepts('json')) {
  	res.send({ error: 'Not found' });
  	return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(port);
console.log("Starting app on localhost: " + port);
