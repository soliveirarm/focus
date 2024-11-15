import { RxCross2 } from "react-icons/rx"

type EditTaskProps = {
  inputValue: string
  showModal: boolean
  updateInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void
  setShowModal: (newValue: boolean) => void
  editTask: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export function EditTask({
  inputValue,
  updateInputValue,
  showModal,
  setShowModal,
  editTask,
}: EditTaskProps) {
  const closeModal = () => setShowModal(false)

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-white dark:bg-zinc-800 shadow-lg border border-zinc-200 dark:border-zinc-700 ${
        showModal ? "flex items-center gap-4" : "hidden"
      }`}
    >
      <input
        className="p-2 border border-zinc-200 dark:border-zinc-500 rounded bg-inherit outline-none focus:bg-zinc-100/60 focus:dark:bg-zinc-500/20"
        type="text"
        value={inputValue}
        onChange={updateInputValue}
        onKeyUp={editTask}
      />
      <button
        className="transition-all hover:scale-110 hover:text-red-500 dark:hover:text-red-400"
        onClick={closeModal}
      >
        <RxCross2 size={20} />
      </button>
    </div>
  )
}
