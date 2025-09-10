import { useState } from 'react';
import { Chore, User } from '../types';
import { ChoreCard } from './ChoreCard';
import { AddChoreDialog } from './AddChoreDialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ListTodo, CheckCircle } from 'lucide-react';

interface ChoreListProps {
  chores: Chore[];
  currentUser: User;
  users: User[];
  onCompleteChore: (choreId: string) => void;
  onResetChore: (choreId: string) => void;
  onAddChore: (chore: Omit<Chore, 'id' | 'completed' | 'createdAt'>) => void;
}

export function ChoreList({ 
  chores, 
  currentUser, 
  users, 
  onCompleteChore, 
  onResetChore, 
  onAddChore 
}: ChoreListProps) {
  const [filter, setFilter] = useState<'all' | 'available' | 'completed'>('available');
  
  const availableChores = chores.filter(chore => !chore.completed);
  const completedChores = chores.filter(chore => chore.completed);
  
  const getFilteredChores = () => {
    switch (filter) {
      case 'available':
        return availableChores;
      case 'completed':
        return completedChores;
      default:
        return chores;
    }
  };

  const filteredChores = getFilteredChores();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="w-5 h-5" />
              Chores
            </CardTitle>
            <AddChoreDialog onAddChore={onAddChore} />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="available" className="flex items-center gap-2">
                Available
                <Badge variant="secondary" className="text-xs">
                  {availableChores.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                Completed
                <Badge variant="secondary" className="text-xs">
                  {completedChores.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                All
                <Badge variant="secondary" className="text-xs">
                  {chores.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={filter} className="mt-6">
              {filteredChores.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="mb-4">
                    {filter === 'available' ? (
                      <ListTodo className="w-16 h-16 mx-auto opacity-50" />
                    ) : (
                      <CheckCircle className="w-16 h-16 mx-auto opacity-50" />
                    )}
                  </div>
                  <h3>
                    {filter === 'available' 
                      ? 'No chores available' 
                      : filter === 'completed'
                      ? 'No completed chores yet'
                      : 'No chores yet'
                    }
                  </h3>
                  <p className="text-sm mt-1">
                    {filter === 'available' 
                      ? 'All chores have been completed! Great work!' 
                      : filter === 'completed'
                      ? 'Complete some chores to see them here.'
                      : 'Add some chores to get started.'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {filteredChores.map((chore) => (
                    <ChoreCard
                      key={chore.id}
                      chore={chore}
                      currentUser={currentUser}
                      users={users}
                      onCompleteChore={onCompleteChore}
                      onResetChore={onResetChore}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}