const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
//const path = require('path');
const WebSocket = require('ws');
//const history = require('connect-history-api-fallback');

//var FileSaver = require('file-saver');
//let img = '';


const app = express();
//const socketApp = express(); // for socoket.io


// middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production
if(process.env.NODE_ENV === 'production'){
    app.use(history());

    //static folder
    app.use(express.static(__dirname + '/public'));
    //socketApp.use(express.static(__dirname + '/public'))  //socket.io

    //handle SPA
    app.get(/.*/, (req,res) =>res.sendFile(__dirname + '/public/index.html'));
    //socketApp.get(/.*/, (req,res) =>res.sendFile(__dirname + '/public/index.html')); //socket.io

}


const port = process.env.PORT || 5000;

// database
const mongodb_URI = 'mongodb+srv://CircusFamily:mYIz6bPl1ZRfhbtF@cluster0-7znii.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongodb_URI || 'mongodb://localhost/circusfamily',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('MonogDB is connected');
});

//////////////////////////////////
    //timelapse upload esp32-cam
/////////////////////////////////////

const WS_PORT  = 6083;

const wsUploadServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log(`WS upload Server is listening at ${WS_PORT}`));

let connectedClientss = [];


wsUploadServer.on('connection', (ws, req)=>{

  //console.log(req.url);
  //var webURL =req.url
  connectedClientss.push( ws);


  
//console.log(connectedClients);

// connectedClients.forEach((obj,) => {

//   console.log(obj.webURL);
//  });
   
  ws.on('message', data => {
     //var cameraURL =req.url


     connectedClientss.forEach((ws,i)=>{
      if(ws.readyState === ws.OPEN){
          ws.send(data);
      }else{
          connectedClientss.splice(i ,1);
      }
     })


   
        // connectedClients.forEach((obj,i)=>{
        //      if(obj.ws.readyState === obj.ws.OPEN){ //controleerd of er een verbinding is
        //       if(obj.webURL == cameraURL){ // kijkt of de webURL uit de array overeen komt met de inkomende url data (camera beeld url)
        //           obj.ws.send(data); // send img to 

        //           //console.log(obj.webURL+"is gelijk aan inkomnde video: "+ cameraURL);
        //       }
             
        //      }else{
        //          connectedClients.splice(i ,1);
        //      }
        //  })
        
     });
    
});

//app.get('/client',(req,res)=>res.sendFile(path.resolve(__dirname, './client.html')));
  
//////////////////////////////////////
    // end timelapse upload esp32-cam
//////////////////////////////////////////



////////////////////////////////////
       // begin live stream  video en data
//////////////////////////////////
const debug = require('debug');

const info = debug('app:server:info');
const warn = debug('app:server:warn');


const wsport = 4083; // live stream port
const server = http.createServer(app);

const sockets = new Map(); //webrtc video live stream
const sockets2 = new Map(); //webrtc data stream

const cameras = new Set();
const screens = new Set();

const controllers = new Set();
const Raspberrypis = new Set();

const setByType = {
  camera: cameras,
  screen: screens,
};

const setByTypeData = {
  controller: controllers,
  Raspberrypi: Raspberrypis,
};

// server.listen(
//     wsport,
//   () => info(`listening on port ${wsport}`)
// );

const wsServer1 = new WebSocket.Server({ noServer: true }); // server voor webRTC live video stream
const wsServer2 = new WebSocket.Server({ noServer: true }); // server voor webRTC live data stream van controller naar IP-Car

let connectedClients = [];

