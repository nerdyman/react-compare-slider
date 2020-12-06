import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { ResizeObserver } from 'resize-observer';

Object.defineProperty(window, 'ResizeObserver', { value: ResizeObserver });
