import paho.mqtt.client as mqtt

BROKER_HOST = "172.16.32.5"     # e.g. "broker.hivemq.com"
BROKER_PORT = 1883
TOPIC = "#"           # wildcard subscription
CLIENT_ID = "python-subscriber-1"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT broker")
        client.subscribe(TOPIC)
        print(f"Subscribed to topic: {TOPIC}")
    else:
        print(f"Connection failed with code {rc}")

def on_message(client, userdata, msg):
    print(f"Topic: {msg.topic}")
    print(f"Payload: {msg.payload.decode(errors='ignore')}")
    print("-" * 40)

def on_disconnect(client, userdata, rc):
    print("Disconnected from broker")

client = mqtt.Client(client_id=CLIENT_ID)

client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

client.connect(BROKER_HOST, BROKER_PORT, keepalive=60)

# Blocking loop (keeps script alive)
client.loop_forever()
