type DarkModeType = {
  darkMode: boolean
  setDarkMode: (newValue: boolean) => void
}

type TasksType = {
  task: string
  done: boolean
}

export type { DarkModeType, TasksType }
