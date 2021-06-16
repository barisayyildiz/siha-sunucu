

const express = require("express");
const app = express();
const appServer = require("http").createServer(app);
const channel = require("socket.io")(appServer,{
	cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = 5555;


channel.on('connection', socket => {

	console.log(`${Date(Date.now()).toLocaleString()}: yeni bir istemci bağlandı`);

	socket.on('input road', (data) => {
		
		console.log("gelen veriler : ");
		console.log(data);

		channel.emit("output road", [
			{
				"lat" : getRandomValue(40.25,40.26),
				"lon" : getRandomValue(29.55,29.56),
				"height" : getRandomValue(10,100),
				"mode" : true
			},
			{
				"lat" : getRandomValue(40.25,40.26),
				"lon" : getRandomValue(29.55,29.56),
				"height" : getRandomValue(10,100),
				"mode" : true
			},
			{
				"lat" : getRandomValue(40.25,40.26),
				"lon" : getRandomValue(29.55,29.56),
				"height" : getRandomValue(10,100),
				"mode" : false
			}
		]
		);  // burası callback metodumuz olarak düşünülebilir

	})


	socket.on('disconnect', () => {

		console.log(`${Date(Date.now()).toLocaleString()}istemci bağlantıyı kapattı`);

	})



})

appServer.listen(PORT, () => {

	console.log(`${Date(Date.now()).toLocaleString()}: Sunucu ${PORT} nolu port üzerinden aktif konumda.`);

})

function getRandomValue(min, max)
{
	return Number((Math.random() * (min - max) + max).toFixed(4))
}
