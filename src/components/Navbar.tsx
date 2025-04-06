
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface NavbarProps {
  onAddHabit: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddHabit }) => {
  return (
    <nav className="sticky top-0 z-10 bg-background border-b">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-habit-purple to-habit-blue flex items-center justify-center">
            <span className="text-white text-sm font-bold">HT</span>
          </div>
          <h1 className="text-2xl font-bold">StreakSync</h1>
        </div>
        
        <Button 
          onClick={onAddHabit}
          className="bg-habit-blue hover:bg-habit-blue/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Habit
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
