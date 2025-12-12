import { cn } from '@/lib/utils';

interface SensorGaugeProps {
  value: number | null;
  max: number;
  label: string;
  unit: string;
  color: 'moisture' | 'humidity' | 'sunlight' | 'sunlight-uv' | 'sunlight-ir';
  icon: React.ReactNode;
}

export function SensorGauge({ value, max, label, unit, color, icon }: SensorGaugeProps) {
  const percentage = value !== null ? Math.min((value / max) * 100, 100) : 0;
  
  const colorClasses = {
    moisture: 'text-moisture',
    humidity: 'text-humidity',
    sunlight: 'text-sunlight',
    'sunlight-uv': 'text-sunlight-uv',
    'sunlight-ir': 'text-sunlight-ir'
  };

  const bgClasses = {
    moisture: 'bg-moisture',
    humidity: 'bg-humidity',
    sunlight: 'bg-sunlight',
    'sunlight-uv': 'bg-sunlight-uv',
    'sunlight-ir': 'bg-sunlight-ir'
  };

  const glowClasses = {
    moisture: 'sensor-glow-moisture',
    humidity: 'sensor-glow-humidity',
    sunlight: 'sensor-glow-sunlight',
    'sunlight-uv': 'sensor-glow-sunlight',
    'sunlight-ir': 'sensor-glow-sunlight'
  };

  return (
    <div className={cn(
      "bg-card rounded-2xl p-6 border border-border transition-all duration-300",
      value !== null && glowClasses[color]
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2 rounded-xl bg-muted", colorClasses[color])}>
          {icon}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      
      <div className="relative">
        {/* Circular gauge */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.51} 251`}
              className={cn(colorClasses[color], "transition-all duration-500")}
            />
          </svg>
          
          {/* Center value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {value !== null ? (
              <>
                <span className={cn("text-3xl font-display font-semibold", colorClasses[color])}>
                  {value.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">{unit}</span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground animate-pulse-gentle">
                Waiting...
              </span>
            )}
          </div>
        </div>
        
        {/* Status bar */}
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", bgClasses[color])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
