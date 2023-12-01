var express = require('express');
var router = express.Router();
let userModel = require('./users');
const passport = require('passport');

// user is login through this.
const localStrategy = require("passport-local");
passport.authenticate(new localStrategy(userModel.authenticate() ));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile',isloggedIn,function(req, res, next) {
  res.send('welcome to profile')
});

router.post('/register',function(req,res){
  const userData = {
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  };
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/',
}),function(req,res){
});

router.get('/logout',function(req,res,next){
  req.logOut(function(err){
   if(err) {return next(err)};
   res.redirect('/');
  })
})

function isloggedIn(req,res){
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;
