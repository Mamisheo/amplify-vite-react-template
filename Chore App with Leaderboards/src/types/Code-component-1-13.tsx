export interface User {
  id: string;
  name: string;
  avatar: string;
  totalPoints: number;
  createdAt: string;
}

export interface Chore {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'cleaning' | 'kitchen' | 'outdoor' | 'pets' | 'organization' | 'other';
  completed: boolean;
  completedBy?: string;
  completedAt?: string;
  createdAt: string;
}

export interface ChoreCompletion {
  choreId: string;
  userId: string;
  points: number;
  completedAt: string;
}