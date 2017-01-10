var socket= io();
socket.on('connect', function(){
  console.log('Conected to the server');
  // socket.emit('createEmail',{
  //   to: 'jen@yahoo.com',
  //   text: 'Hey, this is Zack.'
  // });

socket.emit('createMessage',{
  from: 'zack@gmail.com',
  text: 'Hey, this is Zack from chat app.'
});
});

socket.on('disconnect', function(){
  console.log('Disonected from the server');
});

// socket.on('newEmail', function(email){
//
//   console.log('New email', email);
// });

socket.on('newMessage', function(message){

  console.log('newMessage', message);
});
