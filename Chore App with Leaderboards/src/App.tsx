import { useState, useEffect } from 'react';
import { User, Room, WeeklyAssignment, RoomChore } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserSelector } from './components/UserSelector';
import { FamilyChoreChart } from './components/FamilyChoreChart';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { getCurrentWeek } from './utils/weekUtils';

// Default rooms and chores based on the family chart image
const defaultRooms: Room[] = [
  {
    id: 'boys-room',
    name: 'Boys Room',
    color: '#8B5CF6',
    chores: [
      { id: 'boys-room-1', title: 'Make beds', points: 3, frequency: 'daily' },
      { id: 'boys-room-2', title: 'Pick up toys', points: 2, frequency: 'daily' },
      { id: 'boys-room-3', title: 'Vacuum floor', points: 5, frequency: 'weekly' },
      { id: 'boys-room-4', title: 'Dust surfaces', points: 4, frequency: 'weekly' }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen & Dining',
    color: '#F97316',
    chores: [
      { id: 'kitchen-1', title: 'Load dishwasher', points: 3, frequency: 'daily' },
      { id: 'kitchen-2', title: 'Wipe counters', points: 2, frequency: 'daily' },
      { id: 'kitchen-3', title: 'Sweep floor', points: 3, frequency: 'daily' },
      { id: 'kitchen-4', title: 'Take out trash', points: 2, frequency: 'weekly' },
      { id: 'kitchen-5', title: 'Clean appliances', points: 6, frequency: 'weekly' }
    ]
  },
  {
    id: 'laundry',
    name: 'Laundry Room',
    color: '#10B981',
    chores: [
      { id: 'laundry-1', title: 'Sort clothes', points: 2, frequency: 'weekly' },
      { id: 'laundry-2', title: 'Start wash', points: 1, frequency: 'weekly' },
      { id: 'laundry-3', title: 'Move to dryer', points: 1, frequency: 'weekly' },
      { id: 'laundry-4', title: 'Fold clothes', points: 4, frequency: 'weekly' },
      { id: 'laundry-5', title: 'Put away clothes', points: 3, frequency: 'weekly' }
    ]
  },
  {
    id: 'living-room',
    name: 'Living Room',
    color: '#EF4444',
    chores: [
      { id: 'living-1', title: 'Vacuum carpet', points: 5, frequency: 'weekly' },
      { id: 'living-2', title: 'Dust furniture', points: 4, frequency: 'weekly' },
      { id: 'living-3', title: 'Organize pillows', points: 1, frequency: 'daily' },
      { id: 'living-4', title: 'Empty wastebaskets', points: 2, frequency: 'weekly' }
    ]
  },
  {
    id: 'hallway',
    name: 'Hallway & Stairs',
    color: '#3B82F6',
    chores: [
      { id: 'hallway-1', title: 'Vacuum stairs', points: 4, frequency: 'weekly' },
      { id: 'hallway-2', title: 'Wipe down walls', points: 3, frequency: 'weekly' },
      { id: 'hallway-3', title: 'Organize shoes', points: 2, frequency: 'weekly' },
      { id: 'hallway-4', title: 'Clean mirrors', points: 2, frequency: 'weekly' }
    ]
  }
];

function generateWeeklyAssignments(users: User[], rooms: Room[], weekNumber: number, year: number): WeeklyAssignment[] {
  if (users.length === 0) return [];
  
  const assignments: WeeklyAssignment[] = [];
  let userIndex = 0;

  // Rotate user assignments based on week number to ensure fairness
  const weekOffset = (weekNumber - 1) % users.length;

  rooms.forEach((room) => {
    room.chores.forEach((chore) => {
      const assignedUserIndex = (userIndex + weekOffset) % users.length;
      const assignedUser = users[assignedUserIndex];
      
      assignments.push({
        id: `${room.id}-${chore.id}-${weekNumber}-${year}`,
        choreId: chore.id,
        roomId: room.id,
        userId: assignedUser.id,
        weekNumber,
        year,
        completed: false
      });
      
      userIndex++;
    });
  });

  return assignments;
}

export default function App() {
  const [users, setUsers] = useLocalStorage<User[]>('family-chore-users', []);
  const [rooms] = useLocalStorage<Room[]>('family-chore-rooms', defaultRooms);
  const [assignments, setAssignments] = useLocalStorage<WeeklyAssignment[]>('family-chore-assignments', []);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Generate assignments for current week if they don't exist
  useEffect(() => {
    if (users.length > 0) {
      const { weekNumber, year } = getCurrentWeek();
      const currentWeekAssignments = assignments.filter(
        a => a.weekNumber === weekNumber && a.year === year
      );

      if (currentWeekAssignments.length === 0) {
        const newAssignments = generateWeeklyAssignments(users, rooms, weekNumber, year);
        setAssignments(prev => [...prev, ...newAssignments]);
      }
    }
  }, [users, rooms, assignments, setAssignments]);

  const handleUserCreate = (name: string, avatar: string, color: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      avatar,
      color,
      totalPoints: 0,
      createdAt: new Date().toISOString()
    };

    setUsers(prev => {
      const updatedUsers = [...prev, newUser];
      
      // Generate assignments for current week with new user list
      const { weekNumber, year } = getCurrentWeek();
      const currentWeekAssignments = assignments.filter(
        a => a.weekNumber === weekNumber && a.year === year
      );

      if (currentWeekAssignments.length === 0) {
        const newAssignments = generateWeeklyAssignments(updatedUsers, rooms, weekNumber, year);
        setAssignments(prevAssignments => [...prevAssignments, ...newAssignments]);
      }

      return updatedUsers;
    });
    
    setCurrentUser(newUser);
    toast.success(`Welcome to the family, ${name}!`);
  };

  const handleCompleteChore = (assignmentId: string) => {
    if (!currentUser) return;

    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment || assignment.completed || assignment.userId !== currentUser.id) return;

    // Find the chore to get points
    const room = rooms.find(r => r.id === assignment.roomId);
    const chore = room?.chores.find(c => c.id === assignment.choreId);
    
    if (!chore) return;

    // Update assignment
    setAssignments(prev => prev.map(a => 
      a.id === assignmentId 
        ? { ...a, completed: true, completedAt: new Date().toISOString() }
        : a
    ));

    // Update user points
    setUsers(prev => prev.map(u => 
      u.id === currentUser.id 
        ? { ...u, totalPoints: u.totalPoints + chore.points }
        : u
    ));

    // Update current user state
    setCurrentUser(prev => prev ? { ...prev, totalPoints: prev.totalPoints + chore.points } : null);

    toast.success(`Great job! +${chore.points} points for completing "${chore.title}"`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Auto-generate assignments for new weeks
  useEffect(() => {
    if (users.length > 0) {
      const { weekNumber, year } = getCurrentWeek();
      
      // Check if we need assignments for surrounding weeks
      for (let i = -1; i <= 1; i++) {
        let checkWeek = weekNumber + i;
        let checkYear = year;
        
        if (checkWeek < 1) {
          checkWeek = 52;
          checkYear = year - 1;
        } else if (checkWeek > 52) {
          checkWeek = 1;
          checkYear = year + 1;
        }

        const weekAssignments = assignments.filter(
          a => a.weekNumber === checkWeek && a.year === checkYear
        );

        if (weekAssignments.length === 0) {
          const newAssignments = generateWeeklyAssignments(users, rooms, checkWeek, checkYear);
          setAssignments(prev => [...prev, ...newAssignments]);
        }
      }
    }
  }, [users, rooms, assignments, setAssignments]);

  return (
    <div className="min-h-screen bg-background">
      {!currentUser ? (
        <div className="flex items-center justify-center min-h-screen p-4">
          <UserSelector
            users={users}
            currentUser={currentUser}
            onUserSelect={setCurrentUser}
            onUserCreate={handleUserCreate}
          />
        </div>
      ) : (
        <FamilyChoreChart
          users={users}
          rooms={rooms}
          assignments={assignments}
          currentUser={currentUser}
          onCompleteChore={handleCompleteChore}
          onLogout={handleLogout}
        />
      )}
      <Toaster />
    </div>
  );
}