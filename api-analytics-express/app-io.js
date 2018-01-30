// app-socket.js
const ioJwt = require("socketio-jwt");
const config = require("./app-config");
var io = require("socket.io")();

//// For single-trip authentication
// app.io.use(ioJwt.authorize({
//   secret: config.jwtSecret
// })).on('authenticated', function(socket){
//   console.log(socket.decoded_token);
// });

// Multi-trip authentication
// Authenticate users first
io.sockets.on('connection', ioJwt.authorize({
    secret: config.jwtSecret,
    timeout: 3000 // 3 seconds to send the authentication message
})).on('authenticated', function (socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log(socket.decoded_token);
});

// Handle chat message
// io.on('connection', function (socket) {
//     socket.on('chat message', function (message) {
//         console.log('message ' + message);
//         app.io.emit('chat message', message)
//     })
// });

// Handle messages from Spark
module.exports = io;