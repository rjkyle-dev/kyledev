import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

export const THEMES = {
  color: 'color',
  monochrome: 'monochrome',
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return THEMES.color
    return localStorage.getItem(STORAGE_KEY) === THEMES.monochrome
      ? THEMES.monochrome
      : THEMES.color
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = (next) => {
    setThemeState(next === THEMES.monochrome ? THEMES.monochrome : THEMES.color)
  }

  const toggleTheme = () => {
    setTheme(theme === THEMES.color ? THEMES.monochrome : THEMES.color)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isMonochrome: theme === THEMES.monochrome }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
