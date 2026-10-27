import { useState, useEffect, createContext, useCallback, useMemo } from "react";

import type { ThemeProviderProps, Theme, ThemeContextValue } from "@/types";

const themes: Record<Theme, Theme> = {
  light: `dark`,
  dark: `pink`,
  pink: `light`,
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const [theme, setTheme] = useState<Theme>(getThemeFromStorage);

  useEffect(() => {
    document.documentElement.setAttribute(`data-theme`, theme);
    localStorage.setItem(`theme`, theme);
  }, [theme]);

  function getThemeFromStorage(): Theme {
    const savedTheme = localStorage.getItem(`theme`);
    if (savedTheme === `light` || savedTheme === `dark` || savedTheme === `pink`) return savedTheme;
    return `light`;
  }

  const handleToggleTheme = useCallback(() => {
    setTheme((currentTheme) => themes[currentTheme]);
  }, []);

  const value = useMemo(() => ({ theme, handleToggleTheme }), [theme, handleToggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
