import React from 'react';
import { Flex, Heading } from '@aws-amplify/ui-react';
import { ChoreData, User } from '../types';
import ChoreItem from './ChoreItem';

interface ChoreSectionProps {
  section: ChoreData;
  users: User[];
  onChoreComplete: (choreId: string, userId: string, points: number) => void;
  isChoreCompleted: (choreId: string, userId: string) => boolean;
}

const ChoreSection: React.FC<ChoreSectionProps> = ({ 
  section, 
  users, 
  onChoreComplete, 
  isChoreCompleted 
}) => {
  return (
    <div className="chore-section" style={{ marginBottom: '2rem' }}>
    <div className="chore-section">
      <div 
        className="section-header"
        style={{ 
          backgroundColor: section.color,
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          marginBottom: '1rem',
          borderRadius: '8px 8px 0 0'
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        {section.title}
      </div>
      

      <div className="chores-grid">
        {section.chores.map((chore) => (
          <ChoreItem
            chore={chore}
            users={users}
            onChoreComplete={onChoreComplete}
            isChoreCompleted={isChoreCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default ChoreSection;
            key={chore.id}
