import { UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HomeHeader() {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold tracking-[0.14em] text-brand-blue">MY TASKS</p>
        <h1 className="mt-1.5 text-[28px] font-bold leading-tight tracking-[-0.04em]">
          Stay organized.
        </h1>
      </div>
      <button
        className="grid size-[42px] place-items-center rounded-full border border-slate-200 bg-white text-brand-blue shadow-card"
        type="button"
        aria-label="Open profile"
        onClick={() => navigate('/')}

      >
        <UserRound size={19} strokeWidth={2} />
      </button>
    </header>
  )
}