// webrtc live video stream
wsServer1.on('connection', (socket,req) => {
  let peerId;
  var webURL =req.url
  
  //connectedClients.push({ socket,webURL});
  const onMessage = (e) => {
    connectedClients.push(e);
 
      //var cameraURL =req.url
         // console.log(cameraURL);
      //  connectedClients.forEach((obj,i)=>{
      //          if(obj.socket.readyState === obj.socket.OPEN){ //controleerd of er een verbinding is
      //           if(obj.webURL == cameraURL){ // kijkt of de webURL uit de array overeen komt met de inkomende url data (camera beeld url)
                    //obj.socket.send(e); // send img to 

                   // console.log(obj.webURL+"is gelijk aan inkomnde video: "+ cameraURL);
         

         // code hierboven toegevoegd
    const msg = JSON.parse(e);
   

    if (msg.type === 'register') {
      peerId = msg.peerId;
      const { peerType } = msg;

      info(`${peerType} registered, id: ${peerId}`);

      setByType[peerType].add(peerId);
      sockets.set(peerId, socket);

     // console.log( sockets);

      if (peerType === 'camera') {
        socket.send(JSON.stringify({
          type: 'screens',
          screens: Array.from(screens), // send evry body who is watching to the tream
        }));
      }

      if (peerType === 'screen') {
        for (let cameraId of cameras) {
          const cameraSocket = sockets.get(cameraId);
          if (cameraId == peerId.slice(0, 5)){ // als de camera id en  car id het zelfde zijn stuur dan de screenId (broadcast car)
            cameraSocket.send(JSON.stringify({
              type: 'screens',
              screens: [ peerId ],
            }));
          }
           else{
            console.log("camera ID "+cameraId +"is niet het zelfde als " + peerId.slice(0, 5));
            }
        
        }
      }
    }

    if (msg.type === 'offer') {
      var selectedCar = msg.to
      if(msg.from == selectedCar.slice(0, 5) ){ /// vergelijkt het camera beeld met de geselcteerde auto
         console.log("camera en beeld zijn het zelfde");
        info(`camera ${msg.from} sent offer to screen ${msg.to}`);
        if (!screens.has(msg.to)) {
          warn(`offer sent to screen ${msg.to} that's not registered`);
          return;
        }

        var selectedCar = msg.to

        console.log(`camera ${msg.from} sent offer to screen ${selectedCar}`);
        const socket = sockets.get(msg.to);
        socket.send(JSON.stringify(msg));
      }
    }

    if (msg.type === 'answer') {
     // console.log("antwoord ontvangen van scherm en stuur naar car")
        info(`screen ${msg.from} sent answer to camera ${msg.to}`);
        if (!cameras.has(msg.to)) {
          warn(`offer sent to camera ${msg.to} that's not registered`);
          return;
        }

      const socket = sockets.get(msg.to);
      socket.send(JSON.stringify(msg)); 
      
    }

    if (msg.type === 'candidate') {
     // console.log(msg)
      info(`ice candidate from ${msg.from} to ${msg.to}`);
      const socketTo = sockets.get(msg.to);

      if (!socketTo) {
        warn(`candidate sent to ${msg.to}, that's not registered`);
        return;
      }

      socketTo.send(JSON.stringify(msg));
    }

  // }
             
  //   }else{
  //     console.log(obj.webURL+"is niet gelijk aan: "+ cameraURL);
  //       connectedClients.splice(i ,1);
  //   }
  //   })
  };


  const onClose = () => {
    info(`socket closed ${peerId}`);

    let sendDisconnectTo;
    if (screens.has(peerId)) {
      sendDisconnectTo = cameras;
    }

    if (cameras.has(peerId)) {
      sendDisconnectTo = screens;
    }

    for (let targetId of sendDisconnectTo) {
      sockets.get(targetId).send(JSON.stringify({
        type: 'disconnect',
        from: peerId
      }));
    }

    socket.off('message', onMessage);
    socket.off('close', onClose);

    cameras.delete(peerId);
    screens.delete(peerId);
    sockets.delete(peerId);
  };

  socket.on('message', onMessage);
  socket.on('close', onClose);
}); /// einde wsServer1 ///////////////////////////////////////////////////

