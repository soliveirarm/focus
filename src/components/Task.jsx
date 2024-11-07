function Task({ task, done, toggleCompleted }) {
  return (
    <>
      <input
        className="relative flex items-center justify-center size-5 bg-inherit appearance-none border border-accent rounded transition-all cursor-pointer hover:scale-110 checked:bg-accent checked:content-check"
        type="checkbox"
        defaultChecked={done}
        onClick={toggleCompleted}
      />
      <span
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
