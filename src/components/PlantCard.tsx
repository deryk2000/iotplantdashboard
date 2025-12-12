import { Plant } from '@/types/plant';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
}

export function PlantCard({ plant, onClick }: PlantCardProps) {
  return (
    <Card
      className="cursor-pointer group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border/50"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-2xl bg-accent/50 group-hover:bg-accent transition-colors">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Wifi className="w-3.5 h-3.5" />
            <span className="font-mono">{plant.ipAddress}</span>
          </div>
        </div>
        
        <h3 className="font-display font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
          {plant.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mt-1">
          Added {plant.createdAt.toLocaleDateString()}
        </p>
        
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-1/3 bg-primary/50 animate-pulse-gentle rounded-full" />
          </div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </CardContent>
    </Card>
  );
}
