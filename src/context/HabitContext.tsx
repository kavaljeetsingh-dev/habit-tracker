
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  Habit, 
  NewHabitData, 
  generateId, 
  calculateStreak, 
  getStoredHabits, 
  saveHabitsToStorage 
} from '@/utils/habitUtils';
import { toast } from 'sonner';

interface HabitContextType {
  habits: Habit[];
  addHabit: (habitData: NewHabitData) => void;
  updateHabit: (id: string, habitData: Partial<NewHabitData>) => void;
  deleteHabit: (id: string) => void;
  checkInHabit: (id: string) => void;
  loading: boolean;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load habits from local storage on mount
  useEffect(() => {
    const loadHabits = () => {
      try {
        const storedHabits = getStoredHabits();
        setHabits(storedHabits);
      } catch (error) {
        console.error('Error loading habits:', error);
        toast.error('Failed to load habits');
      } finally {
        setLoading(false);
      }
    };
    
    loadHabits();
  }, []);

  // Save habits to local storage whenever they change
  useEffect(() => {
    if (!loading) {
      saveHabitsToStorage(habits);
    }
  }, [habits, loading]);

  // Add a new habit
  const addHabit = (habitData: NewHabitData) => {
    const newHabit: Habit = {
      id: generateId(),
      name: habitData.name,
      description: habitData.description || '',
      createdAt: new Date(),
      checkIns: [],
      currentStreak: 0,
      bestStreak: 0,
    };

    setHabits(prevHabits => [...prevHabits, newHabit]);
    toast.success(`Habit "${habitData.name}" created!`);
  };

  // Update an existing habit
  const updateHabit = (id: string, habitData: Partial<NewHabitData>) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id 
          ? { ...habit, ...habitData } 
          : habit
      )
    );
    toast.success('Habit updated!');
  };

  // Delete a habit
  const deleteHabit = (id: string) => {
    const habitToDelete = habits.find(habit => habit.id === id);
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
    
    if (habitToDelete) {
      toast.success(`Habit "${habitToDelete.name}" deleted!`);
    }
  };

  // Check in a habit for today
  const checkInHabit = (id: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id !== id) return habit;
        
        const today = new Date();
        const newCheckIns = [...habit.checkIns, today];
        const currentStreak = calculateStreak(newCheckIns);
        const bestStreak = Math.max(currentStreak, habit.bestStreak);
        
        return {
          ...habit,
          checkIns: newCheckIns,
          lastCheckIn: today,
          currentStreak,
          bestStreak
        };
      })
    );
    
    const habitName = habits.find(habit => habit.id === id)?.name;
    toast.success(`Checked in for "${habitName}"!`);
  };

  return (
    <HabitContext.Provider 
      value={{ 
        habits, 
        addHabit, 
        updateHabit, 
        deleteHabit, 
        checkInHabit,
        loading
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
