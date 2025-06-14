import { ChangeEvent, TaskType } from "../types"
import { useSwipeable } from "react-swipeable"

type TaskProps = TaskType & {
  toggleTaskCompletion: () => void
  editTask: (e: ChangeEvent) => void
}

export function Task({
  task,
  done,
  toggleTaskCompletion,
  editTask,
}: TaskProps) {
  const swipeActions = useSwipeable({
    onSwipedLeft: toggleTaskCompletion,
    onSwipedRight: toggleTaskCompletion,
  })

  return (
    <>
      <input
        className="task__checkbox relative flex flex-none items-center justify-center size-5 bg-inherit appearance-none border border-accent dark:border-accent-dark rounded-full transition-all cursor-pointer hover:scale-115 checked:bg-accent dark:checked:bg-accent-dark checked:content-[url('check.svg')] dark:checked:content-[url('check-dark.svg')]"
        type="checkbox"
        defaultChecked={done}
        onClick={toggleTaskCompletion}
      />
      <input
        className={`task__text focus:font-bold focus:text-accent dark:focus:text-accent-dark outline-none flex-1 transition-all ${
          done ? "text-zinc-500 line-through decoration-2" : ""
        }`}
        value={task}
        onChange={editTask}
        {...swipeActions}
      />
    </>
  )
}
