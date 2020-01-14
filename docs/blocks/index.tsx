import React from 'react';

export const StoryContainer: React.FC<any> = ({ style, ...props }) => (
  <div
    style={{
      minHeight: '100vh',
      ...style,
    }}
    {...props}
  ></div>
);

export const StoryNote: React.FC<any> = ({ style, ...props }) => (
  <p
    style={{
      fontFamily: 'sans-serif',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      color: 'white',
      ...style,
    }}
    {...props}
  />
);
