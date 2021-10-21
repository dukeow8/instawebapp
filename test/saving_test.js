const assert = require('assert');
const MaessageChar = require('../models/messagechar');

// Describe our tests
describe('Saving records', function(){

  // Create tests
  it('Saves a record to the database', function(done){

    const char = new MessageChar({
      name: 'Message'
    });

    char.save().then(function(){
      assert(!char.isNew);
      done();
    });

  });

});
