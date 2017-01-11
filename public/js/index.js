var socket= io();
socket.on('connect', function(){
  console.log('Conected to the server');

});

socket.on('disconnect', function(){
  console.log('Disonected from the server');
});


socket.on('newMessage', function(message){

  console.log('newMessage', message);
});
