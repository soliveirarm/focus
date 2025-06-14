import { Moon, SunMedium } from "lucide-react"

type DarkModeToggleProps = {
  darkMode: boolean
  toggleDarkMode: (newValue: unknown) => void
}

export function DarkModeToggle({
  darkMode,
  toggleDarkMode,
}: DarkModeToggleProps) {
  return (
    <button onClick={toggleDarkMode}>
      {darkMode && <Moon size={20} />}
      {!darkMode && <SunMedium size={20} />}
    </button>
  )
}