//webrtc data stream van controller
wsServer2.on('connection', (socket,req) => {

  let peerId;
  var webURL =req.url
  
  //connectedClients.push({ socket,webURL});
  const onMessage = (e) => {
    const msg = JSON.parse(e);
   
   console.log(msg.peerType)

    if (msg.type === 'register') {
      peerId = msg.peerId;
      const { peerType } = msg;

      info(`${peerType} registered, id: ${peerId}`);
    console.log(msg.peerId)
     setByTypeData[peerType].add(peerId);
      sockets2.set(peerId, socket);

     // console.log( sockets);

      if (peerType === 'controller') {
        socket.send(JSON.stringify({
          type: 'Raspberrypis',
          Raspberrypis: Array.from(Raspberrypis), // send IPCar data naar de controller
        }));
      }

      if (peerType === 'Raspberrypi') {
        for (let controllerId of controllers) {
          console.log(peerId.slice(0, 5)) 
          const controllerSocket = sockets2.get(controllerId);
          if (controllerId == peerId.slice(0, 5)){ // als de controller id en  car id het zelfde zijn stuur dan de ipcarId (broadcast car)
            console.log("Raspberry Pi en controller hebben de zelfde peerID")
         
            controllerSocket.send(JSON.stringify({
              type: 'Raspberrypis',
              Raspberrypis: [ peerId ],
            }));
          }
           else{
            console.log("controller ID "+controllerId +"is niet het zelfde als " + peerId);
            }
        
        }
      }
    }

    if (msg.type === 'offer') {
      var selectedCar = msg.to
      if(msg.from == selectedCar.slice(0, 5)){ /// vergelijkt het controller beeld met de geselcteerde auto
         console.log("controller en raspberry pi zijn het zelfde");
        info(`controller ${msg.from} sent offer to ipcar ${msg.to}`);
        if (!ipcars.has(msg.to)) {
          warn(`offer sent to ipcar ${msg.to} that's not registered`);
          return;
        }

        var selectedCar = msg.to

        console.log(`controller ${msg.from} sent offer to raspberrypi ${selectedCar}`);
        const socket = sockets2.get(msg.to);
        socket.send(JSON.stringify(msg));
      }
    }

    if (msg.type === 'answer') {
     // console.log("antwoord ontvangen van scherm en stuur naar car")
        info(`ipcar ${msg.from} sent answer to controller ${msg.to}`);
        if (!controllers.has(msg.to)) {
          warn(`offer sent to controller ${msg.to} that's not registered`);
          return;
        }

      const socket = sockets2.get(msg.to);
      socket.send(JSON.stringify(msg)); 
      
    }

    if (msg.type === 'candidate') {
      console.log(`ice candidate from ${msg.from}`)
      info(`ice candidate from ${msg.from} to ${msg.to}`);
      const socketTo = sockets2.get(msg.to);

      if (!socketTo) {
        warn(`candidate sent to ${msg.to}, that's not registered`);
        return;
      }

      socketTo.send(JSON.stringify(msg));
    }
  };


  const onClose = () => {
    info(`socket closed ${peerId}`);

    let sendDisconnectTo;
    if (Raspberrypis.has(peerId)) {
      sendDisconnectTo = controllers;
    }

    if (controllers.has(peerId)) {
      sendDisconnectTo = Raspberrypis;
    }

    for (let targetId of sendDisconnectTo) {
      sockets2.get(targetId).send(JSON.stringify({
        type: 'disconnect',
        from: peerId
      }));
    }

    socket.off('message', onMessage);
    socket.off('close', onClose);

    controllers.delete(peerId);
    Raspberrypis.delete(peerId);
    sockets2.delete(peerId);
  };

  socket.on('message', onMessage);
  socket.on('close', onClose);

}); /// einde wsServer2//////////////////////////////////////

// upgrade om meerdere websockers servers mogelijk te maken
server.on('upgrade', function upgrade(request, socket, head) {
 // console.log(request.url)
 
if (request.url == '/ipcar'){ // webrtc live video stream
  wsServer1.handleUpgrade(request, socket, head, function done(ws) { 
    //console.log(request.url)
    wsServer1.emit('connection', ws, request);
    });
  }
if (request.url == '/controller'){ // webrtc live  data stream
    wsServer2.handleUpgrade(request, socket, head, function done(ws) { 
      //console.log(request.url)
      wsServer2.emit('connection', ws, request);
      });
    }
 
});

server.listen(4083);
////////////////////////////////////
       // einde live stream  video en data
//////////////////////////////////
     
var osc = require("osc");
//WebSocket = require("ws");
 

/// OSC websocket//
//--------------------------------------------------
//  Bi-Directional OSC messaging Websocket <-> UDP
//--------------------------------------------------


 var getIPAddresses = function () {
     var os = require("os"),
     interfaces = os.networkInterfaces(),
     ipAddresses = [];

     for (var deviceName in interfaces){
         var addresses = interfaces[deviceName];

         for (var i = 0; i < addresses.length; i++) {
             var addressInfo = addresses[i];

             if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                 ipAddresses.push(addressInfo.address);
             }
         }
     }

     return ipAddresses;
 };

 var udp = new osc.UDPPort({
     localAddress: "0.0.0.0", // this is the server side /0.0.0.0.0
     localPort: 5000,
     remoteAddress: "94.168.120.14", // local 127.0.0.1 online Ip where the OSC data should be sended to thuis 62.238.120.14 studio 94.168.120.14
     remotePort: 7500
 });

 udp.on("ready", function () {
     var ipAddresses = getIPAddresses();
     console.log("Listening for OSC over UDP.");
     ipAddresses.forEach(function (address) {
         console.log(" Host:", address + ", Port:", udp.options.localPort);
     });
     console.log("Broadcasting OSC over UDP to", udp.options.remoteAddress + ", Port:", udp.options.remotePort);
 });

 udp.open();

 var wss = new WebSocket.Server({
     port: 8083
 });

 wss.on("connection", function (socket) {
     console.log("A Web Socket connection has been established!");
     var socketPort = new osc.WebSocketPort({
         socket: socket
     });

     var relay = new osc.Relay(udp, socketPort, {
         raw: true
     });
});


