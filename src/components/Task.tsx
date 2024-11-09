import { TasksType } from "../types"

type TaskProps = TasksType & {
  toggleTaskCompletion: () => void
  openModal: () => void
}

function Task({ task, done, toggleTaskCompletion, openModal }: TaskProps) {
  return (
    <>
      <input
        className="relative flex items-center justify-center size-5 bg-inherit appearance-none border border-accent rounded transition-all cursor-pointer hover:scale-110 checked:bg-accent checked:content-check"
        type="checkbox"
        defaultChecked={done}
        onClick={toggleTaskCompletion}
      />
      <span
        onClick={openModal}
        className={`flex-1 outline-none ${
          done && "line-through text-zinc-500"
        }`}
      >
        {task}
      </span>
    </>
  )
}

export default Task
