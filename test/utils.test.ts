/**
 * @jest-environment node
 */
import { cleanup } from '@testing-library/react';
import React from 'react';

import { styleFitContainer } from '../src/';
import { useIsomorphicLayoutEffect } from '../src/utils';

afterEach(cleanup);

describe('styleFitContainer', () => {
  it('Should return custom styles.', () => {
    expect(
      styleFitContainer({
        boxSizing: 'content-box',
        objectFit: 'contain',
        objectPosition: 'left',
        color: 'green',
      })
    ).toEqual(
      expect.objectContaining({
        boxSizing: 'content-box',
        objectFit: 'contain',
        objectPosition: 'left',
        color: 'green',
      })
    );
  });
});

describe('useIsomorphicLayoutEffect', () => {
  it('Should use `useEffect` in node environment.', () => {
    expect(useIsomorphicLayoutEffect.toString()).toBe(React.useEffect.toString());
  });
});
