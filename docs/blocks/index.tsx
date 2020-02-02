import React from 'react';

export const CustomStoryContainer: React.FC<any> = ({ style, ...props }) => (
  <div
    data-custom-story="container"
    style={{
      flexGrow: 1,
      minHeight: '100%',
      ...style,
    }}
    {...props}
  ></div>
);

export const CustomStoryNote: React.FC<any> = ({ style, ...props }) => (
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
