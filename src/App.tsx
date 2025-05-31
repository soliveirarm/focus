import { useRef, useState } from "react"

import { Header } from "./components/Header"
import { AddNewTask } from "./components/AddNewTask"
import { Tasks } from "./components/Tasks"
import { EditTask } from "./components/EditTask"
import { DarkModeToggle } from "./components/DarkModeToggle"

import { useLocalStorage } from "usehooks-ts"

import { TasksType } from "./types"

export function App() {
  const [tasks, setTasks] = useLocalStorage<TasksType[]>("focus_tasks", [])
  const [inputText, setInputText] = useState<string>("")
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    "focus_dark_mode",
    false
  )
  const [editTextInput, setEditTextInput] = useState<string>("")
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false)

  const editingTaskIndex = useRef<number>(0)

  // <AddNewTask />
  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputText) return
    setTasks([...tasks, { task: inputText, done: false }])
    setInputText("")
  }

  // <Tasks />
  const removeTask = (i: number) => {
    setTasks(tasks.filter((_task, index) => index !== i))
  }
  const openEditTaskModal = (i: number) => {
    const task = tasks[i].task
    editingTaskIndex.current = i
    setEditTextInput(task)
    setShowEditTaskModal(true)
  }

  // <EditTask />
  const updateTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTextInput(e.target.value)
  }
  const editTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  return (
    <div
      className={`h-screen bg-cream text-cream_dark dark:bg-cream_dark dark:text-cream transition-all ${
        darkMode ? "dark" : ""
      }`}
    >
      <Header>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Header>

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
          openModal={openEditTaskModal}
        />
        <EditTask
          inputValue={editTextInput}
          updateInputValue={updateTextInput}
          showModal={showEditTaskModal}
          setShowModal={setShowEditTaskModal}
          editTask={editTask}
        />
      </main>
    </div>
  )
}
