import React from 'react';

export const PageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <React.StrictMode>{children}</React.StrictMode>;
};
