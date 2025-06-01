import { TasksType } from "../types"

type TaskProps = TasksType & {
  toggleTaskCompletion: () => void
  editTask: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Task({
  task,
  done,
  toggleTaskCompletion,
  editTask,
}: TaskProps) {
  return (
    <>
      <input
        className="relative flex items-center justify-center size-5 bg-inherit appearance-none border border-accent dark:border-accent_dark rounded-full transition-all cursor-pointer hover:scale-110 checked:bg-accent dark:checked:bg-accent_dark checked:content-check dark:checked:content-check_dark"
        type="checkbox"
        defaultChecked={done}
        onClick={toggleTaskCompletion}
      />
      <input
        className={`flex-1 outline-none ${
          done && "line-through text-zinc-500"
        }`}
        value={task}
        onChange={editTask}
      />
    </>
  )
}
