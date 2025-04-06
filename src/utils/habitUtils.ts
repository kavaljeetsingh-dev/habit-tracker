
import { format, startOfToday, differenceInCalendarDays } from 'date-fns';

export type Habit = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  checkIns: Date[];
  currentStreak: number;
  bestStreak: number;
  lastCheckIn?: Date;
};

export type NewHabitData = {
  name: string;
  description?: string;
};

// Generate a random ID for habits
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Calculate the current streak for a habit
export const calculateStreak = (checkIns: Date[]): number => {
  if (!checkIns.length) return 0;
  
  const sortedCheckIns = [...checkIns].sort((a, b) => b.getTime() - a.getTime());
  const today = startOfToday();
  let streak = 0;
  
  // If the most recent check-in is not today or yesterday, streak is broken
  const mostRecentCheckIn = sortedCheckIns[0];
  const daysSinceLastCheckIn = differenceInCalendarDays(today, mostRecentCheckIn);
  
  if (daysSinceLastCheckIn > 1) return 0;
  
  // Count consecutive days
  let currentDate = today;
  let consecutiveDays = true;
  
  while (consecutiveDays && streak < sortedCheckIns.length) {
    const checkInForCurrentDate = sortedCheckIns.find(date => 
      format(date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
    );
    
    if (checkInForCurrentDate) {
      streak++;
      currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    } else {
      consecutiveDays = false;
    }
  }
  
  return streak;
};

// Format a date to display
export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

// Check if the user has already checked in today for a specific habit
export const hasCheckedInToday = (checkIns: Date[]): boolean => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return checkIns.some(date => format(date, 'yyyy-MM-dd') === today);
};

// Get local storage habits or return default
export const getStoredHabits = (): Habit[] => {
  if (typeof window === 'undefined') return [];
  
  const storedHabits = localStorage.getItem('habits');
  if (!storedHabits) return [];
  
  try {
    const habits = JSON.parse(storedHabits);
    return habits.map((habit: any) => ({
      ...habit,
      createdAt: new Date(habit.createdAt),
      checkIns: habit.checkIns.map((date: string) => new Date(date)),
      lastCheckIn: habit.lastCheckIn ? new Date(habit.lastCheckIn) : undefined
    }));
  } catch (error) {
    console.error('Error parsing stored habits:', error);
    return [];
  }
};

// Save habits to local storage
export const saveHabitsToStorage = (habits: Habit[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('habits', JSON.stringify(habits));
};
