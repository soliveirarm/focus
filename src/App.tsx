import { useState } from "react"

import { Header } from "./components/Header"
import { AddNewTask } from "./components/AddNewTask"
import { Tasks } from "./components/Tasks"
import { DarkModeToggle } from "./components/DarkModeToggle"

import { useLocalStorage } from "usehooks-ts"

import { TasksType } from "./types"

export function App() {
  const [tasks, setTasks] = useLocalStorage<TasksType[]>("focus_tasks", []) // Task array
  const [inputText, setInputText] = useState<string>("") // Add new task input
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    "focus_dark_mode",
    false
  )

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

  // <Task />
  const editTask = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks]
      newTasks[i].task = e.target.value
      return newTasks
    })
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
          editTask={editTask}
        />
      </main>
    </div>
  )
}
