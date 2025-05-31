import { LuMoon, LuSunMedium } from "react-icons/lu"
import { DarkModeType } from "../types"

export function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeType) {
  return (
    <div className="cursor-pointer" onClick={toggleDarkMode}>
      {darkMode && <LuMoon size={20} />}
      {!darkMode && <LuSunMedium size={20} />}
    </div>
  )
}
