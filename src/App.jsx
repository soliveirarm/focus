import Header from "./components/Header"
import AddNewTask from "./components/AddNewTask"
import Tasks from "./components/Tasks"
import { useEffect, useState } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"

function App() {
  const [tasks, setTasks] = useLocalStorage("focus_tasks", [])
  const [inputText, setInputText] = useState("")

  const addNewTask = (e) => {
    e.preventDefault()
    if (!inputText) return
    setTasks([...tasks, { task: inputText, done: false }])
    setInputText("")
  }

  const removeTask = (i) => {
    setTasks(tasks.filter((_task, index) => index !== i))
  }

  useEffect(() => {
    localStorage.focus_dark_mode && document.body.classList.add("dark")
  }, [])

  return (
    <>
      <Header />

      <main className="max-w-screen-md mx-auto p-8">
        <AddNewTask
          addNewTask={addNewTask}
          inputText={inputText}
          setInputText={setInputText}
        />
        <Tasks tasks={tasks} removeTask={removeTask} setTasks={setTasks} />
      </main>
    </>
  )
}

export default App
