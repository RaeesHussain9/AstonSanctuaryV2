const mongoose = require('mongoose');

//---------------------------------
//START OF ADOPTION REQUEST SCHEMA
//---------------------------------

const adoptReqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  whoRequested: {
    type: String,
    required: true
  },
  RequestStatus:{
    type: String,
    required: true 
  }
});

const Request = mongoose.model('Request', adoptReqSchema, 'requests');

//------------------------------
//END OF ADOPTION REQUEST SCHEMA
//------------------------------

module.exports = Request;
