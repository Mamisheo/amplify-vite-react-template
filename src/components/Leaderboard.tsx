import React from 'react';
import { Flex, Heading, Text } from '@aws-amplify/ui-react';
import { User } from '../types';

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return '#FFD700'; // Gold
      case 1: return '#C0C0C0'; // Silver
      case 2: return '#CD7F32'; // Bronze
      default: return '#FF9800'; // Orange
    }
  };

  return (
    <div className="leaderboard">
      <Heading level={3} textAlign="center" marginBottom="1rem" color="#333">
        🏆 Family Leaderboard 🏆
      </Heading>
      <Flex direction="row" justifyContent="center" gap="2rem" wrap="wrap">
        {sortedUsers.map((user, index) => (
          <div key={user.id} className="leaderboard-item">
            <div className="rank-badge" style={{ backgroundColor: getRankColor(index) }}>
              #{index + 1}
            </div>
            <img 
              src={user.avatar} 
              alt={`${user.name} avatar`}
              className="leaderboard-avatar"
            />
            <Text fontWeight="bold" fontSize="1.1rem">{user.name}</Text>
            <Text fontSize="1.2rem" color="#4CAF50" fontWeight="bold">
              {user.totalPoints} pts
            </Text>
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default Leaderboard;