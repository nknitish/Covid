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
 

// GET World PAGE

router.get('/world', CheakLogin, function(req, res, next) {
 
  axios.get('https://api.covid19api.com/summary')
   .then(respose => {
      //console.log(respose.data.Countries);
      res.render('world',{data: respose.data.Countries,LoginUserName: req.session.LoginUserName })
   })
   .catch(err =>{
       console.log(err);
   })


});



module.exports = router;
