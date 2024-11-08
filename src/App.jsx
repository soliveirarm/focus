import Header from "./components/Header"
import AddNewTask from "./components/AddNewTask"
import Tasks from "./components/Tasks"
import { useEffect, useRef, useState } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"
import EditTask from "./components/EditTask"

function App() {
  const [tasks, setTasks] = useLocalStorage("focus_tasks", [])
  const [inputText, setInputText] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [editTextInput, setEditTextInput] = useState("")
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)

  const editingTaskIndex = useRef()

  const addNewTask = (e) => {
    e.preventDefault()
    if (!inputText) return
    setTasks([...tasks, { task: inputText, done: false }])
    setInputText("")
  }

  const removeTask = (i) => {
    setTasks(tasks.filter((_task, index) => index !== i))
  }

  const openModal = (i) => {
    const task = tasks[i].task
    editingTaskIndex.current = i
    setEditTextInput(task)
    setShowEditTaskModal(true)
  }

  const updateTextInput = (e) => setEditTextInput(e.target.value)

  const editText = (e) => {
    if (e.key === "Enter") {
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks]
        const task = prevTasks[editingTaskIndex.current]
        task.task = editTextInput
        return newTasks
      })
      setShowEditTaskModal(false)
    }
  }

  useEffect(() => {
    if (localStorage.focus_dark_mode) {
      document.body.classList.add("dark")
      setDarkMode(true)
    }
  }, [])

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-screen-md mx-auto p-8">
        <AddNewTask
          addNewTask={addNewTask}
          inputText={inputText}
          setInputText={setInputText}
        />
        <Tasks
          tasks={tasks}
          removeTask={removeTask}
          setTasks={setTasks}
          openModal={openModal}
        />
        <EditTask
          editTextInput={editTextInput}
          updateTextInput={updateTextInput}
          showModal={showEditTaskModal}
          setShowModal={setShowEditTaskModal}
          editText={editText}
        />
      </main>
    </>
  )
}

export default App
