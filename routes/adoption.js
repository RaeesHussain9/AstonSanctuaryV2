const express = require('express');
const router = express.Router();

//IMPORTING ANIMAL SCHEMA
const Animal = require('../models/Animals');

//IMPORTING ADOPTION REQUEST SCHEMA
const Request = require('../models/AdoptReq');

//====================================================================================
//CLIENT POST ROUTES FOR ADOPTION
//====================================================================================
//DASHBOARD POST METHOD WHICH ALLOWS USER TO MAKE AN ADOPTION REQUEST
router.post('/dashboard', (req, res) => {
  let newRequest = new Request ({
    name : req.body.name,
    whoRequested : req.user.name,
    RequestStatus : 'Pending'
  })
  newRequest.save()
  res.redirect('/dashboard')
});



//====================================================================================
//STAFF POST ROUTES FOR ADOPTION
//====================================================================================
//ALLOWS STAFF TO APPROVE OR DENY A ADOPTION REQUEST
router.post('/pendingRequests', (req, res) => {
  if(req.body.AppDen == "Approved"){
    Request.findOneAndUpdate({whoRequested : req.body.Uname, name: req.body.AniName}, {RequestStatus: 'Approved'}, (error, data) => {
      if(error){
        console.log(error)
      }else{
        console.log(data)
        res.redirect('/pendingRequests')
      }
    }) 

    Animal.findOneAndUpdate({animalsName : req.body.AniName}, {Adopted: true, AnimalOwner: req.body.Uname}, (error, data) => {
      if(error){
        console.log(error)
      }else{
        console.log(data)
      }
    })
  } 

  if(req.body.AppDen == "Denied"){
    Request.findOneAndUpdate({whoRequested : req.body.Uname, name: req.body.AniName}, {RequestStatus: 'Denied'}, (error, data) => {
      if(error){
        console.log(error)
      }else{
        console.log(data)
        res.redirect('/pendingRequests')
      }
    })
  }
})


  module.exports = router;