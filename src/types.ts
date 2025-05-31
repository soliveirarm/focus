type DarkModeType = {
  darkMode: boolean
  toggleDarkMode: (newValue: unknown) => void
}

type TasksType = {
  task: string
  done: boolean
}

export type { DarkModeType, TasksType }
