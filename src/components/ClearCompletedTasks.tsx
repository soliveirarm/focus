import { BrushCleaning } from "lucide-react"

type ClearCompletedTasksProps = {
  onClick: () => void
}
export const ClearCompletedTasks = ({ onClick }: ClearCompletedTasksProps) => (
  <button
    className="py-2 px-4 self-end flex gap-1 items-center transition-all hover:bg-red-500/3 dark:hover:bg-red-400/5 rounded-full hover:scale-105 hover:text-red-500 dark:hover:text-red-400"
    onClick={onClick}
  >
    <BrushCleaning />
    Clear Completed Tasks
  </button>
)
