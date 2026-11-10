import { ArrowDown, CalendarDays } from 'lucide-react'
import { formatWeek, getWeekStart, countOpenTasks } from '../services/taskService'
import TaskRow from './TaskRow'

export default function WeekCard({
  weekKey,
  tasks,
  expanded,
  onToggle,
  onTaskToggle,
  onTaskEdit,
  onTaskDelete,
}) {
  const monday = getWeekStart(new Date(`${weekKey}T12:00:00`))
  const openTasks = countOpenTasks(tasks)

  return (
    <article
      className={`overflow-hidden rounded-xl border bg-white p-4 shadow-card ${
        expanded ? 'border-indigo-200' : 'border-slate-200'
      }`}
    >
      <button
        className="flex w-full items-center justify-between pb-3 pt-4 text-left"
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <span className="flex items-center gap-3">
          <span className="grid size-[35px] place-content-center rounded-[9px] bg-blue-pale text-brand-blue">
            <CalendarDays size={17} strokeWidth={2} />
          </span>
          <span className="flex flex-col">
            <strong className="text-sm">{formatWeek(monday)}</strong>
            <small className="text-[11px] text-muted">{tasks.length} total tasks</small>
          </span>
        </span>
        <ArrowDown
          className={`text-brand-blue transition-transform ${expanded ? 'rotate-180' : ''}`}
          size={19}
        />
      </button>

      <div className="mt-2.5 flex gap-px pl-12">
        <div className="flex flex-1 flex-col gap-1">
          <strong className="text-xl leading-none">{openTasks}</strong>
          <span className="text-[11px] text-muted">Open tasks</span>
        </div>
        <div className="flex flex-1 flex-col gap-1 border-l border-line pl-4">
          <strong className="text-xl leading-none">{tasks.length - openTasks}</strong>
          <span className="text-[11px] text-muted">Completed</span>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 py-4">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={onTaskToggle}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      )}
    </article>
  )
}
