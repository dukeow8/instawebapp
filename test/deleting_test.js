const assert = require('assert');
const MessageChar = require('../models/messagechar');

// Describe our tests
describe('Deleting messages', function(){
  var char;
  // Add a character to the db before each tests
  beforeEach(function(done){
    char = new MessageChar({
      name: 'Message'
    });
    char.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Deletes a message from the database', function(done){
    MessageChar.findOneAndRemove({name: 'message'}).then(function(){
      MessageChar.findOne({name: 'message'}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });

});
