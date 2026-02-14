export type EmulateMediaProps = {
  reducedMotion?: 'reduce' | 'no-preference' | null;
  colorScheme?: 'light' | 'dark' | 'no-preference' | null;
  forcedColors?: 'active' | 'none' | null;
};

export type EmulateMediaFn = (options: EmulateMediaProps) => Promise<void>;
