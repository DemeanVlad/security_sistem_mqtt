to install the dependencies, u need to use this:"demeanvlad8@192 rc_proiect % npm install express serialport ws"
Explicația proiectului – Sistem de securitate ESP32 + HiveMQ + Node.js + UI

Acest proiect este un sistem de detectare a mișcării care folosește un ESP32, un senzor PIR, LED și comunicații MQTT prin HiveMQ Cloud, vizualizate în timp real într-un browser prin Node.js și WebSocket.

1️⃣ ESP32 – Senzor PIR și MQTT

ESP32 se conectează la WiFi (Wokwi-GUEST sau rețeaua ta locală).

Senzorul PIR detectează mișcare și semnalizează printr-un HIGH/LOW pe pinul digital 13.

LED-ul conectat pe pinul 12 se aprinde atunci când este detectată mișcare.

ESP32 folosește biblioteca PubSubClient pentru a comunica cu brokerul MQTT (HiveMQ).

ESP32 trimite mesajele:

DETECTED → când se detectează mișcare
CLEAR → când zona devine sigură


TLS (port 8883) asigură că mesajele sunt criptate între ESP32 și HiveMQ Cloud.

ESP32 folosește espClient.setInsecure() în Wokwi pentru a ignora verificarea certificatului TLS, ceea ce simplifică simularea.

Flux ESP32 → HiveMQ
[PIR HIGH] -> ESP32 → MQTT.publish("home/security/motion", "DETECTED")
[PIR LOW]  -> ESP32 → MQTT.publish("home/security/motion", "CLEAR")

2️⃣ HiveMQ Cloud – Broker MQTT

HiveMQ Cloud primește mesajele de la ESP32 și le păstrează pe topic-ul home/security/motion.

Node.js se conectează ca client MQTT, subscribe la topic-ul respectiv și primește toate mesajele.

3️⃣ Node.js – Server Web și WebSocket

Server-ul Node.js face două lucruri simultan:

Servește interfața web (index.html) pe portul 3000.

Rulează un WebSocket server pe portul 8080 pentru a trimite datele în timp real către browser.

Când Node.js primește un mesaj MQTT:

mqttClient.on("message", (topic, message) => {
  // trimite mesajul fiecărui client WebSocket conectat
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
});


Astfel, browser-ul vede instant starea senzorului PIR.

4️⃣ Browser UI – Vizualizare în timp real

Browser-ul se conectează la WebSocket Node.js:

const ws = new WebSocket("ws://localhost:8080");


Orice mesaj MQTT (DETECTED / CLEAR) este afișat instant în pagina web:

<div id="status">Astept date...</div>


Exemple de mesaje vizualizate:

Status: DETECTED
Status: CLEAR


Acum poți vedea în timp real când senzorul PIR detectează mișcare și când zona devine sigură.

5️⃣ Flux complet al datelor
[PIR sensor ESP32] → ESP32 trimite DETECTED/CLEAR
      ↓ MQTT
[HiveMQ Cloud] → broker
      ↓ MQTT
[Node.js Server] → preia mesajul
      ↓ WebSocket
[Browser UI] → afișează status în timp real

6️⃣ Ce ai realizat practic

Ai creat un sistem IoT complet care:

Detectează evenimente fizice (mișcare)

Le transmite securizat prin MQTT

Le integrează într-un server Node.js

Le afișează instant în browser folosind WebSocket

Acest sistem poate fi extins cu:

Butoane ARM/DISARM

Istoric al evenimentelor

Alerte vizuale sau sonore în UI

Mai mulți senzori PIR# security_sistem_mqtt
