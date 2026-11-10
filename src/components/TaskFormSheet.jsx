import { X } from 'lucide-react'
import DatePicker from 'react-datepicker'
import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import SpanButton from './SpanButton'

const emptyForm = {
  title: '',
  date: '',
  time: '',
}

const getInitialForm = (task) => {
  if (!task) return emptyForm

  const [date, time = ''] = task.date.split('T')
  return { title: task.title, date, time }
}

export default function TaskFormSheet({ task, onClose, onSubmit }) {
  const [form, setForm] = useState(() => getInitialForm(task))
  const [error, setError] = useState('')

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const selectedDate = form.date
    ? parseISO(`${form.date}T${form.time || '00:00'}`)
    : null

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }
    if (!form.date || !form.time) {
      setError('Date and time are required.')
      return
    }
    onSubmit({
      ...form,
      title: form.title.trim(),
      date: `${form.date}T${form.time}`,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40">
      <button className="absolute inset-0 cursor-default" type="button" aria-label="Close form" onClick={onClose} />
      <section
        className="relative w-full max-w-[520px] rounded-t-2xl bg-white px-5 pb-8 pt-5 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="task-form-title" className="text-xl font-bold">
            {task ? 'Edit task' : 'New task'}
          </h2>
          <button
            className="grid size-9 place-items-center rounded-full text-muted hover:bg-slate-100"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">
            <span className="mb-1.5 inline-flex items-center gap-1">
              Title <span className="text-red">*</span>
            </span>
            <input
              className="block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-blue"
              value={form.title}
              onChange={updateField('title')}
              placeholder="What needs to be done?"
              autoFocus
            />
          </label>
          <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">
              Date &amp; time <span className="text-red">*</span>
            </legend>
            <DatePicker
              className="block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-blue"
              selected={selectedDate}
              onChange={(value) => {
                if (!value) return
                setForm((current) => ({
                  ...current,
                  date: format(value, 'yyyy-MM-dd'),
                  time: format(value, 'HH:mm'),
                }))
              }}
              showTimeSelect
              timeIntervals={15}
              dateFormat="MMM d, yyyy h:mm aa"
              placeholderText="Choose date and time"
              withPortal
              portalId="task-date-picker"
            />
          </fieldset>
          {error && <p className="text-sm text-red">{error}</p>}
          <SpanButton className="mt-1" type="submit">
            {task ? 'Update' : 'Add'}
          </SpanButton>
        </form>
      </section>
    </div>
  )
}
