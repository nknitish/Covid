const mongoose = require('mongoose');

const loginSchema= mongoose.Schema({
    username : {type: String },
    useremail: {type: String,  index: { unique : true,}},
    userpassword : {type: String},
    date :{type : Date, default:Date.now}
})

const Login= mongoose.model('Login',loginSchema);

module.exports=Login;