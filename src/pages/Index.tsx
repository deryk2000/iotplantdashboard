import { useState } from 'react';
import { usePlants } from '@/hooks/usePlants';
import { Dashboard } from '@/components/Dashboard';
import { PlantDetail } from '@/components/PlantDetail';
import { Plant } from '@/types/plant';
import { Toaster } from '@/components/ui/sonner';
import { Leaf } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const { plants, addPlant, removePlant } = usePlants();
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const handleDelete = (id: string) => {
    removePlant(id);
    setSelectedPlant(null);
    toast.success('Plant removed');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl gradient-primary">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-lg">
              PlantMonitor
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {selectedPlant ? (
          <PlantDetail
            plant={selectedPlant}
            onBack={() => setSelectedPlant(null)}
            onDelete={handleDelete}
          />
        ) : (
          <Dashboard
            plants={plants}
            onAddPlant={addPlant}
            onSelectPlant={setSelectedPlant}
          />
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Index;
