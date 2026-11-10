import { Check, Circle, SquarePen, Trash2 } from 'lucide-react'
import { formatTaskDate } from '../services/taskService'

export default function TaskRow({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="flex min-h-14 items-center gap-3 border-b border-slate-100 py-3 last:border-b-0">
      <button
        className="shrink-0"
        type="button"
        aria-label={task.completed ? `Mark ${task.title} incomplete` : `Complete ${task.title}`}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? (
          <span className="grid size-5 place-items-center rounded-full bg-brand-blue text-white">
            <Check size={12} strokeWidth={3} />
          </span>
        ) : (
          <Circle className="text-slate-300" size={20} />
        )}
      </button>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <strong
          className={`truncate text-[13px] font-semibold ${
            task.completed ? 'text-muted line-through' : ''
          }`}
        >
          {task.title}
        </strong>
        <small className="text-[11px] text-muted">{formatTaskDate(task.date)}</small>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <button
          className="grid size-8 place-items-center rounded-md text-slate-400 transition hover:bg-blue-pale hover:text-brand-blue"
          type="button"
          aria-label={`Edit ${task.title}`}
          onClick={() => onEdit(task)}
        >
          <SquarePen size={15} />
        </button>
        <button
          className="grid size-8 place-items-center rounded-md text-slate-400 transition hover:bg-red-pale hover:text-red"
          type="button"
          aria-label={`Delete ${task.title}`}
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={15} />
        </button>
      </span>
    </div>
  )
}
