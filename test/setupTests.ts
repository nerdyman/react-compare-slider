import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

const ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

Object.defineProperty(globalThis, 'ResizeObserver', { value: ResizeObserver });
