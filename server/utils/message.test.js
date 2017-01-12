var expect= require('expect');

var {generateMessage,generateLocationMessage }= require('./message');

describe('generatemessage', ()=>{
  it('should generate correct message object', ()=>{
    var from= 'Jen';
    var text= 'Some message';
    var message= generateMessage(from, text);

    expect(message.createAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});


describe('generateLocationMessage', ()=>{
it('should generate correct location object', ()=>{
var from= 'Dev'
  var latitude= 55;
  var longitude= 13;
  var url='https://www.google.com/maps?q=55,13';
  var message= generateLocationMessage(from, latitude, longitude);

  expect(message.createAt).toBeA('number');
  expect(message).toInclude({from, url});

});
});
