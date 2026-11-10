import { endOfWeek, format, parseISO, startOfWeek } from 'date-fns'

export const getWeekStart = (date) => startOfWeek(date, { weekStartsOn: 1 })

export const getWeekKey = (date) => format(getWeekStart(date), 'yyyy-MM-dd')

export const formatWeek = (monday) => {
  const sunday = endOfWeek(monday, { weekStartsOn: 1 })
  return `${format(monday, 'MMM d')} - ${format(sunday, 'MMM d')}`
}

export const formatTaskDate = (date) => format(parseISO(date), 'MMM d, h:mm a')

export const groupTasksByWeek = (tasks, currentDate = new Date()) => {
  const grouped = tasks.reduce((result, task) => {
    const key = getWeekKey(parseISO(task.date))
    if (!result[key]) result[key] = []
    result[key].push(task)
    return result
  }, {})

  return Object.entries(grouped).sort(([first], [second]) => {
    const currentWeekStart = getWeekStart(currentDate).getTime()
    const firstDistance = Math.abs(new Date(`${first}T00:00:00`).getTime() - currentWeekStart)
    const secondDistance = Math.abs(new Date(`${second}T00:00:00`).getTime() - currentWeekStart)

    if (firstDistance !== secondDistance) return firstDistance - secondDistance
    return second.localeCompare(first)
  })
}

export const countOpenTasks = (tasks) => tasks.filter((task) => !task.completed).length

export const sortTasksByDate = (tasks) =>
  [...tasks].sort((first, second) => first.date.localeCompare(second.date))

export const searchTasks = (tasks, searchTerm) => {
  const query = searchTerm.trim().toLowerCase()
  if (!query) return tasks

  return tasks.filter((task) =>
    `${task.title} ${task.date}`.toLowerCase().includes(query),
  )
}
