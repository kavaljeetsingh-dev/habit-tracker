
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Edit, Trash2, TrendingUp } from 'lucide-react';
import { Habit, hasCheckedInToday, formatDate } from '@/utils/habitUtils';

interface HabitCardProps {
  habit: Habit;
  onCheckIn: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ 
  habit, 
  onCheckIn, 
  onEdit, 
  onDelete 
}) => {
  const checkedInToday = hasCheckedInToday(habit.checkIns);
  
  return (
    <Card className="w-full bg-white transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{habit.name}</h3>
            {habit.description && (
              <p className="text-muted-foreground text-sm mt-1">{habit.description}</p>
            )}
          </div>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onEdit}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onDelete}
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-habit-purple/10 flex items-center justify-center mr-2">
              <TrendingUp className="h-4 w-4 text-habit-purple" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <p className="font-bold text-habit-purple">{habit.currentStreak} days</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-habit-purple/10 flex items-center justify-center mr-2">
              <TrendingUp className="h-4 w-4 text-habit-purple" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Best Streak</p>
              <p className="font-bold text-habit-purple">{habit.bestStreak} days</p>
            </div>
          </div>
        </div>
        
        {habit.lastCheckIn && (
          <p className="text-xs text-muted-foreground mt-2">
            Last check-in: {formatDate(habit.lastCheckIn)}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button
          className={`w-full ${
            checkedInToday 
              ? 'bg-habit-green hover:bg-habit-green/90 cursor-default'
              : 'bg-habit-blue hover:bg-habit-blue/90'
          }`}
          onClick={onCheckIn}
          disabled={checkedInToday}
        >
          <Check className={`mr-2 h-4 w-4 ${checkedInToday ? 'animate-check-mark' : ''}`} />
          {checkedInToday ? 'Completed Today' : 'Check-in for Today'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
