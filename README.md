🔐 SecureHome – IoT Security Monitoring System
📌 Descriere generală

SecureHome este o aplicație de monitorizare a unui sistem de securitate bazat pe IoT, care detectează mișcare folosind un senzor PIR conectat la un ESP32.
Datele sunt transmise în timp real prin protocolul MQTT către HiveMQ Cloud, procesate de un server Node.js și afișate într-o interfață web modernă, folosind WebSockets.

Aplicația simulează funcționarea unui sistem real de securitate pentru locuințe sau spații comerciale.

🧱 Arhitectura sistemului
ESP32 + PIR Sensor
        │
        │ MQTT (TLS)
        ▼
   HiveMQ Cloud Broker
        │
        │ MQTT
        ▼
   Node.js Server
        │
        │ WebSocket
        ▼
   Web Browser (UI)

⚙️ Tehnologii utilizate

ESP32 – microcontroler IoT

WiFi – conectare la internet

MQTT – protocol de comunicare (publish / subscribe)

HiveMQ Cloud – broker MQTT cloud

Node.js – server backend

WebSocket – comunicare real-time cu frontend-ul

HTML / CSS / JavaScript – interfață web

🔄 Fluxul de funcționare
1️⃣ ESP32 (dispozitiv IoT)

Se conectează la rețeaua WiFi

Se conectează securizat (TLS) la HiveMQ Cloud

Citește starea senzorului PIR

Publică mesaje MQTT pe topicul:

home/security/motion

Mesaje trimise:

DETECTED – mișcare detectată

CLEAR – zonă sigură

2️⃣ HiveMQ Cloud (Broker MQTT)

Primește mesajele publicate de ESP32

Le distribuie tuturor clienților abonați la topic

Asigură comunicarea securizată și fiabilă

3️⃣ Node.js Server (Backend)

Se conectează la HiveMQ Cloud ca MQTT client

Se abonează la topicul home/security/motion

Primește evenimentele de la ESP32

Pornește un WebSocket server pe portul 8080

Transmite datele în timp real către browser

4️⃣ Interfața Web (Frontend)

Se încarcă prin serverul Node.js (http://localhost:3000)

Se conectează la WebSocket (ws://localhost:8080)

Afișează:

statusul sistemului (ARMED / DISARMED)

starea zonei (Secure / Intrusion)

istoric evenimente

Oferă un dashboard modern, ușor de utilizat

🟢 Moduri de funcționare
🔓 DISARMED

Sistemul este dezactivat

Evenimentele nu sunt afișate

Stare: „System Offline”

🔒 ARMED

Sistemul monitorizează mișcarea

La DETECTED → alertă vizuală

La CLEAR → revenire la stare sigură

🚀 Inițializarea proiectului (pași clari)
1️⃣ ESP32 (Wokwi sau fizic)

Se pornește simularea sau placa

Se verifică mesajele din Serial Monitor

2️⃣ Pornirea serverului Node.js
node server.js


Output așteptat:

🚀 Server pornit: http://localhost:3000
✅ Conectat la HiveMQ Cloud
📡 Subscribed la topic: home/security/motion

3️⃣ Pornirea interfeței web

Deschide browser:

http://localhost:3000

4️⃣ Testare

Simulează mișcare PIR

Observă evenimentele în UI în timp real

🧪 Testare și depanare

✔ Dacă mesajele apar:

în Serial Monitor → ESP32 funcționează

în consola Node.js → MQTT funcționează

în browser → WebSocket funcționează

❌ Dacă UI nu se actualizează:

verifică WebSocket (ws://localhost:8080)

verifică topic-ul MQTT

verifică că serverul Node.js rulează
