var socket= io();
socket.on('connect', function(){
  console.log('Conected to the server');

});

socket.on('disconnect', function(){
  console.log('Disonected from the server');
});


socket.on('newMessage', function(message){

var formattedTime=moment(message.createAt).format('h:mm a');
var template= jQuery('#message-template').html();
var html=Mustache.render(template,{
  text: message.text,
  from: message.from,
  createAt: formattedTime
});

jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
  var formattedTime=moment(message.createAt).format('h:mm a');
  var template= jQuery('#location-message-template').html();
  var html=Mustache.render(template,{
    from: message.from,
    url: message.url,
    createAt: formattedTime
  });

  jQuery('#messages').append(html);
  });

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextbox= jQuery('[name=message]');
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()
  }, function(){
   messageTextbox.val('')
  });
});

var locationButton= jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by the browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
  socket.emit('createLocationMessage', {
   latitude: position.coords.latitude,
   longitude: position.coords.longitude
 });
  }, function(){
  locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
