import { useState } from 'react';
import { User } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Plus, Trophy } from 'lucide-react';

interface UserSelectorProps {
  users: User[];
  currentUser: User | null;
  onUserSelect: (user: User) => void;
  onUserCreate: (name: string) => void;
}

const avatarOptions = [
  '🧑‍💼', '👩‍💼', '🧑‍🎓', '👩‍🎓', '🧑‍🍳', '👩‍🍳', 
  '🧑‍🔧', '👩‍🔧', '🧑‍🎨', '👩‍🎨', '🧑‍🌾', '👩‍🌾'
];

export function UserSelector({ users, currentUser, onUserSelect, onUserCreate }: UserSelectorProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);

  const handleCreateUser = () => {
    if (newUserName.trim()) {
      onUserCreate(newUserName.trim());
      setNewUserName('');
      setIsCreating(false);
      setSelectedAvatar(avatarOptions[0]);
    }
  };

  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  if (currentUser) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Current User
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{currentUser.name}</h3>
              <Badge variant="secondary">{currentUser.totalPoints} points</Badge>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onUserSelect(null as any)}
            className="w-full"
          >
            Switch User
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Select Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedUsers.map((user, index) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user)}
            className="flex items-center gap-3 p-3 bg-accent hover:bg-accent/80 rounded-lg cursor-pointer transition-colors"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{user.name}</h3>
                {index === 0 && user.totalPoints > 0 && (
                  <Trophy className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <Badge variant="secondary" className="text-xs">
                {user.totalPoints} points
              </Badge>
            </div>
          </div>
        ))}

        {!isCreating ? (
          <Button
            variant="outline"
            onClick={() => setIsCreating(true)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Profile
          </Button>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder="Enter your name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateUser()}
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose Avatar:</label>
              <div className="grid grid-cols-6 gap-2">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-8 h-8 text-lg rounded border-2 hover:border-primary transition-colors ${
                      selectedAvatar === avatar ? 'border-primary' : 'border-border'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewUserName('');
                  setSelectedAvatar(avatarOptions[0]);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateUser}
                disabled={!newUserName.trim()}
                className="flex-1"
              >
                Create
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}