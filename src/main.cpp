#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Muuuuuu"
#define WIFI_PASSWORD "123456vvvv"

// Insert Firebase project API Key
#define API_KEY """"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL """""" 
///////////////////////////////////////////////////////////////////7//

#include <PubSubClient.h>

#include <SPI.h>
//dht11
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

//bmp180
#include <Adafruit_BMP085.h>
WiFiClient espClient;
PubSubClient client(espClient);
//////////////////////////////////////////////////

#define rainAnalog 35
#define rainDigital 25
#define DHTPIN 13     
int UVOUT = 32; //Output from the sensor
int REF_3V3 = 33; //3.3V power on the ESP32 board
#define LDR 34


#define rain

// Uncomment whatever type you're using!
#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP085 bmp;
//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;

#define Photoresistor 12

void setup(){
   Serial.begin(9600);
  /////////
   pinMode(UVOUT, INPUT);
  pinMode(REF_3V3, INPUT);

   Serial.println(F("DHTxx test!"));
  pinMode(rainDigital,INPUT);
  dht.begin();
  if (!bmp.begin())
  {
    Serial.println("Could not find BMP180 or BMP085 sensor at 0x77");
    while (1) {}
  }
   
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

/////////////
int averageAnalogRead(int pinToRead)
{
  byte numberOfReadings = 8;
  unsigned int runningValue = 0; 
 
  for(int x = 0 ; x < numberOfReadings ; x++)
    runningValue += analogRead(pinToRead);
  runningValue /= numberOfReadings;
 
  return(runningValue);
}
 
float mapfloat(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
 
/////////////

void loop(){
  //////////////////////////////////////////////////////////
  for(int i=1;i<=4;i+=1){
  int rainAnalogVal = analogRead(rainAnalog);
  int rainDigitalVal = digitalRead(rainDigital);
  
  int uvLevel = averageAnalogRead(UVOUT);
  int refLevel = averageAnalogRead(REF_3V3);

  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  char h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  char t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  char f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  float outputVoltage = 3.3 / refLevel * uvLevel;
  
  float uvIntensity = mapfloat(outputVoltage, 0.99, 2.8, 0.0, 15.0); //Convert the voltage to a UV intensity level
 
 Serial.print("output: ");
  Serial.print(refLevel);
 
  Serial.print("ML8511 output: ");
  Serial.print(uvLevel);
 
  Serial.print(" / ML8511 voltage: ");
  Serial.print(outputVoltage);
 
  Serial.print("valor lluvia rain analogo");
  Serial.print(rainAnalog);
  Serial.print(rainAnalogVal);
  delay(2000);
   Serial.print("valor lluvia rain analogo");
   Serial.print(rainDigital);
  Serial.print(rainDigitalVal);


  int analog_value = analogRead(Photoresistor);
  int brightness = map(analog_value, 0, 1000, 0, 100);
  Serial.println(brightness);

int luz = analogRead(LDR);
 Serial.println("luz: " + String(luz));
 

 

  /////////////////////////////////////////////////////////
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // Write an Int number on the database path test/int
    //Humedad
    if (Firebase.RTDB.setFloat(&fbdo, "test/humedad", h)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    
    // Write an Float number on the database path test/float
    //Temperatura C
    if (Firebase.RTDB.setFloat(&fbdo, "test/temperatura", t)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  
    //Altitud
    if (Firebase.RTDB.setFloat(&fbdo, "test/metros", bmp.readAltitude())){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    //presion bmp.readPressure()
    if (Firebase.RTDB.setFloat(&fbdo, "test/presionA", bmp.readPressure())){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    //lluvia
    
    if (Firebase.RTDB.setFloat(&fbdo, "test/lluvia", rainDigitalVal)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    //rayosuv
    if (Firebase.RTDB.setFloat(&fbdo, "test/rayosUv", uvIntensity)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    //resistencia
    if (Firebase.RTDB.setString(&fbdo, "test/fotoResistencia", String(luz))){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
    Serial.print("aaaaaaaaaaaaaaaaaaaaaaaaaaa"+i);
   delay(58000);
}

 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status

 int rainAnalogVal = analogRead(rainAnalog);
  int rainDigitalVal = digitalRead(rainDigital);
  
  int uvLevel = averageAnalogRead(UVOUT);
  int refLevel = averageAnalogRead(REF_3V3);

  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  char h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  char t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  char f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  float outputVoltage = 3.3 / refLevel * uvLevel;
  
  float uvIntensity = mapfloat(outputVoltage, 0.99, 2.8, 0.0, 15.0); //Convert the voltage to a UV intensity level

  int analog_value = analogRead(Photoresistor);
  int brightness = map(analog_value, 0, 1000, 0, 100);
  Serial.println(brightness);

int luz = analogRead(LDR);
 Serial.println("luz: " + String(luz));
 

     HTTPClient http;
     http.begin("https://tecenv.3utilities.com/api/data/create");        //Indicamos el destino
     http.addHeader("Content-Type", "application/json"); //Preparamos el header text/plain si solo vamos a enviar texto plano sin un paradigma llave:valor.
     //crear json
     StaticJsonDocument<200> doc;
     // Add values in the document
     //
     doc["lluvia"] = true ;
     doc["temperatura"] = t;
     doc["humedad"] = h;
     doc["presionA"] =  bmp.readPressure();
     doc["metros"] = bmp.readAltitude();//altitud
     doc["rayosUv"] = uvIntensity;
     doc["fotoResistencia"] = String(luz);
    
     JsonArray data = doc.createNestedArray("data");
     data.add(48.756080);
     data.add(2.302038);
     String requestBody;
     serializeJson(doc, requestBody);


     int codigo_respuesta = http.POST(requestBody);   //Enviamos el post pasándole, los datos que queremos enviar. (esta función nos devuelve un código que guardamos en un int)

     if(codigo_respuesta>0){
       Serial.println("Código HTTP ► " + String(codigo_respuesta));   //Print return code

       if(codigo_respuesta == 200){
         String cuerpo_respuesta = http.getString();
         Serial.println("El servidor respondió ▼ ");
         Serial.println(cuerpo_respuesta);

       }

     }else{

      Serial.print("Error enviando POST, código: ");
      Serial.println(codigo_respuesta);

     }

     http.end();  //libero recursos

   }else{

      Serial.println("Error en la conexión WIFI");

   }

    delay(100);

  
}