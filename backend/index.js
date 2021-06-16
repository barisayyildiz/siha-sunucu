// Bize veri gönderecek masa hakemleri
let socket = require('socket.io-client')('http://localhost:5555');

const express = require("express");
const app = express();
const appServer = require("http").createServer(app);
const channel = require("socket.io")(appServer,{
	cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = 8080;

// örnek simülasyon verimiz. Hız, devir ve motor sıcaklığı gibi
let droneData = {
	"lat" : 40.9126844,
	"lon" : 29.10498
}

let engineData = {
	"speed": 0,
	"rpm": 0,
	"heat": 0
};

appServer.listen(PORT, () => {
	console.log(`${Date(Date.now()).toLocaleString()}: Sunucu ${PORT} nolu port üzerinden aktif konumda.`);
})

// Her 5 saniyede bir çalışacak bir fonksiyon.
setInterval(function () {
	// Rastgele veriler üretiyoruz.
	engineData.speed = getRandomValue(70, 180);
	engineData.rpm = getRandomValue(1000, 10000);
	engineData.heat = getRandomValue(100, 500);

	droneData.lat = getRandomValue(40.25,40.26);
	droneData.lon = getRandomValue(29.55,29.56);

	// Veriyi emit metodu ile "input road" namespace'ini kullanarak sunucuya yolluyoruz
	// oradaki callback'de devreye girip bu veriyi bağlı olan diğer istemcilere 
	// (output road, namespace'ini kullanan) yayınlayacak.
	socket.emit("input road", droneData);
}, 2000);


channel.on('connection', mysocket => {
	console.log('front end bağlandı');

	socket.on('output road', data => {
		console.log("all drone datas : ", data);
		mysocket.emit("frontend data", data);
	})
})

function getRandomValue(min, max)
{
	return Number((Math.random() * (min - max) + max).toFixed(4))
}
