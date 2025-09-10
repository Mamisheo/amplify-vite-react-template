import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, Input, Heading } from '@aws-amplify/ui-react';
import { User } from '../types';

interface UserProfileSetupProps {
  onUserCreate: (user: Omit<User, 'totalPoints'>) => void;
  onCancel?: () => void;
  existingUser?: User;
  title?: string;
}

interface AvatarOption {
  id: string;
  color: string;
  textColor: string;
  initials: string;
  name: string;
}

const predefinedAvatars: AvatarOption[] = [
  { id: 'dad', color: '#4A90E2', textColor: '#FFFFFF', initials: 'D', name: 'Dad' },
  { id: 'mom', color: '#E94B3C', textColor: '#FFFFFF', initials: 'M', name: 'Mom' },
  { id: 'child1', color: '#50C878', textColor: '#FFFFFF', initials: 'A', name: 'Alex' },
  { id: 'child2', color: '#FFB347', textColor: '#FFFFFF', initials: 'S', name: 'Sam' },
  { id: 'teen1', color: '#9C27B0', textColor: '#FFFFFF', initials: 'J', name: 'Jordan' },
  { id: 'teen2', color: '#FF5722', textColor: '#FFFFFF', initials: 'T', name: 'Taylor' },
  { id: 'child3', color: '#00BCD4', textColor: '#FFFFFF', initials: 'C', name: 'Casey' },
  { id: 'child4', color: '#795548', textColor: '#FFFFFF', initials: 'R', name: 'Riley' },
  { id: 'parent1', color: '#3F51B5', textColor: '#FFFFFF', initials: 'P', name: 'Parent' },
  { id: 'family1', color: '#E91E63', textColor: '#FFFFFF', initials: 'F', name: 'Family' },
  { id: 'custom1', color: '#FFC107', textColor: '#333333', initials: 'U', name: 'User' },
  { id: 'custom2', color: '#607D8B', textColor: '#FFFFFF', initials: 'N', name: 'New' }
];

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ 
  onUserCreate, 
  onCancel, 
  existingUser,
  title = "Create New Family Member"
}) => {
  const [name, setName] = useState(existingUser?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption | null>(
    existingUser ? 
      predefinedAvatars.find(avatar => existingUser.avatar.includes(avatar.color.replace('#', ''))) || predefinedAvatars[0]
      : null
  );
  const [nameError, setNameError] = useState('');
  const [avatarError, setAvatarError] = useState('');

  useEffect(() => {
    if (name.trim()) {
      setNameError('');
    }
    if (selectedAvatar) {
      setAvatarError('');
    }
  }, [name, selectedAvatar]);

  const generateAvatarUrl = (avatar: AvatarOption, userName: string) => {
    const initials = userName.trim() ? userName.trim().charAt(0).toUpperCase() : avatar.initials;
    return `https://placehold.co/60x60/${avatar.color.replace('#', '')}/${avatar.textColor.replace('#', '')}?text=${initials}`;
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    }

    if (!selectedAvatar) {
      setAvatarError('Please select an avatar');
      hasError = true;
    }

    if (hasError) return;

    const newUser: Omit<User, 'totalPoints'> = {
      id: existingUser?.id || `user-${Date.now()}`,
      name: name.trim(),
      avatar: generateAvatarUrl(selectedAvatar!, name)
    };

    onUserCreate(newUser);
  };

  const previewAvatar = selectedAvatar && name.trim() ? 
    generateAvatarUrl(selectedAvatar, name) : 
    selectedAvatar ? generateAvatarUrl(selectedAvatar, selectedAvatar.initials) : null;

  return (
    <div className="user-profile-setup">
      <div className="setup-container">
        <Heading level={3} textAlign="center" marginBottom="2rem" color="#333">
          {title}
        </Heading>

        {/* Live Preview */}
        <div className="profile-preview">
          <Heading level={5} marginBottom="1rem" color="#666">
            Preview:
          </Heading>
          <div className="preview-avatar-container">
            {previewAvatar ? (
              <div className="preview-user-avatar">
                <img 
                  src={previewAvatar}
                  alt="Avatar preview"
                  className="preview-avatar-image"
                />
                <Text fontSize="0.9rem" fontWeight="bold" color="#333" marginTop="0.5rem">
                  {name.trim() || 'Enter name...'}
                </Text>
              </div>
            ) : (
              <div className="preview-placeholder">
                <div className="placeholder-avatar">?</div>
                <Text fontSize="0.9rem" color="#666" marginTop="0.5rem">
                  Select avatar & enter name
                </Text>
              </div>
            )}
          </div>
        </div>

        {/* Name Input */}
        <div className="input-section">
          <Text fontSize="1rem" fontWeight="bold" marginBottom="0.5rem" color="#333">
            Name:
          </Text>
          <Input
            placeholder="Enter family member's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            hasError={!!nameError}
            size="large"
            style={{ marginBottom: '0.5rem' }}
          />
          {nameError && (
            <Text fontSize="0.8rem" color="#F44336" marginBottom="1rem">
              {nameError}
            </Text>
          )}
        </div>

        {/* Avatar Selection */}
        <div className="avatar-section">
          <Text fontSize="1rem" fontWeight="bold" marginBottom="1rem" color="#333">
            Choose Avatar Color:
          </Text>
          {avatarError && (
            <Text fontSize="0.8rem" color="#F44336" marginBottom="1rem">
              {avatarError}
            </Text>
          )}
          <div className="avatar-grid">
            {predefinedAvatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`avatar-option ${selectedAvatar?.id === avatar.id ? 'selected' : ''}`}
                onClick={() => setSelectedAvatar(avatar)}
                style={{
                  backgroundColor: avatar.color,
                  borderColor: selectedAvatar?.id === avatar.id ? '#333' : 'transparent'
                }}
              >
                <span style={{ color: avatar.textColor }}>
                  {name.trim() ? name.trim().charAt(0).toUpperCase() : avatar.initials}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <Flex direction="row" gap="1rem" justifyContent="center" marginTop="2rem">
          {onCancel && (
            <Button
              variation="outlined"
              onClick={onCancel}
              size="large"
            >
              Cancel
            </Button>
          )}
          <Button
            variation="primary"
            onClick={handleSubmit}
            size="large"
            style={{
              backgroundColor: '#4CAF50',
              borderColor: '#4CAF50'
            }}
          >
            {existingUser ? 'Update Profile' : 'Create Profile'}
          </Button>
        </Flex>
      </div>
    </div>
};

export default UserProfileSetup;
