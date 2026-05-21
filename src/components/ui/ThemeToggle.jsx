import { Palette, Circle } from 'lucide-react'
import { useTheme, THEMES } from '../../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const isMonochrome = theme === THEMES.monochrome

  return (
    <div
      className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5"
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => setTheme(THEMES.color)}
        className={`cursor-pointer flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 ${
          !isMonochrome
            ? 'bg-primary/20 text-primary'
            : 'text-white/60 hover:text-white'
        }`}
        aria-pressed={!isMonochrome}
        aria-label="Color theme"
        title="Color theme"
      >
        <Palette className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Color</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme(THEMES.monochrome)}
        className={`cursor-pointer flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 ${
          isMonochrome
            ? 'bg-white/15 text-white'
            : 'text-white/60 hover:text-white'
        }`}
        aria-pressed={isMonochrome}
        aria-label="Black and white theme"
        title="Black and white theme"
      >
        <Circle className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">B&amp;W</span>
      </button>
    </div>
  )
}

export default ThemeToggle
