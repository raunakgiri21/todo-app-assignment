import { Plus } from 'lucide-react'

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      className="fixed bottom-6 right-5 grid size-[54px] place-items-center rounded-full bg-white text-brand-blue shadow-button sm:right-[max(20px,calc((100vw-520px)/2+20px))]"
      type="button"
      aria-label="Add task"
      onClick={onClick}
    >
      <Plus size={27} strokeWidth={1.75}/>
    </button>
  )
}
