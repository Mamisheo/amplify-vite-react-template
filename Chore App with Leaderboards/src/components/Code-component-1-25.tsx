import { Chore, User } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CheckCircle, Clock, Star } from 'lucide-react';

interface ChoreCardProps {
  chore: Chore;
  currentUser: User;
  users: User[];
  onCompleteChore: (choreId: string) => void;
  onResetChore: (choreId: string) => void;
}

const categoryColors = {
  cleaning: 'bg-blue-100 text-blue-800',
  kitchen: 'bg-orange-100 text-orange-800',
  outdoor: 'bg-green-100 text-green-800',
  pets: 'bg-purple-100 text-purple-800',
  organization: 'bg-pink-100 text-pink-800',
  other: 'bg-gray-100 text-gray-800'
};

const categoryIcons = {
  cleaning: '🧹',
  kitchen: '🍽️',
  outdoor: '🌱',
  pets: '🐕',
  organization: '📁',
  other: '📝'
};

export function ChoreCard({ chore, currentUser, users, onCompleteChore, onResetChore }: ChoreCardProps) {
  const completedByUser = chore.completedBy ? users.find(u => u.id === chore.completedBy) : null;
  const isCompletedByCurrentUser = chore.completedBy === currentUser.id;
  
  return (
    <Card className={`transition-all duration-200 ${chore.completed ? 'opacity-75' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-lg">{categoryIcons[chore.category]}</span>
              {chore.title}
              {chore.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{chore.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={categoryColors[chore.category]} variant="secondary">
              {chore.category}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              {chore.points} pts
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {chore.completed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Completed {new Date(chore.completedAt!).toLocaleDateString()}
            </div>
            
            {completedByUser && (
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={completedByUser.avatar} />
                  <AvatarFallback>{completedByUser.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-sm">Completed by {completedByUser.name}</span>
              </div>
            )}
            
            {isCompletedByCurrentUser && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onResetChore(chore.id)}
                className="w-full"
              >
                Mark as Incomplete
              </Button>
            )}
          </div>
        ) : (
          <Button
            onClick={() => onCompleteChore(chore.id)}
            className="w-full"
          >
            Complete Chore (+{chore.points} points)
          </Button>
        )}
      </CardContent>
    </Card>
  );
}