import { useState } from 'react'
import { parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import HomeHeader from '../components/HomeHeader'
import TodaySummary from '../components/TodaySummary'
import WeekCard from '../components/WeekCard'
import FloatingAddButton from '../components/FloatingAddButton'
import TaskFormSheet from '../components/TaskFormSheet'
import { getWeekKey } from '../services/taskService'
import { useTasks } from '../context/useTasks'

const referenceDate = parseISO('2026-11-10')

export default function Home() {
  const { weeks, stats, toggleTask, updateTask, addTask, deleteTask } = useTasks()
  const [expandedWeek, setExpandedWeek] = useState(getWeekKey(referenceDate))
  const [formTask, setFormTask] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
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
      <div className="mx-auto w-full max-w-[520px] px-5 pb-28 pt-8 sm:pt-12">
        <HomeHeader />
        <TodaySummary date={referenceDate} openTaskCount={stats.todayOpen} />

        <div className="my-7 flex items-center justify-between px-0.5">
          <h2 className="text-[17px] font-semibold tracking-[-0.02em]">Weekly overview</h2>
          <span className="text-[11px] font-medium text-muted">{weeks.length} weeks</span>
        </div>

        <section className="grid gap-3" aria-label="Tasks grouped by week">
          {weeks.map(([weekKey, weekTasks]) => (
            <WeekCard
              key={weekKey}
              weekKey={weekKey}
              tasks={weekTasks}
              expanded={expandedWeek === weekKey}
              onToggle={() => setExpandedWeek(expandedWeek === weekKey ? null : weekKey)}
              onTaskToggle={toggleTask}
              onTaskEdit={editTask}
              onTaskDelete={removeTask}
            />
          ))}
        </section>

        <Link
          className="mt-5 flex w-full items-center justify-center rounded-lg border border-brand-blue py-3 text-sm font-semibold text-brand-blue transition hover:bg-blue-pale"
          to="/tasks"
        >
          View all tasks
        </Link>
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
