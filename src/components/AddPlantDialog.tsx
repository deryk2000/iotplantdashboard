import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Leaf, Wifi } from 'lucide-react';
import { toast } from 'sonner';

interface AddPlantDialogProps {
  onAdd: (name: string, ipAddress: string) => void;
}

export function AddPlantDialog({ onAdd }: AddPlantDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a plant name');
      return;
    }
    
    if (!ipAddress.trim()) {
      toast.error('Please enter the Raspberry Pi IP address');
      return;
    }

    // Basic IP validation
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ipAddress.trim())) {
      toast.error('Please enter a valid IP address');
      return;
    }

    onAdd(name.trim(), ipAddress.trim());
    setName('');
    setIpAddress('');
    setOpen(false);
    toast.success(`${name} added successfully!`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Add Plant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Leaf className="w-5 h-5 text-primary" />
            Add New Plant
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Plant Name
            </Label>
            <div className="relative">
              <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Living Room Fern"
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ip" className="text-sm font-medium">
              Raspberry Pi IP Address
            </Label>
            <div className="relative">
              <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="ip"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="e.g., 192.168.1.100"
                className="pl-10 font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the IP address of the Raspberry Pi connected to your plant sensors
            </p>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gradient-primary">
              Add Plant
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
