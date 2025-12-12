import { useState, useEffect } from 'react';
import { Plant } from '@/types/plant';

const STORAGE_KEY = 'plant-monitor-plants';

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPlants(parsed.map((p: Plant) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        })));
      } catch (e) {
        console.error('Failed to parse plants from storage:', e);
      }
    }
  }, []);

  const savePlants = (newPlants: Plant[]) => {
    setPlants(newPlants);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlants));
  };

  const addPlant = (name: string, ipAddress: string) => {
    const newPlant: Plant = {
      id: crypto.randomUUID(),
      name,
      ipAddress,
      createdAt: new Date()
    };
    savePlants([...plants, newPlant]);
    return newPlant;
  };

  const removePlant = (id: string) => {
    savePlants(plants.filter(p => p.id !== id));
  };

  return { plants, addPlant, removePlant };
}
