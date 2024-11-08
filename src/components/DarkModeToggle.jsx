import { LuMoon, LuSunMedium } from "react-icons/lu"

function DarkModeToggle({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    const body = document.body

    body.classList.toggle("dark")

    if (body.classList.contains("dark")) {
      setDarkMode(true)
      localStorage.setItem("focus_dark_mode", "enabled")
    } else {
      setDarkMode(false)
      localStorage.removeItem("focus_dark_mode")
    }
  }

  return (
    <div className="cursor-pointer" onClick={toggleDarkMode}>
      {darkMode && <LuMoon size={20} />}
      {!darkMode && <LuSunMedium size={20} />}
    </div>
  )
}

export default DarkModeToggle
