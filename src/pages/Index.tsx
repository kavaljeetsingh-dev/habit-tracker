
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HabitList from '@/components/HabitList';
import HabitForm from '@/components/HabitForm';
import StreakDisplay from '@/components/StreakDisplay';
import { HabitProvider, useHabits } from '@/context/HabitContext';
import { NewHabitData } from '@/utils/habitUtils';
import { Toaster } from '@/components/ui/sonner';

const HabitDashboard: React.FC = () => {
  const { habits, addHabit, updateHabit, deleteHabit, checkInHabit, loading } = useHabits();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleAddClick = () => {
    setIsFormOpen(true);
  };
  
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  
  const handleFormSubmit = (habitData: NewHabitData) => {
    addHabit(habitData);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-habit-blue border-t-transparent animate-spin"></div>
          <p className="mt-4 text-lg font-medium">Loading your habits...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAddHabit={handleAddClick} />
      
      <main className="container py-8">
        <h2 className="text-3xl font-bold mb-6">Your Habit Dashboard</h2>
        
        <StreakDisplay habits={habits} />
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Habits</h3>
            <HabitList 
              habits={habits}
              onCheckIn={checkInHabit}
              onUpdate={updateHabit}
              onDelete={deleteHabit}
            />
          </div>
        </div>
      </main>
      
      <HabitForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
      
      <Toaster />
    </div>
  );
};

const Index = () => {
  return (
    <HabitProvider>
      <HabitDashboard />
    </HabitProvider>
  );
};

export default Index;
