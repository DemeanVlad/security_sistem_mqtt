const mqtt = require("mqtt");
const express = require("express");
const WebSocket = require("ws");

const app = express();
app.use(express.static("public"));

// ===== MQTT =====
const mqttClient = mqtt.connect(
  "mqtts://da452fa26284464fa64861e7dccc3880.s1.eu.hivemq.cloud:8883",
  {
    username: "userCristina",
    password: "Pass123!"
  }
);

mqttClient.on("connect", () => {
  console.log("✅ Conectat la HiveMQ Cloud");
  mqttClient.subscribe("home/security/motion");
});

// ===== WEBSOCKET =====
const wss = new WebSocket.Server({ port: 8080 });

mqttClient.on("message", (topic, message) => {
  const data = message.toString();
  console.log("📩 MQTT:", data);

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
});

// ===== HTTP =====
app.listen(3000, () => {
  console.log("🚀 Frontend: http://localhost:3000");
});
