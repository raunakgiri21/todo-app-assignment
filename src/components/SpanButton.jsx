import { Link } from 'react-router-dom'

export default function SpanButton({ children, to, className = '', ...props }) {
  const classes = [
    'flex h-12 w-full items-center justify-center rounded-button bg-brand-blue px-6 text-sm font-semibold text-white shadow-button transition hover:bg-brand-blue-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button {...props} className={classes} type={props.type || 'button'}>
      <span>{children}</span>
    </button>
  )
}
