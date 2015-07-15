var os = require('os');
var ifaces = os.networkInterfaces();

var ip = "localhost";
var port = "9090";

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0
  ;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
      ip = iface.address;
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      ip = iface.address;
    }
  });
});

//Mettre a jour pour montrer des nouvelles CODES QR a fur et mesure
//qu'il ait des nouvelles services publiés

var  publishedServices = [
{
  "id":"magestic",
  "title":"Magestic",
  "published":"18/03/2015",
  "url":ip+":"+port+"/service/magestic"
},
{
  "id":"ledbox",
  "title":"LedBox",
  "published":"XX/03/2015",
  "url":ip+":"+port+"/service/ledbox"
}
];

exports.getPublishedServices = function() {
	return publishedServices;
}

exports.getPublishedService = function(id){
	for(var i=0; i < publishedServices.length; i++) {
    if(publishedServices[i].id === id) return publishedServices[i];
  }
}