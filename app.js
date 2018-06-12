const admin = require("firebase-admin");
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


const app = express();
admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'mystore-4f9ab',
      clientEmail: 'firebase-adminsdk-uk86g@mystore-4f9ab.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+FFrckyOd1r4w\nTQUdcsyGo2N4VtIMZZOtpCTrKmgSczy47YEavFLLOnn+6zGZMeV18NVJOjphFrEE\nXLgxyXPGS9eRny5RkCgQXFaVD6BXguoa4crrgzy+XFFd2Kaw5RMO+JAAJh7adZ86\naw/ot2X35r+aGs4sbB95S8tt7l00yMD87MvIG11BU0D/xZdhiI1ITO+vwsmv88GP\nMHzf0rPLIgpNSmuDVcvFdONifpceYGLrQtzYzbCTDr7fEgxZu44SF9awSjqbuuZp\nQhYyU3U5GSk60C7IFczB37INvxWVRmM0sXwvLIR+MtOEuCUXyE0ps82QqhJQAhzI\nEAaIA4ZJAgMBAAECggEAAnOJDkbAjplruAMpmfX4K9qAbsW9h+0XX3r/kH/Gtruk\nv7Se96Els3kr59iNZKByghKNYdS5ekOIDfijh6S62eayPYsDnZ1NfzCg/ypujKSX\nKqpHQixPpY1v+83rCTAQNaZQZIvga0p19AVJ6nFvmXmimgT+D7bnayxNdvg8OOZ6\n6jAIKcOpjIlS3Z5Cvnr+0np/kvnoaRxSKxiC7kEi9Jv7UKGQN0KqHkhCGjIuHjvS\nO+USCBWMRbPOdjc2eQrGpOlVHwSzL2hyzE3+i4h/yNsx5b4u4bTCoslfgm4cDBGP\nTe/OiVHKb5DXX2ntgobmfdsqFTKcj4RX2FkM5x9YAQKBgQDklmcmPs/yaQWxYlH0\nIEC8CFrspy8DNsFqiH3MUpSZ4jHEpD2QmkT3dhwmYM9Lsn4gt4FOK7OOBF1y5qbu\nMMP4ZBOSXHu+cK7dSJLcQ2d66yTCE7qc2hFbI2o8zS3aL01l0dPf/LWxJj2LXKo2\nBELCCYkp5ByA1ue5OwQQLPP4AQKBgQDU38NX5bjAVMsFuS/mBUGMz+U1AY6n+xBS\nqve5gNmPnWkqoXoT7/JPyOYv1HBE4XAJDLZrOGAiY5cpCc+33me2a27wUt4x5I74\neu4HnXjWJfZLf7Che39PmclXaNMVrRhU3Eegfe/kpdTdmF3R7ZLStjloN9vkq8l6\nYfQwbOHOSQKBgAnEI0QPCvNgaU3a1YWImzttX/Ucb3XDsR/MFRPVs2OftmCgY8D5\n1lh8Q1egazrgtWLQdEXSuCkpJpTyJc+nZbgHDo8CRIcuaUoq/5tJhfJKeZeRIDfz\nWSp7qN5QJdVckAH5pQO82EZpS9fYba1BIVkI70NK66zVgbD4RIQsZ4ABAoGAbyes\njAAzOZLNNF7fqP+Dm/COod//Sq2pd1E4649hi0FJwe3xnemEIK8pqz4FpaIF62PM\n+S3F3Q8dxlsOMNecVj/A/RJ4XZsYIJ2oHyfWChRmiEPTym5/KuSFovPkjQQGmYEw\nkZhRJJaHEXLXQqAIM6jdTxMj6kLdgN8XMBYazqkCgYEAm650Yw4EXBjfZ+54vr2G\nwjmXk2sO+fMd3cPRw8WktTeDR+xS8T368uZ0NPazxRaz3Dvf/ISYBhO2heS6cmNS\nCwnmz7D2HooeXwiVPBiOk/HLosJBgW1E7tkNa+BSgF1AI3r7Ip5I3zpCb0Vj1xnI\nm8jCjFFHceLs3YcK+St0PUA=\n-----END PRIVATE KEY-----\n'
    
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
