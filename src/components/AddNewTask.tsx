type AddNewTasksProps = {
  addNewTask: (e: React.FormEvent<HTMLFormElement>) => void
  inputText: string
  setInputText: (e: string) => void
}

export function AddNewTask({
  addNewTask,
  inputText,
  setInputText,
}: AddNewTasksProps) {
  return (
    <form
      className="flex justify-center items-center sm:mb-4"
      onSubmit={addNewTask}
    >
      <input
        value={inputText}
        onChange={(e) => setInputText(e.currentTarget.value)}
        className="fixed sm:static bottom-4 w-[90%] sm:w-full bg-inherit border-b-2 border-accent dark:border-accent_dark rounded-lg outline-none p-3 text-center text-lg shadow-md placeholder-zinc-400"
        type="text"
        placeholder="Enter the task name"
        autoFocus
      />
    </form>
  )
}
