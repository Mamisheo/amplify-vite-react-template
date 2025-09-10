import React from 'react';
import { Flex } from '@aws-amplify/ui-react';
import { User } from '../types';
import LetterBlock from './LetterBlock';
import UserAvatar from './UserAvatar';

interface FamilyHeaderProps {
  users: User[];
}

const FamilyHeader: React.FC<FamilyHeaderProps> = ({ users }) => {
  const familyName = 'VARGAS';
  const familyWord = 'FAMILY';
  
  const nameColors = ['#2196F3', '#F44336', '#00BCD4', '#4CAF50', '#FF9800', '#E91E63'];
  const familyColors = ['#9C27B0', '#FFC107', '#2196F3', '#F44336', '#00BCD4', '#795548'];

  return (
    <div className="family-header">
      <Flex direction="row" alignItems="center" justifyContent="center" wrap="wrap" gap="1rem">
        {users.length > 0 && (
          <UserAvatar user={users[0]} />
        )}
        
        <Flex direction="row" gap="0.5rem" alignItems="center">
          {familyName.split('').map((letter, index) => (
            <LetterBlock 
              key={`name-${index}`} 
              letter={letter} 
              color={nameColors[index % nameColors.length]} 
            />
          ))}
        </Flex>
        
        {users.length > 1 && (
          <UserAvatar user={users[1]} />
        )}
      </Flex>
      
      <Flex direction="row" alignItems="center" justifyContent="center" wrap="wrap" gap="1rem" marginTop="1rem">
        {users.length > 2 && (
          <UserAvatar user={users[2]} />
        )}
        
        <Flex direction="row" gap="0.5rem" alignItems="center">
          {familyWord.split('').map((letter, index) => (
            <LetterBlock 
              key={`family-${index}`} 
              letter={letter} 
              color={familyColors[index % familyColors.length]} 
            />
          ))}
        </Flex>
        
        {users.length > 3 && (
          <UserAvatar user={users[3]} />
        )}
      </Flex>
    </div>
  );
};

export default FamilyHeader;