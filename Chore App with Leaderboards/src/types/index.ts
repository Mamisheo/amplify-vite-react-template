export interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
  totalPoints: number;
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  color: string;
  chores: RoomChore[];
}

export interface RoomChore {
  id: string;
  title: string;
  description?: string;
  points: number;
  frequency: 'daily' | 'weekly' | 'biweekly';
}

export interface WeeklyAssignment {
  id: string;
  choreId: string;
  roomId: string;
  userId: string;
  weekNumber: number;
  year: number;
  completed: boolean;
  completedAt?: string;
}

export interface ChoreCompletion {
  choreId: string;
  userId: string;
  points: number;
  completedAt: string;
}