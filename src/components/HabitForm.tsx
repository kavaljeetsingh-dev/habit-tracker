
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Habit, NewHabitData } from '@/utils/habitUtils';

interface HabitFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (habitData: NewHabitData) => void;
  editHabit?: Habit;
}

const HabitForm: React.FC<HabitFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  editHabit 
}) => {
  const [formData, setFormData] = useState<NewHabitData>({
    name: '',
    description: '',
  });
  
  const [nameError, setNameError] = useState<string>('');

  // Reset form when dialog opens/closes or editHabit changes
  useEffect(() => {
    if (open) {
      if (editHabit) {
        setFormData({
          name: editHabit.name,
          description: editHabit.description
        });
      } else {
        setFormData({ name: '', description: '' });
      }
      setNameError('');
    }
  }, [open, editHabit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'name' && nameError) {
      setNameError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name is not empty
    if (!formData.name.trim()) {
      setNameError('Habit name is required');
      return;
    }
    
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editHabit ? 'Edit Habit' : 'Create New Habit'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Habit Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g., Morning Meditation"
              className={nameError ? "border-red-500" : ""}
            />
            {nameError && (
              <p className="text-red-500 text-xs">{nameError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="E.g., 10 minutes of mindfulness each morning"
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-habit-blue hover:bg-habit-blue/90"
            >
              {editHabit ? 'Update Habit' : 'Create Habit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HabitForm;
