import { RxCross2 } from "react-icons/rx"
import Task from "./Task"

function Tasks({ tasks, removeTask, setTasks }) {
  const toggleCompleted = (i) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks]
      newTasks[i].done = !newTasks[i].done
      return newTasks
    })
  }

  if (!tasks.length) {
    return (
      <p className="text-center p-8 text-zinc-400">No tasks were added yet</p>
    )
  }

  return (
    <section>
      <ul className="py-4">
        {tasks.map(({ task, done }, i) => (
          <li
            className="task group flex items-center text-lg gap-2 p-3"
            key={crypto.randomUUID()}
          >
            <Task
              task={task}
              done={done}
              toggleCompleted={() => toggleCompleted(i)}
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
