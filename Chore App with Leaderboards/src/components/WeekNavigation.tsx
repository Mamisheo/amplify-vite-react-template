import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { formatWeekRange } from '../utils/weekUtils';

interface WeekNavigationProps {
  currentWeek: number;
  currentYear: number;
  onWeekChange: (week: number, year: number) => void;
}

export function WeekNavigation({ currentWeek, currentYear, onWeekChange }: WeekNavigationProps) {
  const handlePreviousWeek = () => {
    if (currentWeek === 1) {
      onWeekChange(52, currentYear - 1);
    } else {
      onWeekChange(currentWeek - 1, currentYear);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek === 52) {
      onWeekChange(1, currentYear + 1);
    } else {
      onWeekChange(currentWeek + 1, currentYear);
    }
  };

  const handleCurrentWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + start.getDay() + 1) / 7);
    onWeekChange(weekNumber, now.getFullYear());
  };

  const isCurrentWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    const thisWeek = Math.ceil((days + start.getDay() + 1) / 7);
    return currentWeek === thisWeek && currentYear === now.getFullYear();
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePreviousWeek}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div className="text-center">
              <div className="font-medium">
                Week {currentWeek}, {currentYear}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatWeekRange(currentWeek, currentYear)}
              </div>
            </div>
            {!isCurrentWeek() && (
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-accent"
                onClick={handleCurrentWeek}
              >
                Go to current week
              </Badge>
            )}
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextWeek}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}