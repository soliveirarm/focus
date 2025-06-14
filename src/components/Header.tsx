export function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="flex justify-between items-center select-none p-7 max-w-screen-md mx-auto">
      <section>
        <h1 className="text-2xl font-medium">
          Focus<span className="text-accent dark:text-accent-dark">!</span>
        </h1>
      </section>
      {children}
    </header>
  )
}
