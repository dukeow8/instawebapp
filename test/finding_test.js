const assert = require('assert');
const MessageChar = require('../models/messagechar');

// Describe our tests
describe('Finding messages', function(){
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
  it('Finds a record from the database', function(done){
    MessageChar.findOne({name: 'Message'}).then(function(result){
      assert(result.name === 'Message');
      done();
    });
  });

  it('Finds a record by unique id', function(done){
    Message.findOne({_id: char._id}).then(function(result){
      assert(result._id.toString() === char._id.toString());
      done();
    });
  });

});
