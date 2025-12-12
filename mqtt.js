import mqtt from "mqtt";

// Broker config
const BROKER_URL = "mqtt://localhost:1883"; // or mqtt://broker.hivemq.com
const TOPIC = "sensors/#";

// Connect
const client = mqtt.connect(BROKER_URL);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(TOPIC, { qos: 0 }, (err) => {
    if (err) {
      console.error("Subscribe error:", err);
    } else {
      console.log(`Subscribed to ${TOPIC}`);
    }
  });
});

client.on("message", (topic, payload) => {
  console.log("Topic:", topic);
  console.log("Payload:", payload.toString());
  console.log("------------------------");
});

client.on("error", (err) => {
  console.error("MQTT error:", err);
});

client.on("close", () => {
  console.log("Connection closed");
});
