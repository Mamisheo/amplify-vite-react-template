import { Chore, User } from '../types';
import { ChoreList } from './ChoreList';
import { Leaderboard } from './Leaderboard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Trophy, ListTodo, User as UserIcon, Star, Target, Award, LogOut } from 'lucide-react';

interface DashboardProps {
  currentUser: User;
  users: User[];
  chores: Chore[];
  onCompleteChore: (choreId: string) => void;
  onResetChore: (choreId: string) => void;
  onAddChore: (chore: Omit<Chore, 'id' | 'completed' | 'createdAt'>) => void;
  onLogout: () => void;
}

export function Dashboard({ 
  currentUser, 
  users, 
  chores, 
  onCompleteChore, 
  onResetChore, 
  onAddChore,
  onLogout 
}: DashboardProps) {
  const completedChores = chores.filter(chore => chore.completed && chore.completedBy === currentUser.id);
  const availableChores = chores.filter(chore => !chore.completed);
  const userRank = [...users].sort((a, b) => b.totalPoints - a.totalPoints).findIndex(u => u.id === currentUser.id) + 1;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">Welcome back, {currentUser.name}!</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {currentUser.totalPoints} points
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    Rank #{userRank}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Switch User
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Available Chores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableChores.length}</div>
              <p className="text-xs text-muted-foreground">
                Ready to complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-green-500" />
                Completed Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedChores.filter(chore => 
                  new Date(chore.completedAt!).toDateString() === new Date().toDateString()
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Great job!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.totalPoints}</div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="chores" className="space-y-6">
          <TabsList>
            <TabsTrigger value="chores" className="flex items-center gap-2">
              <ListTodo className="w-4 h-4" />
              Chores
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chores">
            <ChoreList
              chores={chores}
              currentUser={currentUser}
              users={users}
              onCompleteChore={onCompleteChore}
              onResetChore={onResetChore}
              onAddChore={onAddChore}
            />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard users={users} currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}