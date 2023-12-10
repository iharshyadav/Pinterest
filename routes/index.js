var express = require('express');
var router = express.Router();
let userModel = require('./users');
const passport = require('passport');
const upload = require("./multer")

// user is login through this.
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate() ));

router.get('/', function(req, res, next) {
  res.render('login', {nav:false});
});

router.get('/register', function(req, res, next) {
  res.render('index' , {nav:false});
});

router.get('/profile' ,async function(req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user});
  res.render("profile",{ user , nav: true});
});

router.get('/add' ,async function(req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user});
  res.render("add",{ user , nav: true});
});

router.get('/edit' ,async function(req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user});
  res.render("edit",{ user , nav: true});
});

router.post('/fileupload',isloggedIn,upload.single("image") ,async function(req, res,next) {
  // res.send('uploaded');
 const user = await userModel.findOne({username:req.session.passport.user});
 user.profileImage = req.file.filename;
 await user.save();
 res.redirect("/profile")
});

router.post('/register',function(req,res){
  const userData = new userModel ({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
    password:req.body.password,
  })

  userModel.register(userData , req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
})

router.post('/',
passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/',
}),
function(req,res){
  res.render('login');
});

// router.get("/login",function(req,res){
//   res.render('login', { title: 'Express' });
// })

router.get('/logout',function(req,res,next){
  req.logOut(function(err){
   if(err) {return next(err);}
   res.redirect('/');
  })
})

function isloggedIn(req,res,next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
