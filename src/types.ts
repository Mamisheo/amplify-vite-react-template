export interface User {
  id: string;
  name: string;
  avatar: string;
  totalPoints: number;
}

export interface Chore {
  id: string;
  name: string;
  points: number;
  assignedTo?: string[];
}

export interface ChoreData {
  title: string;
  color: string;
  chores: Chore[];
}

export interface CompletedChore {
  choreId: string;
  userId: string;
  points: number;
  date: string;
  completed: boolean;
}
