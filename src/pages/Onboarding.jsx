import SpanButton from '../components/SpanButton'

export default function Onboarding() {
  return (
    <main className="min-h-screen bg-brand-blue text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col overflow-hidden bg-brand-blue">
        <section className="flex flex-1 items-center justify-center">
          <div className="relative text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-white/15 shadow-soft">
              <span className="text-5xl font-bold leading-none" aria-hidden="true">
                ✓
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-t-card bg-white px-6 pb-6 pt-8 text-ink">
          <h1 className="font-display text-[28px] font-bold leading-tight">
            Manage What To Do
          </h1>
          <p className="mt-3 max-w-[290px] text-sm leading-6 text-muted">
            The best way to manage what you have to do, don&apos;t forget your plans.
          </p>
          <SpanButton to="/home" className="mt-12">
            Get Started
          </SpanButton>
        </section>
      </div>
    </main>
  )
}
