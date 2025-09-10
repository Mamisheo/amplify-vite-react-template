import React from 'react';

interface LetterBlockProps {
  letter: string;
  color: string;
}

const LetterBlock: React.FC<LetterBlockProps> = ({ letter, color }) => {
  return (
    <div
      className="letter-block"
      style={{
        backgroundColor: color,
        border: `3px solid ${color}`,
        borderRadius: '8px',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transform: 'perspective(100px) rotateX(5deg)',
      }}
    >
      {letter}
    </div>
  );
};

export default LetterBlock;