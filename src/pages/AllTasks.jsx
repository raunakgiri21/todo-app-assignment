import { ArrowLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TaskRow from '../components/TaskRow'
import TaskFormSheet from '../components/TaskFormSheet'
import FloatingAddButton from '../components/FloatingAddButton'
import { useTasks } from '../context/useTasks'

export default function AllTasks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [formTask, setFormTask] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { searchTasks: findTasks, toggleTask, updateTask, addTask, deleteTask } = useTasks()
  const visibleTasks = useMemo(() => findTasks(searchTerm), [findTasks, searchTerm])

  const editTask = (task) => {
    setFormTask(task)
    setIsFormOpen(true)
  }

  const removeTask = (taskId) => {
    if (window.confirm('Delete this task?')) {
      deleteTask(taskId)
    }
  }

  const saveTask = (task) => {
    formTask ? updateTask(formTask.id, task) : addTask(task)
    setIsFormOpen(false)
    setFormTask(null)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-ink">
      <div className="mx-auto w-full max-w-[520px] px-5 pb-12 pt-8 sm:pt-12">
        <header className="flex items-center gap-3">
          <Link
            className="grid size-9 place-items-center rounded-full text-brand-blue transition hover:bg-blue-pale"
            to="/home"
            aria-label="Back to home"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-brand-blue">TASKS</p>
            <h1 className="mt-1 text-2xl font-bold tracking-[-0.03em]">All tasks</h1>
          </div>
        </header>

        <label className="mt-7 mb-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card">
          <Search className="shrink-0 text-muted" size={18} />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search tasks"
            aria-label="Search tasks"
          />
        </label>

        <p className="mb-2 text-xs font-medium text-muted">
          {visibleTasks.length} {visibleTasks.length === 1 ? 'task' : 'tasks'}
        </p>
        <section className="rounded-xl border border-slate-200 bg-white px-4 shadow-card" aria-label="All tasks">
          {visibleTasks.length > 0 ? (
            visibleTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onEdit={editTask}
                onDelete={removeTask}
              />
            ))
          ) : (
            <p className="py-10 text-center text-sm text-muted">No tasks match your search.</p>
          )}
        </section>
      </div>
      <FloatingAddButton onClick={() => { setFormTask(null); setIsFormOpen(true) }} />
      {isFormOpen && (
        <TaskFormSheet
          task={formTask}
          onClose={() => { setIsFormOpen(false); setFormTask(null) }}
          onSubmit={saveTask}
        />
      )}
    </main>
  )
}
