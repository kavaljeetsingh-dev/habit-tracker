
import React, { useState } from 'react';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';
import { Habit, NewHabitData } from '@/utils/habitUtils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface HabitListProps {
  habits: Habit[];
  onCheckIn: (id: string) => void;
  onUpdate: (id: string, habitData: NewHabitData) => void;
  onDelete: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ 
  habits, 
  onCheckIn, 
  onUpdate, 
  onDelete 
}) => {
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [deleteHabitId, setDeleteHabitId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  // Open edit dialog
  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsEditDialogOpen(true);
  };

  // Close edit dialog
  const handleEditClose = () => {
    setIsEditDialogOpen(false);
    setEditingHabit(null);
  };

  // Submit edit
  const handleEditSubmit = (habitData: NewHabitData) => {
    if (editingHabit) {
      onUpdate(editingHabit.id, habitData);
      handleEditClose();
    }
  };

  // Open delete confirmation
  const handleDeletePrompt = (id: string) => {
    setDeleteHabitId(id);
    setIsDeleteDialogOpen(true);
  };

  // Cancel delete
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeleteHabitId(null);
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    if (deleteHabitId) {
      onDelete(deleteHabitId);
      setIsDeleteDialogOpen(false);
      setDeleteHabitId(null);
    }
  };

  if (!habits.length) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
        <h3 className="text-lg font-medium text-muted-foreground">No habits yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add your first habit to start tracking!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onCheckIn={() => onCheckIn(habit.id)}
          onEdit={() => handleEdit(habit)}
          onDelete={() => handleDeletePrompt(habit.id)}
        />
      ))}

      {/* Edit habit dialog */}
      {editingHabit && (
        <HabitForm
          open={isEditDialogOpen}
          onClose={handleEditClose}
          onSubmit={handleEditSubmit}
          editHabit={editingHabit}
        />
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={handleDeleteCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this habit and all of its check-in history.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HabitList;
