type TaskType = {
  id: string
  task: string
  done: boolean
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export type { TaskType, ChangeEvent }
