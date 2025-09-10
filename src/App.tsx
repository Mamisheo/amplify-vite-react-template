import React from 'react';
import { Flex } from '@aws-amplify/ui-react';
import { Flex, Button } from '@aws-amplify/ui-react';
import React, { useState, useEffect } from 'react';
import { Flex } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import FamilyHeader from './components/FamilyHeader';
import UserManagement from './components/UserManagement';
import ChoreSection from './components/ChoreSection';
import Leaderboard from './components/Leaderboard';
import { User, ChoreData, CompletedChore } from './types';
import './components/UserProfileSetup.css';
import './components/UserManagement.css';
import { initialUsers, choreData } from './data/choreData';
import './App.css';

function App() {
  const [showUserManagement, setShowUserManagement] = useState(false);
  return React.createElement('div', null, 
    React.createElement(Heading, { level: 1 }, 'Welcome to Amplify')
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [completedChores, setCompletedChores] = useState<CompletedChore[]>([]);
    

  // Load completed chores from localStorage on component mount
  useEffect(() => {
    const savedChores = localStorage.getItem('completedChores');
    const savedUsers = localStorage.getItem('users');
    
    if (savedChores) {
      try {
        const parsed = JSON.parse(savedChores);
    

      } catch (error) {
        console.error('Error loading saved chores:', error);
      }
    }
    
    if (savedUsers) {
      try {
        const parsed = JSON.parse(savedUsers);
        setUsers(parsed);
      } catch (error) {
        console.error('Error loading saved users:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('completedChores', JSON.stringify(completedChores));
  }, [completedChores]);

    

    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleChoreComplete = (choreId: string, userId: string, points: number) => {
    const today = new Date().toDateString();
    
    // Check if chore is already completed today
    const existingChore = completedChores.find(
      

    );

    if (existingChore) {
      // Remove completion (undo)
      setCompletedChores(prev => 
        prev.filter(chore => !(chore.choreId === choreId && chore.userId === userId && chore.date === today))
      );
      
      // Subtract points from user
        prev.map(user => 
          user.id === userId 
            ? { ...user, totalPoints: Math.max(0, user.totalPoints - points) }
            : user
        )
      );
      

      const newCompletedChore: CompletedChore = {
      

        userId,
        points,
        date: today,
        completed: true
      };
      
      setCompletedChores(prev => [...prev, newCompletedChore]);
      
      // Add points to user
      setUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, totalPoints: user.totalPoints + points }
            : user
        )
      );
    }
  };

  const isChoreCompleted = (choreId: string, userId: string): boolean => {
    const today = new Date().toDateString();
    return completedChores.some(
      chore => chore.choreId === choreId && chore.userId === userId && chore.date === today && chore.completed
    );
  const handleUserAdd = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleUserDelete = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    // Also remove completed chores for this user
    setCompletedChores(prev => prev.filter(chore => chore.userId !== userId));
  };

  };

  const resetDailyChores = () => {
      
      <Flex direction="row" justifyContent="center" marginBottom="1rem">
        <Button
          variation="outlined"
          onClick={() => setShowUserManagement(!showUserManagement)}
        >
          {showUserManagement ? 'Hide' : 'Manage'} Family Members
        </Button>
      </Flex>

      {showUserManagement && (
        <UserManagement
          users={users}
          onUserAdd={handleUserAdd}
          onUserUpdate={handleUserUpdate}
          onUserDelete={handleUserDelete}
        />
      )}

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    // Remove chores from previous days
    setCompletedChores(prev => 
      prev.filter(chore => chore.date === today)
    );
  };

  return (
    <div className="app">
      <FamilyHeader users={users} />
      <Leaderboard users={users} />
      
      <Flex direction="column" gap="1rem">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <button 
            onClick={resetDailyChores}
            style={{
              backgroundColor: '#FF5722',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}
          >
            Reset Daily Chores
          </button>
        </div>
        
        <div className="chore-sections">
          {choreData.map((section, index) => (
            <ChoreSection
              key={`section-${index}`}
              section={section}
              users={users}
              onChoreComplete={handleChoreComplete}
              isChoreCompleted={isChoreCompleted}
            />
          ))}
        </div>
      </Flex>
    </div>
  );
}

export default App;
      setUsers(prev => 
      // Add completion