///////////////////////////////////////
  // IP-Car
//////////////////////////////
const userCountserver = http.createServer(app);
const io = require("socket.io")(userCountserver, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const raumRooms = ["clientRoom"]

io.on("connection",(socket)=>{
 //var room = io.sockets.adapter.rooms[''];
  socket.emit("welcome", "Hello and welcome to the ip car socket.io");

  // incoming data from controller

  
    socket.on("controllerInput",(controllerData)=>{
      //console.log(controllerData)
      io.volatile.emit("inputRaspberrypi", controllerData);
       // deze data is van de controller en gaat naar de Raspberry pi om de auto aan te sturen
      
    });

  socket.on("joinIPcar",(room)=>{
    if(raumRooms.includes(room)){
       socket.join(room);
       io.of("/ipcar").to(room).emit("newUser", "new visistor has joined the room " + room)  //melding nieuwe deelnemer

       io.of('/ipcar').in(room).clients((error, clients) => { // get all the clients which are connected with the room: clientRoom
         if (error) throw error;
         io.of("/ipcar").to(room).emit("clientList", clients)  // sends/emits a array with all the clients
        // console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
       });
     
       /// enf of code get all users in room

       return socket.emit("succes","You have succesfully joined the room " + room);
    }else{
      return socket.emit("err","Error: No room named " + room);
    }
 });



  //socket.disconnect();
    socket.on('disconnect', (reason) => {
  //    io.of('/ipcar').in("clientRoom").clients((error, clients) => { // get all the clients which are connected with the room: clientRoom
  //      if (error) throw error;
  //      io.of("/ipcar").to("clientRoom").emit("clientList", clients)  // sends/emits a array with all the clients

  //       // => [Anw2LatarvGVVXEIAAAD]

  //        // maakt verbinidng met deze server en stuurt via OSC de huidige lijst met klanten naar de studio in amsterdam
  //     //console.log('user disconnected');
  //    });

     console.log("Car Disconnect: " + reason);
 });
});  





userCountserver.listen(6583,() => console.log('vister counter RAUM is listening on port: 6500'))

/// einde registratie bezoekers

///////////////////////////////////////
  // RPLidar sensor (school project)
//////////////////////////////

const rplidarserver = http.createServer(app);
const lidarIO = require("socket.io")(rplidarserver); 

const lidarRooms = ["clientRoom"]

lidarIO.on("connection",(socket)=>{
 //var room = io.sockets.adapter.rooms[''];
  socket.emit("welcome", "Hello and welcome to the RPlidar sensor socket.io");

  // incoming data from controller

     // send data from raspberrypi naar webpagina
    socket.on("lidardata",(incomingLidarData)=>{
      //console.log(controllerData)
      lidarIO.emit("inputLidar", incomingLidarData);
       // deze data is van de controller en gaat naar de Raspberry pi om de auto aan te sturen
      
    });

  socket.on("joinIPcar",(room)=>{
    if(lidarRooms.includes(room)){
       socket.join(room);
       lidarIO.of("/ipcar").to(room).emit("newUser", "new visistor has joined the room " + room)  //melding nieuwe deelnemer

       lidarIO.of('/ipcar').in(room).clients((error, clients) => { // get all the clients which are connected with the room: clientRoom
         if (error) throw error;
         lidarIO.of("/ipcar").to(room).emit("clientList", clients)  // sends/emits a array with all the clients
        // console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
       });
     
       /// enf of code get all users in room

       return socket.emit("succes","You have succesfully joined the room " + room);
    }else{
      return socket.emit("err","Error: No room named " + room);
    }
 });



  //socket.disconnect();
    socket.on('disconnect', (reason) => {
  //    io.of('/ipcar').in("clientRoom").clients((error, clients) => { // get all the clients which are connected with the room: clientRoom
  //      if (error) throw error;
  //      io.of("/ipcar").to("clientRoom").emit("clientList", clients)  // sends/emits a array with all the clients

  //       // => [Anw2LatarvGVVXEIAAAD]

  //        // maakt verbinidng met deze server en stuurt via OSC de huidige lijst met klanten naar de studio in amsterdam
  //     //console.log('user disconnected');
  //    });

     console.log("Lidar Disconnect: " + reason);
 });
});  





rplidarserver.listen(6683,() => console.log('vister counter RAUM is listening on port: 6500'))


// rplidar sensor school project


// end OSC websocket 
app.listen(port,()=>console.log(`Server started on port ${port}`));