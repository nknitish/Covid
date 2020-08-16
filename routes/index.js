var express = require('express');
var router = express.Router();
const db= require('./MongoDB');
const Login= require('./../Model/login');
const bcrypt = require('bcrypt');
var session = require('express-session');  // session

const app= express();   

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))




//Middlewere 1 // CheakEmail

//Cheak Registration MidleWhere
const cheakEmail=(req,res,next)=>{

  const email= req.body.useremail;
  var cheak= Login.findOne({useremail: email} ,(err, result)=>{

    if(err) throw err;
    if (result)
    return res.render('signup',{msg : "Emailid Already Exist"});
    else next();

  });
}

//Cheak Login
const cheakLogin=(req,res,next)=>{

  const email= req.body.useremail;
  const password= req.body.userpassword;
    Login.findOne({useremail: email} ,(err, result)=>{
    if(err) throw err;
    if (result)
     {
        if(bcrypt.compareSync(password,result.userpassword))
        { 
          req.session.LoginUserName=result.username;  // Seting Session
         // console.log(req.session.LoginUserName);
          res.redirect('/dashboard');
        }
        else
        return res.render('index', { msg:"Password Do not Match" });
     } 
     else
     {
       return res.render('index', {msg:"Invalid Email Id" });
     }

  });
}



// GET LOGIN PAGE
router.get('/', function(req, res, next) {
  res.render('index',{msg :""});
});


//POST LOGIN PAGE 

router.post('/',cheakLogin, function(req, res, next) {   });


//GET SIGNUP PAGE/
router.get('/signup', function(req, res, next) {
  res.render('signup', { msg:"" });
});



//POST SIGNUP PAGE
router.post('/signup', cheakEmail, function(req, res, next) {
  const data={
    username: req.body.username,
    useremail: req.body.useremail,
    userpassword: req.body.userpassword,
    cnfpassword : req.body.cnfpassword,
  }
 
  console.log(data);
  if (data.userpassword===data.cnfpassword)
  {
      data.userpassword= bcrypt.hashSync(data.userpassword,10);
    
      new Login(data).save((err,result)=>{
      if(err) throw err;
      else if (result)
      res.render('signup' , { msg:"Record Inserted Sucessfully"})

      })
  }
  else
  res.render('signup' , { msg:"Password Do Not Match"})
    

});


module.exports = router;
