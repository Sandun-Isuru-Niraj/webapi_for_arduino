const admin = require("firebase-admin");
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


const app = express();
admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'mystore-4f9ab',
      clientEmail: 'firebase-adminsdk-uk86g@{Firebase Project ID}.iam.gserviceaccount.com',
      privateKey: ''
    
    }),
    databaseURL: "https://mystore-4f9ab.firebaseio.com"
  });

  var db = admin.database();
  var ref = db.ref("data")
//body parser middlewear
app.use(bodyparser.urlencoded({ extended: false })); 
app.use(bodyparser.json());

 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
   });

const server_port = process.env.PORT || 3002;

//home page
app.post('/data',(req,res)=>{
 
 console.log(req.body); 
 var temp = req.body.temprature;
 var hum = req.body.humidity;

 var wetherRef = ref.child("weather");
 wetherRef.set({
  
     temprature: temp,
     humidity: hum
   
 });
var switch1;
var valRef = ref.child("switch");
valRef.on("value", function(snapshot) {
  
    switch1 = snapshot.val();
});
	
var obj= object = switch1;
res.json({data:obj})	 

 }); 


app.listen(server_port,(err)=>{
    if(err){
        console.log("server error");
    }
    else{
    console.log("server started port");
    }
});
