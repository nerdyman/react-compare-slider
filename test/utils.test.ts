import { cleanup } from '@testing-library/react';

import { styleFitContainer } from '../src';

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
