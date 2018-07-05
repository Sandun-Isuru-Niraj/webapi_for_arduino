#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include "ArduinoJson-v5.12.0.h"
#include "dht.h"
#define dht_apin 2

String DEVICE_ID = "4526tb254f2";
//int sensorPin = A0;
int LED = 16; 
dht DHT;


void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(115200);                                  //Serial connection

  WiFi.begin("Morasquad", "");   //WiFi connection
 
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
 
    delay(500);
    Serial.println("Waiting for connection");
 
  }


 
}
 
void loop() {
 DHT.read11(dht_apin);
 int h = DHT.humidity;
 int t = DHT.temperature;
 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
  StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
  JsonObject& JSONencoder = JSONbuffer.createObject();

  JSONencoder["devide_ID"] = DEVICE_ID;
  JSONencoder["temprature"] = t;
  JSONencoder["humidity"] = h;
  char JSONmessageBuffer[300];
  JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  //Serial.println(JSONmessageBuffer);
  
 
   HTTPClient http;    //Declare object of class HTTPClient
 
   http.begin("http://dreameffect.projects.mrt.ac.lk:3002/data");      //Specify request destination
   http.addHeader("Content-Type", "application/json");  //Specify content-type header
 
   int httpCode = http.POST(JSONmessageBuffer);   //Send the request
   String payload = http.getString();                  //Get the response payload

    StaticJsonBuffer<300> JSONbuffer2;
    JsonObject& root = JSONbuffer2.parseObject(payload);

    String data = root["data"];
    Serial.println("_____________"); 
    Serial.println(data); 
    Serial.println("_____________"); 

    if(data=="1"){
      digitalWrite(LED, HIGH);
    }else if(data=="0"){
      digitalWrite(LED, LOW);
    }
   http.end();  //Close connection
 
 }else{
 
    Serial.println("Error in WiFi connection");   
 
 }
 
  delay(200);  //Send a request every 30 seconds
 
}
