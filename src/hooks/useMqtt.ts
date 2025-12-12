import { useState, useEffect, useCallback, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import { SensorData } from '@/types/plant';

const BROKER_URL = 'ws://172.16.32.5:9001'; // WebSocket port for MQTT

export function useMqtt(ipAddress: string | null) {
  const [sensorData, setSensorData] = useState<SensorData>({
    humidity: null,
    moisture: null,
    sunlight: {
      uv: null,
      visible: null,
      ir: null
    },
    lastUpdated: null
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<MqttClient | null>(null);

  const connect = useCallback(() => {
    if (!ipAddress) return;

    try {
      const client = mqtt.connect(BROKER_URL, {
        reconnectPeriod: 5000,
        connectTimeout: 10000,
      });

      clientRef.current = client;

      client.on('connect', () => {
        console.log('Connected to MQTT broker');
        setIsConnected(true);
        setError(null);

        // Subscribe to all sensor topics for this plant
        const topics = [
          `${ipAddress}/sensors/humidity0`,
          `${ipAddress}/sensors/moisture0`,
          `${ipAddress}/sensors/sunlight/uv`,
          `${ipAddress}/sensors/sunlight/visible`,
          `${ipAddress}/sensors/sunlight/ir`
        ];

        topics.forEach(topic => {
          client.subscribe(topic, (err) => {
            if (err) {
              console.error(`Failed to subscribe to ${topic}:`, err);
            } else {
              console.log(`Subscribed to ${topic}`);
            }
          });
        });
      });

      client.on('message', (topic, message) => {
        const value = parseFloat(message.toString());
        if (isNaN(value)) return;

        setSensorData(prev => {
          const updated = { ...prev, lastUpdated: new Date() };

          if (topic.includes('humidity0')) {
            updated.humidity = value;
          } else if (topic.includes('moisture0')) {
            updated.moisture = value;
          } else if (topic.includes('sunlight/uv')) {
            updated.sunlight = { ...prev.sunlight, uv: value };
          } else if (topic.includes('sunlight/visible')) {
            updated.sunlight = { ...prev.sunlight, visible: value };
          } else if (topic.includes('sunlight/ir')) {
            updated.sunlight = { ...prev.sunlight, ir: value };
          }

          return updated;
        });
      });

      client.on('error', (err) => {
        console.error('MQTT error:', err);
        setError('Connection error');
        setIsConnected(false);
      });

      client.on('close', () => {
        setIsConnected(false);
      });

    } catch (err) {
      console.error('Failed to connect:', err);
      setError('Failed to connect to broker');
    }
  }, [ipAddress]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.end();
      clientRef.current = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (ipAddress) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [ipAddress, connect, disconnect]);

  return { sensorData, isConnected, error, reconnect: connect };
}
