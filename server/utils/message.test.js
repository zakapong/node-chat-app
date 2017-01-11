var expect= require('expect');

var {generatemessage}= require('./message');

describe('generatemessage', ()=>{
  it('should generate correct message object', ()=>{
    var from= 'Jen';
    var text= 'Some message';
    var message= generatemessage(from, text);

    expect(message.createAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
