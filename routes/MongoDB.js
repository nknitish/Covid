var mongoose = require('mongoose');
const url="mongodb+srv://root:9621@myfirstcluster.c2dzl.mongodb.net/Covid?retryWrites=true&w=majority";

mongoose.connect(url,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,});

const db= mongoose.connection;

db.on('connected',()=>console.log("Connected With Database"))
db.on('disconnected',()=>console.log("DisConnected With Database"))
db.on('error',(err)=>console.log("Error While Connecting With Database"+err))

db.once('open',(err, res)=>console.log("Connected With Database and Table"))

module.exports=db;