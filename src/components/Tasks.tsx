import { Task } from "./Task"
import { ChangeEvent, TaskType } from "../types"
import { Trash2 } from "lucide-react"

type TasksProps = {
  tasks: TaskType[]
  removeTask: (id: string) => void
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
  editTask: (e: ChangeEvent, id: string) => void
}

const checkSound = new Audio("./check-sound.mp3")

const NoTasks = () => (
  <p className="text-center p-8 text-zinc-400">No tasks were added yet</p>
)

export function Tasks({ tasks, setTasks, removeTask, editTask }: TasksProps) {
  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks: TaskType[]) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
    const task = tasks.find((task) => task.id === id)
    if (!task?.done) checkSound.play()
  }

  if (!tasks.length) return <NoTasks />

  const incompleteTasks = tasks.filter((task) => !task.done)
  const completedTasks = tasks.filter((task) => task.done)

  const renderTaskList = (taskList: TaskType[], isDone: boolean) =>
    taskList.map(({ task, id }) => {
      return (
        <li
          className={`task group flex items-center text-lg gap-2 py-2.5 ${
            isDone && "done"
          }`}
          key={id}
        >
          <Task
            id={id}
            task={task}
            done={isDone}
            toggleTaskCompletion={() => toggleTaskCompletion(id)}
            editTask={(e: ChangeEvent) => editTask(e, id)}
          />
          <button
            onClick={() => removeTask(id)}
            className="hidden task__remove"
          >
            <Trash2
              className="text-accent dark:text-accent-dark hover:text-red-500 dark:hover:text-red-400"
              size={20}
            />
          </button>
        </li>
      )
    })

  return (
    <div>
      {incompleteTasks.length > 0 && (
        <ul>{renderTaskList(incompleteTasks, false)}</ul>
      )}
      {completedTasks.length > 0 && (
        <ul>{renderTaskList(completedTasks, true)}</ul>
      )}
    </div>
  )
}
