
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Calendar, CheckCircle } from 'lucide-react';
import { Habit } from '@/utils/habitUtils';

interface StreakDisplayProps {
  habits: Habit[];
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ habits }) => {
  const totalHabits = habits.length;
  
  const totalCompletedToday = habits.filter(habit => 
    habit.checkIns.some(date => 
      new Date(date).toDateString() === new Date().toDateString()
    )
  ).length;
  
  const completionPercentage = totalHabits 
    ? Math.round((totalCompletedToday / totalHabits) * 100) 
    : 0;
  
  const longestCurrentStreak = habits.length
    ? Math.max(...habits.map(habit => habit.currentStreak))
    : 0;
  
  const longestEverStreak = habits.length
    ? Math.max(...habits.map(habit => habit.bestStreak))
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-habit-blue" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCompletedToday}/{totalHabits}</div>
          <p className="text-xs text-muted-foreground">
            {completionPercentage}% complete today
          </p>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-habit-blue rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Flame className="mr-2 h-4 w-4 text-habit-purple" />
            Current Best Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{longestCurrentStreak} days</div>
          <p className="text-xs text-muted-foreground">
            Keep it going!
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-habit-green" />
            Longest Ever Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{longestEverStreak} days</div>
          <p className="text-xs text-muted-foreground">
            {longestCurrentStreak >= longestEverStreak && longestEverStreak > 0 
              ? "You're at your best!" 
              : "Keep improving!"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreakDisplay;
