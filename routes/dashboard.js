var express = require('express');
var router = express.Router();
const axios = require('axios');

//Cheaking Authentication
const CheakLogin=(req,res,next)=>{
  try {
    
    if(req.session.LoginUserName)
     next();
    else
    res.redirect('/');   
  } catch (error) {
    res.redirect('/'); 
  }
};


//GET DASHBOARD
router.get('/dashboard',CheakLogin, (req,res)=>{

  axios.get('https://api.covid19api.com/summary')
  .then(respose => {
     console.log(respose.data.Global);
     res.render('dashboard',{data: respose.data.Global,LoginUserName: req.session.LoginUserName })
  })
  .catch(err =>{
      console.log(err);
  })

})



//Log out
router.get('/logout', function(req, res, next) {
  req.session.destroy((err)=>{
    console.log("Session Destroyed")
    res.redirect('/');
  })
  
});


module.exports = router;



