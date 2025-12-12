import { Plant } from '@/types/plant';
import { useMqtt } from '@/hooks/useMqtt';
import { SensorGauge } from './SensorGauge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Droplets, Cloud, Sun, Zap, Thermometer, Wifi, WifiOff, RefreshCw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlantDetailProps {
  plant: Plant;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export function PlantDetail({ plant, onBack, onDelete }: PlantDetailProps) {
  const { sensorData, isConnected, error, reconnect } = useMqtt(plant.ipAddress);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              {plant.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground font-mono">
                {plant.ipAddress}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className={cn(
                "flex items-center gap-1.5 text-sm",
                isConnected ? "text-primary" : "text-destructive"
              )}>
                {isConnected ? (
                  <>
                    <Wifi className="w-3.5 h-3.5" />
                    Connected
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    Disconnected
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isConnected && (
            <Button variant="outline" size="sm" onClick={reconnect} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Reconnect
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(plant.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error} - Make sure the MQTT broker is accessible at ws://172.16.32.5:9001
        </div>
      )}

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SensorGauge
          value={sensorData.moisture}
          max={100}
          label="Soil Moisture"
          unit="%"
          color="moisture"
          icon={<Droplets className="w-5 h-5" />}
        />
        
        <SensorGauge
          value={sensorData.humidity}
          max={100}
          label="Air Humidity"
          unit="%"
          color="humidity"
          icon={<Cloud className="w-5 h-5" />}
        />
        
        <SensorGauge
          value={sensorData.sunlight.visible}
          max={65535}
          label="Visible Light"
          unit="lux"
          color="sunlight"
          icon={<Sun className="w-5 h-5" />}
        />
        
        <SensorGauge
          value={sensorData.sunlight.uv}
          max={500}
          label="UV Index"
          unit="idx"
          color="sunlight-uv"
          icon={<Zap className="w-5 h-5" />}
        />
        
        <SensorGauge
          value={sensorData.sunlight.ir}
          max={65535}
          label="Infrared"
          unit="raw"
          color="sunlight-ir"
          icon={<Thermometer className="w-5 h-5" />}
        />
      </div>

      {/* Last Updated */}
      {sensorData.lastUpdated && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Last updated: {sensorData.lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
