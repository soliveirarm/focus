export function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="flex justify-between items-center select-none  p-8">
      <section>
        <h1 className="text-2xl font-medium">
          Focus<span className="text-accent dark:text-accent_dark">!</span>
        </h1>
        <p className="text-lg tracking-wide font-light">
          <span className="text-accent dark:text-accent_dark">Minimal</span>{" "}
          task manager
        </p>
      </section>
      {children}
    </header>
  )
}
