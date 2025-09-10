import { User } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award, Star } from 'lucide-react';

interface LeaderboardProps {
  users: User[];
  currentUser: User;
}

export function Leaderboard({ users, currentUser }: LeaderboardProps) {
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-orange-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-muted-foreground">#{index + 1}</span>;
    }
  };

  const getRankColor = (index: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'border-primary bg-primary/5';
    switch (index) {
      case 0:
        return 'border-yellow-200 bg-yellow-50';
      case 1:
        return 'border-gray-200 bg-gray-50';
      case 2:
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No users yet. Create a profile to get started!</p>
          </div>
        ) : (
          sortedUsers.map((user, index) => {
            const isCurrentUser = user.id === currentUser.id;
            return (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${getRankColor(index, isCurrentUser)}`}
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(index)}
                </div>
                
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${isCurrentUser ? 'text-primary' : ''}`}>
                    {user.name}
                    {isCurrentUser && <span className="text-xs ml-2 text-muted-foreground">(You)</span>}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="text-right">
                  <Badge 
                    variant={index < 3 ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    <Star className="w-3 h-3" />
                    {user.totalPoints}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    points
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}