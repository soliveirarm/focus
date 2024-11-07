function AddNewTask({ addNewTask, inputText, setInputText }) {
  return (
    <form
      className="flex justify-center items-center mb-4"
      onSubmit={addNewTask}
    >
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="fixed bottom-4 w-[90%] sm:w-full sm:static bg-inherit border-b-2 border-accent rounded-lg outline-none p-3 text-center text-lg shadow-md placeholder-zinc-400"
        type="text"
        placeholder="Enter the task name"
        autoFocus
      />
    </form>
  )
}

export default AddNewTask
