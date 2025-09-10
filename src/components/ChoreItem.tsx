import React from 'react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { Flex, Text } from '@aws-amplify/ui-react';
import { Chore, User } from '../types';

interface ChoreItemProps {
  chore: Chore;
  users: User[];
  onChoreComplete: (choreId: string, userId: string, points: number) => void;
  isChoreCompleted: (choreId: string, userId: string) => boolean;
}

const ChoreItem: React.FC<ChoreItemProps> = ({ 
  chore, 
  users, 
  onChoreComplete, 
  isChoreCompleted 
}) => {
  if (chore.points === 0) {
    return (
      <div className="chore-item">
        <Text fontWeight="bold" fontSize="0.9rem" color="#666">
          {chore.name}
        </Text>
      </div>
  return (
    <div className="chore-item">
      <Text fontWeight="bold" fontSize="0.9rem" marginBottom="0.5rem">
        {chore.name}
      </Text>
      <Text fontSize="0.8rem" color="#666" marginBottom="1rem">
        {chore.points} points
      </Text>
      
      <Flex direction="row" gap="0.5rem" wrap="wrap">
        {users.map((user) => {
          const completed = isChoreCompleted(chore.id, user.id);
          return (
            <Button
              key={user.id}
