import { RxCross2 } from "react-icons/rx"
import Task from "./Task"
import { TasksType } from "../types"

type TasksProps = {
  tasks: TasksType[]
  removeTask: (i: number) => void
  setTasks: React.Dispatch<React.SetStateAction<TasksType[]>>
  openModal: (i: number) => void
}

const NoTasks = () => (
  <p className="text-center p-8 text-zinc-400">No tasks were added yet</p>
)

function Tasks({ tasks, removeTask, setTasks, openModal }: TasksProps) {
  const toggleTaskCompletion = (i: number) => {
    setTasks((prevTasks: TasksType[]) => {
      const newTasks = [...prevTasks]
      newTasks[i].done = !newTasks[i].done
      return newTasks
    })
  }

  if (!tasks.length) return <NoTasks />

  return (
    <section>
      <ul className="sm:py-4">
        {tasks.map(({ task, done }, i) => (
          <li
            className="task group flex items-center text-lg gap-2 p-3"
            key={i}
          >
            <Task
              task={task}
              done={done}
              toggleTaskCompletion={() => toggleTaskCompletion(i)}
              openModal={() => openModal(i)}
            />
            <button onClick={() => removeTask(i)} className="remove-task">
              <RxCross2
                className="text-accent hover:text-red-500 dark:hover:text-red-400"
                size={20}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tasks
