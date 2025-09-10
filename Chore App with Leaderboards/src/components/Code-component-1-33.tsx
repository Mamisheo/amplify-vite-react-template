import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Chore } from '../types';
import { Plus } from 'lucide-react';

interface AddChoreDialogProps {
  onAddChore: (chore: Omit<Chore, 'id' | 'completed' | 'createdAt'>) => void;
}

const categories = [
  { value: 'cleaning', label: 'Cleaning 🧹' },
  { value: 'kitchen', label: 'Kitchen 🍽️' },
  { value: 'outdoor', label: 'Outdoor 🌱' },
  { value: 'pets', label: 'Pets 🐕' },
  { value: 'organization', label: 'Organization 📁' },
  { value: 'other', label: 'Other 📝' }
] as const;

export function AddChoreDialog({ onAddChore }: AddChoreDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [category, setCategory] = useState<Chore['category']>('other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !points.trim()) return;
    
    const pointsValue = parseInt(points);
    if (isNaN(pointsValue) || pointsValue < 1) return;

    onAddChore({
      title: title.trim(),
      description: description.trim(),
      points: pointsValue,
      category
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPoints('');
    setCategory('other');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Chore
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Chore</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Wash the dishes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any specific instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                max="100"
                placeholder="5"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value: Chore['category']) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !points.trim()}
              className="flex-1"
            >
              Add Chore
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}