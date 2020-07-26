import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { styleFitContainer, supportsCssObjectFit } from '../src';

afterEach(cleanup);

describe('styleFitContainer', () => {
  it('Should return object.', () => {
    expect(typeof styleFitContainer()).toBe('object');
  });

  it("Should return 'contain' style.", () => {
    expect(styleFitContainer({ objectFit: 'contain' }).objectFit).toBe(
      'contain'
    );
  });

  it('Should return with custom props.', () => {
    expect(styleFitContainer({ color: 'green' }).color).toBe('green');
  });
});

describe('supportsCssObjectFit', () => {
  let windowSpy: any;

  beforeEach(() => {
    windowSpy = jest.spyOn(global as any, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('Should pass on supported client.', () => {
    const mockedSupports = jest.fn(() => true);
    const originalOpen = (window as any).CSS.supports;
    (window as any).CSS.supports = mockedSupports;

    expect(supportsCssObjectFit()).toBe(true);

    (window as any).CSS.supports = originalOpen;
  });

  it('Should fail on unsupported client.', () => {
    expect(supportsCssObjectFit()).toBe(false);
  });
});
