import DarkModeToggle from "./DarkModeToggle"

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="flex justify-between items-center select-none p-8">
      <section>
        <h1 className="text-2xl font-medium">
          Focus<span className="text-accent">!</span>
        </h1>
        <p className="text-lg tracking-wide font-light">
          <span className="text-accent">Minimal</span> task manager
        </p>
      </section>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </header>
  )
}

export default Header
