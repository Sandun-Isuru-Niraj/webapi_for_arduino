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
 var dev_id = req.body.devide_ID;
 var temp = req.body.temprature;
 var hum = req.body.humidity;

 var ref = db.ref(dev_id)

 var wetherRef = ref.child("weather");
 wetherRef.set({
  
     temprature: temp,
     humidity: hum
   
 });

 var EventAddRef = ref.child("events");
 var TrigerRef = ref.child("triger");
 var valRef = ref.child("switch");

 EventAddRef.on("value", function(snapshot) {
  
    if(!snapshot.exists()){
 
    }else{

    if(snapshot.child("has").val() == "1"){

        if(snapshot.child("data").val() == "temp"){
            if(snapshot.child("operator").val() == "<"){
                if(parseInt(snapshot.child("value").val()) <= parseInt(temp)){
                    TrigerRef.set(1);
                    valRef.set(1);

                }else{
                    TrigerRef.set(0);
                    valRef.set(0);
                }

            }else if(snapshot.child("operator").val() == ">"){
                if(parseInt(snapshot.child("value").val()) >= parseInt(temp)){
                    TrigerRef.set(1);
                    valRef.set(1);

                }else{
                    TrigerRef.set(0);
                    valRef.set(0);
                }
            }
        }else if(snapshot.child("data").val() == "hum"){
            if(snapshot.child("operator").val() == "<"){
                if(parseInt(snapshot.child("value").val()) <= parseInt(temp)){
                    TrigerRef.set(1);
                    valRef.set(1);

                }else{
                    TrigerRef.set(0);
                    valRef.set(0);
                }

            }else if(snapshot.child("operator").val() == ">"){
                if(parseInt(snapshot.child("value").val()) >= parseInt(temp)){
                    TrigerRef.set(1);
                    valRef.set(1);

                }else{
                    TrigerRef.set(0);
                    valRef.set(0);
                }
            }
        }
    }else{

    }
}
});



var switch1;
var valRef = ref.child("switch");


valRef.on("value", function(snapshot) {
  
    if(!snapshot.exists()){
        valRef.set(0);
    }else{
    switch1 = snapshot.val();
    }
});

var obj= object = switch1;


res.json({
    data:obj
})	 

 }); 




app.listen(server_port,(err)=>{
    if(err){
        console.log("server error");
    }
    else{
    console.log("server started port");
    }
});