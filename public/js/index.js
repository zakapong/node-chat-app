var socket= io();
socket.on('connect', function(){
  console.log('Conected to the server');

});

socket.on('disconnect', function(){
  console.log('Disonected from the server');
});


socket.on('newMessage', function(message){

  console.log('newMessage', message);
  var li= jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  });
});