import { Plant } from '@/types/plant';
import { PlantCard } from './PlantCard';
import { AddPlantDialog } from './AddPlantDialog';
import { Leaf } from 'lucide-react';

interface DashboardProps {
  plants: Plant[];
  onAddPlant: (name: string, ipAddress: string) => void;
  onSelectPlant: (plant: Plant) => void;
}

export function Dashboard({ plants, onAddPlant, onSelectPlant }: DashboardProps) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            My Plants
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your plants in real-time
          </p>
        </div>
        <AddPlantDialog onAdd={onAddPlant} />
      </div>

      {/* Plant Grid */}
      {plants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onClick={() => onSelectPlant(plant)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-6 rounded-full bg-accent/50 mb-6">
            <Leaf className="w-12 h-12 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            No plants yet
          </h2>
          <p className="text-muted-foreground max-w-sm mb-6">
            Add your first plant to start monitoring its soil moisture, humidity, and sunlight levels in real-time.
          </p>
          <AddPlantDialog onAdd={onAddPlant} />
        </div>
      )}
    </div>
  );
}
