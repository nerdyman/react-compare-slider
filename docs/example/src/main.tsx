import { StrictMode } from 'react';
import packageJson from 'react-compare-slider/package.json';
import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

console.info('react-compare-slider version:', packageJson.version);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
