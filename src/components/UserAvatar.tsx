import React from 'react';
import { User } from '../types';

interface UserAvatarProps {
  user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div className="user-avatar">
      <img 
        src={user.avatar} 
        alt={`${user.name} avatar`}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '3px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
      <div style={{ 
        textAlign: 'center', 
        marginTop: '4px', 
        fontSize: '12px', 
        fontWeight: 'bold',
        color: '#333'
      }}>
        {user.name}
      </div>
    </div>
  );
};

export default UserAvatar;