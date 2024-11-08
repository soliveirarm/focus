import { RxCross2 } from "react-icons/rx"

function EditTask({
  editTextInput,
  updateTextInput,
  showModal,
  setShowModal,
  editText,
}) {
  const closePopUp = () => setShowModal(false)

  return (
    <div
      id="edit-task"
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-white dark:bg-zinc-800 w-72 shadow-lg ${
        showModal ? "flex flex-col gap-4" : "hidden"
      }`}
    >
      <button className="self-end" onClick={closePopUp}>
        <RxCross2 size={20} />
      </button>
      <input
        className="p-2 border-2 border-zinc-200 dark:border-zinc-500 rounded bg-inherit"
        type="text"
        value={editTextInput}
        onChange={updateTextInput}
        onKeyUp={editText}
      />
    </div>
  )
}

export default EditTask
