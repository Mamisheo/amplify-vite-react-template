import { User } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import familyImage from 'figma:asset/3cedaae97ab9cd0608ed5224e6504bb726daf35c.png';

interface FamilyHeaderProps {
  users: User[];
  currentUser: User;
}

export function FamilyHeader({ users, currentUser }: FamilyHeaderProps) {
  return (
    <div className="relative">
      {/* Family Image Background */}
      <div className="w-full h-32 relative overflow-hidden rounded-lg mb-6">
        <ImageWithFallback 
          src={familyImage} 
          alt="Family Chore Chart"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h1 className="text-white text-2xl font-bold drop-shadow-lg">
            Family Chore Chart
          </h1>
        </div>
      </div>

      {/* Family Members */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {users.map((user) => {
          const isCurrentUser = user.id === currentUser.id;
          return (
            <div 
              key={user.id}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                isCurrentUser 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-card hover:bg-accent'
              }`}
              style={{
                backgroundColor: isCurrentUser ? user.color : undefined,
                borderColor: user.color,
                borderWidth: isCurrentUser ? 0 : '2px'
              }}
            >
              <Avatar className="w-12 h-12 mb-2 border-2 border-white shadow-md">
                <AvatarImage src={user.avatar} />
                <AvatarFallback 
                  style={{ backgroundColor: user.color, color: 'white' }}
                >
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <div className="font-medium text-sm">{user.name}</div>
                <Badge 
                  variant={isCurrentUser ? "secondary" : "outline"} 
                  className="text-xs mt-1"
                  style={{
                    backgroundColor: isCurrentUser ? 'rgba(255,255,255,0.2)' : undefined,
                    borderColor: isCurrentUser ? 'rgba(255,255,255,0.3)' : user.color
                  }}
                >
                  {user.totalPoints} pts
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}