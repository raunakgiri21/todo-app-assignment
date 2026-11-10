import { format } from 'date-fns'

export default function TodaySummary({ date, openTaskCount }) {
  return (
    <section
      className="mt-7 flex items-center justify-between rounded-[14px] bg-brand-blue p-5 text-white shadow-[0_12px_24px_rgb(69_99_233_/_18%)]"
      aria-label="Today's task summary"
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-200">Today</p>
        <p className="mt-1.5 text-sm font-medium">{format(date, 'EEEE, MMMM d')}</p>
      </div>
      <div className="flex flex-col items-end">
        <strong className="text-[30px] leading-none">{openTaskCount}</strong>
        <span className="mt-1 text-[11px] text-indigo-100">open tasks</span>
      </div>
    </section>
  )
}
