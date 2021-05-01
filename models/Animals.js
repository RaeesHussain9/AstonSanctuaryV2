const mongoose = require('mongoose');

//-----------
//START OF USER SCHEMA
//-----------

const animalSchema = new mongoose.Schema({
  animalsName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  DOB: {
    type: String,
    required: true
  },
  Adopted: {
    type: Boolean,
    required: true
  },
  AnimalOwner: {
    type: String,
    required: false
  }
});

const Animal = mongoose.model('Animal', animalSchema);

//------------------
//END OF USER SCHEMA
//------------------

module.exports = Animal;
