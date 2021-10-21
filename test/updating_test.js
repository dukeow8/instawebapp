const assert = require('assert');
const MessageChar = require('../models/messagechar');

// Describe our tests
describe('Updating records', function(){
  var char;
  // Add a character to the db before each tests
  beforeEach(function(done){
    char = new MessageChar({
      name: 'Message',
      weight: 50
    });
    char.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Updates the name of a record', function(done){
      MessageChar.findOneAndUpdate({name: 'Message'}, {name: 'james'}).then(function(){
          MessageChar.findOne({_id: char._id}).then(function(result){
              assert(result.name === 'Luigi');
              done();
          });
      });
  });

 it('Adds 1 to the weight of every record', function(done){
    MessageChar.update({}, { $inc: { weight: 1 } }).then(function(){
        MessageChar.findOne({name: 'Message'}).then(function(record){
            assert(record.weight === 51);
            done();
        });
    });
 });


});
