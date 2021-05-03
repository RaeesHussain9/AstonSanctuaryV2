if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Animal = require('../models/Animals');
const Request = require('../models/AdoptReq');

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureStaffAuthenticated, forwardAuthenticated } = require('../config/auth');


// RENDERS THE WELCOME LOGIN PAGE
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


//====================================================================================
//CLIENT GET ROUTES
//====================================================================================
// RENDERS THE CLIENT DASHBOARD AND ALSO FINDS THE ANIMAL DATA FROM THE MONOGDB DATABASE
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Animal.find({Adopted : false}, function(err, animals) {
    res.render('dashboard', {
      user: req.user,
      animal_list: animals
    })
  })
});

// SHOWS ALL THE REQUESTS THE USER HAS MADE
router.get('/UserReqList', ensureAuthenticated, (req, res) => {
  Request.find({whoRequested : req.user.name}, function(err, requests) {
    res.render('UserReqList', {
      user: req.user,
      userReq_list: requests
    })
  })

});


//====================================================================================
//STAFF GET ROUTES
//====================================================================================
// RENDERS THE STAFF DASHBOARD
router.get('/staffdashboard', ensureStaffAuthenticated, (req, res) =>
  res.render('staffdashboard', {
    user: req.user
  })
);

// RENDERS THE STAFF ANIMAL LIST PAGE THAT SHOWS THE LIST OF ANIMALS
router.get('/staffAnimal_list', ensureStaffAuthenticated, (req, res) => {
  Animal.find({}, function(err, animals) {
    res.render('staffAnimal_list', {
      user: req.user,
      animal_list: animals
    })
  })

});

// SHOWS THE STAFF ALL OF THE PENDING REQUESTS FROM ALL USERS
router.get('/pendingRequests', ensureStaffAuthenticated, (req, res) => {
  Request.find({RequestStatus : 'Pending'}, function(err, requests) {
    res.render('pendingRequests', {
      user: req.user,
      userReq_list: requests
    })
  })

});

// SHOWS THE STAFF MEMBERS ALL APPROVED, DENIED AND PENDING ADOPTION REQUESTS
router.get('/staffAllStatus', ensureStaffAuthenticated, (req, res) => {
  Request.find({}, function(err, requests) {
    res.render('staffAllStatus', {
      user: req.user,
      userReq_list: requests
    })
  })

});

module.exports = router;
