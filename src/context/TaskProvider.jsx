import { isSameDay, parseISO } from 'date-fns'
import { useMemo, useReducer } from 'react'
import {
  countOpenTasks,
  groupTasksByWeek,
  searchTasks,
  sortTasksByDate,
} from '../services/taskService'
import { TaskContext } from './TaskContext'

const initialTasks = [
  { id: 1, title: 'Review project brief', date: '2026-11-09T09:00', completed: true },
  { id: 2, title: 'Prepare presentation slides', date: '2026-11-10T10:00', completed: true },
  { id: 3, title: 'Book dentist appointment', date: '2026-11-12T14:30', completed: true },
  { id: 4, title: 'Send weekly progress update', date: '2026-11-13T16:00', completed: true },
  { id: 5, title: 'Plan next week', date: '2026-11-16T09:30', completed: false },
  { id: 6, title: 'Go grocery shopping', date: '2026-11-17T11:00', completed: true },
  { id: 7, title: 'Review sprint backlog', date: '2026-11-18T10:00', completed: false },
  { id: 8, title: 'Update team documentation', date: '2026-11-20T15:00', completed: true },
  { id: 9, title: 'Set monthly goals', date: '2026-11-23T09:00', completed: false },
  { id: 10, title: 'Organize workspace', date: '2026-11-24T11:30', completed: false },
  { id: 11, title: 'Call the bank', date: '2026-11-26T13:00', completed: true },
  { id: 12, title: 'Read product roadmap', date: '2026-11-29T17:00', completed: false },
  { id: 13, title: 'Prepare monthly report', date: '2026-11-30T10:30', completed: false },
  { id: 14, title: 'Plan team retrospective', date: '2026-12-02T14:00', completed: true },
  { id: 15, title: 'Clean up inbox', date: '2026-12-04T16:30', completed: false },
  { id: 16, title: 'Schedule next month review', date: '2026-12-06T09:30', completed: false },
]

function taskReducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, {
        ...action.task,
        id: Math.max(0, ...tasks.map(({ id }) => id)) + 1,
        completed: false,
      }]
    case 'update':
      return tasks.map((task) =>
        task.id === action.taskId ? { ...task, ...action.changes } : task,
      )
    case 'toggle':
      return tasks.map((task) =>
        task.id === action.taskId ? { ...task, completed: !task.completed } : task,
      )
    case 'delete':
      return tasks.filter((task) => task.id !== action.taskId)
    default:
      return tasks
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
  const todayKey = new Date().toDateString()
  const todayTasks = useMemo(
    () => tasks.filter((task) => isSameDay(parseISO(task.date), new Date(todayKey))),
    [tasks, todayKey],
  )
  const stats = useMemo(() => {
    const open = countOpenTasks(tasks)
    return {
      total: tasks.length,
      open,
      completed: tasks.length - open,
      todayTotal: todayTasks.length,
      todayOpen: countOpenTasks(todayTasks),
    }
  }, [tasks, todayTasks])
  const value = useMemo(() => ({
    tasks,
    todayTasks,
    stats,
    weeks: groupTasksByWeek(tasks),
    searchTasks: (term) => searchTasks(sortTasksByDate(tasks), term),
    addTask: (task) => dispatch({ type: 'add', task }),
    updateTask: (taskId, changes) => dispatch({ type: 'update', taskId, changes }),
    toggleTask: (taskId) => dispatch({ type: 'toggle', taskId }),
    deleteTask: (taskId) => dispatch({ type: 'delete', taskId }),
  }), [tasks, todayTasks, stats])

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
