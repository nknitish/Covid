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
router.get('/india',CheakLogin, function(req,res){

  axios.get('https://api.covid19api.com/summary')
  .then(respose => {
     //console.log(respose.data.Countries[76]);
     res.render('india',{data: respose.data.Countries[76],LoginUserName: req.session.LoginUserName })
  })
  .catch(err =>{
      console.log(err);
  })
  
})




module.exports = router;



