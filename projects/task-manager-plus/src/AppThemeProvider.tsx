import { useState, useMemo } from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import { ThemeContext, type ModeType } from './ThemeContext';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [mode, setMode] = useState<ModeType>(`system`);
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: dark)`);

  const effectiveMode =
    mode === `system` ? (prefersDarkMode ? `dark` : `light`) : mode;

  const contextValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  const theme = createTheme({
    palette: {
      mode: effectiveMode,
      primary: {
        main: effectiveMode === `dark` ? `#90caf9` : `#1976d2`,
      },
      background: {
        default: effectiveMode === `dark` ? `#121212` : `#f5f5f5`,
        paper: effectiveMode === `dark` ? `#1e1e1e` : `#ffffff`,
      },
    },
  });

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
