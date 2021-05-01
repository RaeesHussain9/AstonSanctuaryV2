const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//IMPORTING ANIMAL SCHEMA
const Animal = require('../models/Animals');

//CODE TO MAKE THE STAFF MEMBER ADD ANIMALS TO THE SYSTEM
router.post('/staffdashboard', (req, res) => {
    let newAnimal = new Animal ({
        animalsName : req.body.name,
        description : req.body.description,
        DOB : req.body.DOB,
        Adopted : false
    })
    newAnimal.save()
    res.redirect('/staffdashboard')
  });

  module.exports = router;