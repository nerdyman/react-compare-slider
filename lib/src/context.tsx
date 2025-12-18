'use client';

import { createContext, type PropsWithChildren, useContext } from 'react';
import type { UseReactCompareSliderReturn } from './types';

export type ContextProps = UseReactCompareSliderReturn;

const Context = createContext<ContextProps>({} as ContextProps);

export type ProviderProps = PropsWithChildren<ContextProps>;

export const Provider: React.FC<ProviderProps> = ({ children, ...value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useReactCompareSliderContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useReactCompareSlider must be used within the Context component');
  }

  return context;
};
