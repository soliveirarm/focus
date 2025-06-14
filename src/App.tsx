import { useState } from "react"

import { Header } from "./components/Header"
import { AddNewTask } from "./components/AddNewTask"
import { Tasks } from "./components/Tasks"
import { DarkModeToggle } from "./components/DarkModeToggle"

import { useLocalStorage } from "usehooks-ts"

import { ChangeEvent, TaskType } from "./types"

export function App() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("focus_tasks", []) // Tasks array
  const [inputText, setInputText] = useState<string>("") // Add new task input
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    "focus_darkMode",
    false
  )

  // <AddNewTask />
  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputText) return

    setTasks([
      ...tasks,
      { task: inputText, done: false, id: crypto.randomUUID() },
    ])
    setInputText("")
  }

  // <Tasks />
  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // <Task />
  const editTask = (e: ChangeEvent, id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, task: e.currentTarget.value } : task
      )
    )
  }

  const toggleDarkMode = () => setDarkMode((prevState) => !prevState)

  return (
    <div
      className={`min-h-screen bg-cream text-cream-dark dark:bg-zinc-900 dark:text-cream transition-all pb-32 sm:pb-0 ${
        darkMode ? "dark" : ""
      }`}
    >
      <Header>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Header>

      <main className="flex flex-col gap-2 max-w-screen-md mx-auto p-7">
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
