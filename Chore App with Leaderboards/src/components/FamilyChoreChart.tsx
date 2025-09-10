import { useState, useEffect } from 'react';
import { User, Room, WeeklyAssignment } from '../types';
import { FamilyHeader } from './FamilyHeader';
import { WeekNavigation } from './WeekNavigation';
import { RoomCard } from './RoomCard';
import { Button } from './ui/button';
import { getCurrentWeek } from '../utils/weekUtils';
import { LogOut } from 'lucide-react';

interface FamilyChoreChartProps {
  users: User[];
  rooms: Room[];
  assignments: WeeklyAssignment[];
  currentUser: User;
  onCompleteChore: (assignmentId: string) => void;
  onLogout: () => void;
}

export function FamilyChoreChart({ 
  users, 
  rooms, 
  assignments,
  currentUser, 
  onCompleteChore,
  onLogout 
}: FamilyChoreChartProps) {
  const [currentWeek, setCurrentWeek] = useState(() => getCurrentWeek());

  const handleWeekChange = (week: number, year: number) => {
    setCurrentWeek({ weekNumber: week, year });
  };

  const currentWeekAssignments = assignments.filter(
    assignment => 
      assignment.weekNumber === currentWeek.weekNumber && 
      assignment.year === currentWeek.year
  );

  const getAssignmentsForRoom = (roomId: string) =>
    currentWeekAssignments.filter(assignment => assignment.roomId === roomId);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header with logout button */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <FamilyHeader users={users} currentUser={currentUser} />
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="flex items-center gap-2 ml-4"
          >
            <LogOut className="w-4 h-4" />
            Switch User
          </Button>
        </div>

        {/* Week Navigation */}
        <WeekNavigation
          currentWeek={currentWeek.weekNumber}
          currentYear={currentWeek.year}
          onWeekChange={handleWeekChange}
        />

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              assignments={getAssignmentsForRoom(room.id)}
              users={users}
              currentUser={currentUser}
              onCompleteChore={onCompleteChore}
            />
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-6xl mb-4">🏠</div>
            <h3>No rooms set up yet</h3>
            <p>Rooms and chores will appear here once they're configured.</p>
          </div>
        )}
      </div>
    </div>
  );
}