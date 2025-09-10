import { Room, User, WeeklyAssignment, RoomChore } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CheckCircle, Clock, Star, User as UserIcon } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  assignments: WeeklyAssignment[];
  users: User[];
  currentUser: User;
  onCompleteChore: (assignmentId: string) => void;
}

const roomIcons: Record<string, string> = {
  'boys-room': '🛏️',
  'kitchen': '🍽️',
  'laundry': '🧺',
  'living-room': '🛋️',
  'hallway': '🚪',
  'bathroom': '🚿',
  'outdoor': '🌱'
};

export function RoomCard({ room, assignments, users, currentUser, onCompleteChore }: RoomCardProps) {
  const getUserById = (userId: string) => users.find(u => u.id === userId);
  
  const getChoreById = (choreId: string) => 
    room.chores.find(c => c.id === choreId);

  return (
    <Card className="overflow-hidden">
      <CardHeader 
        className="text-white"
        style={{ backgroundColor: room.color }}
      >
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">
            {roomIcons[room.id] || '🏠'}
          </span>
          {room.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {assignments.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <UserIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No chores assigned this week</p>
          </div>
        ) : (
          <div className="divide-y">
            {assignments.map((assignment) => {
              const assignedUser = getUserById(assignment.userId);
              const chore = getChoreById(assignment.choreId);
              const isCurrentUserAssignment = assignment.userId === currentUser.id;
              
              if (!assignedUser || !chore) return null;

              return (
                <div 
                  key={assignment.id}
                  className={`p-4 transition-colors ${
                    isCurrentUserAssignment ? 'bg-accent/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        {chore.title}
                        {assignment.completed && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </h4>
                      {chore.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {chore.description}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {chore.points}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={assignedUser.avatar} />
                        <AvatarFallback 
                          style={{ 
                            backgroundColor: assignedUser.color, 
                            color: 'white',
                            fontSize: '0.6rem'
                          }}
                        >
                          {assignedUser.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {assignedUser.name}
                        {isCurrentUserAssignment && (
                          <span className="text-xs text-muted-foreground ml-1">(You)</span>
                        )}
                      </span>
                    </div>

                    {assignment.completed ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Completed</span>
                        {assignment.completedAt && (
                          <span className="text-xs">
                            {new Date(assignment.completedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ) : isCurrentUserAssignment ? (
                      <Button
                        size="sm"
                        onClick={() => onCompleteChore(assignment.id)}
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Complete
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Pending
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}