const path= require('path');
const http= require('http');
const express= require('express');
const socketIO= require('socket.io');

const {generateMessage, generateLocationMessage}= require('./utils/message');
const {isRealString}= require('./utils/validation');
const {isUpperCaseString}= require('./utils/validation');

const {Users}=require('./utils/users');
const publicPath= path.join(__dirname, '../public');
const port= process.env.PORT || 3000;
var app= express();
var server=http.createServer(app);
var io= socketIO(server);
var users= new Users();

//console.log(__dirname+'/../public');
//console.log();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');



  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name.toLowerCase()) || !isRealString(params.room.toLowerCase())){
      return callback('Name are room are required!');
    }

 socket.join(params.room.toLowerCase());
 users.removeUser(socket.id);
 users.addUser(socket.id, params.name, params.room.toLowerCase());

 io.to(params.room.toLowerCase()).emit('updateUserList', users.getUserList(params.room.toLowerCase()));
 socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
 socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage('Admin', ` ${params.name} has joined`));
  callback();
  });

  socket.on('createMessage', (message, callback)=>{
  var user=users.getUser(socket.id);

  if(user && isRealString(message.text)){
    io.to(user.room.toLowerCase()).emit('newMessage', generateMessage(user.name, message.text));
  }

  callback();
});

socket.on('createLocationMessage', (coords)=>{
  var user= users.getUser(socket.id);

  if(user){
      io.to(user.room.toLowerCase()).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  }

});

  socket.on('disconnect', ()=>{
    //console.log('User was disconnected');
    var user=users.removeUser(socket.id);
    if(user){
      io.to(user.room.toLowerCase()).emit('updateUserList', users.getUserList(user.room.toLowerCase()));
      io.to(user.room.toLowerCase()).emit('newMessage',  generateMessage('Admin',`${user.name} has left.`));
    }
  });

 });
server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
