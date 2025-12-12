export interface Plant {
  id: string;
  name: string;
  ipAddress: string;
  createdAt: Date;
}

export interface SensorData {
  humidity: number | null;
  moisture: number | null;
  sunlight: {
    uv: number | null;
    visible: number | null;
    ir: number | null;
  };
  lastUpdated: Date | null;
}
