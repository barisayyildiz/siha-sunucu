// Bize veri gönderecek masa hakemleri
let socket = require('socket.io-client')('http://localhost:5555');

const express = require("express");
const app = express();
const appServer = require("http").createServer(app);

const PORT = 8080;

// örnek simülasyon verimiz
let droneData = {
	"lat" : 40.9126844,
	"lon" : 29.10498,
	"height" : 50,
	"mode" : false
}

appServer.listen(PORT, () => {
	console.log(`${Date(Date.now()).toLocaleString()}: Sunucu ${PORT} nolu port üzerinden aktif konumda.`);
})

// Her 5 saniyede bir çalışacak bir fonksiyon.
setInterval(function () {
	// Rastgele veriler üretiyoruz.

	droneData.lat = getRandomValue(40.25,40.26);
	droneData.lon = getRandomValue(29.55,29.56);
	droneData.height = getRandomValue(10,100);
	droneData.mode = getRandomValue(0,1) > 0.5 ? true : false;

	// Oluşturduğumuz rastgele verileri hakem sunucusuna yolluyoruz
	socket.emit("input road", droneData);
}, 2000);


function getRandomValue(min, max)
{
	return Number((Math.random() * (min - max) + max).toFixed(4))
}
