import { useContext, createContext } from 'react';

export type ModeType = `light` | `system` | `dark`;

interface ModeContextType {
  mode: ModeType;
  setMode: (modeValue: ModeType) => void;
}

export const ThemeContext = createContext<ModeContextType | undefined>(
  undefined
);

export function useAppTheme(): ModeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(`UseAppTheme must be used within AppThemeProvider.`);
  }
  return context;
}
