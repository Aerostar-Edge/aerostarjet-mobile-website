import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
type LeadCaptureModalProps = {
  title: string
  description: string
  onClose: () => void
  onSubmit: (data: { name: string; phone: string; email: string }) => void
}

const fieldClass =
  'lead-capture-modal__input min-h-12 w-full rounded-xl border border-border-alt bg-bg-grey px-4 text-sm text-navy outline-none focus:border-primary'

export default function LeadCaptureModal({
  title,
  description,
  onClose,
  onSubmit,
}: LeadCaptureModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ name: name.trim(), phone: phone.trim(), email: email.trim() })
  }

  return (
    <div className="lead-capture-modal" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="lead-capture-modal__panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="lead-capture-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          {'\u2715'}
        </button>

        <h2 id={titleId} className="lead-capture-modal__title">
          {title}
        </h2>
        <p id={descriptionId} className="lead-capture-modal__description">
          {description}
        </p>

        <form className="lead-capture-modal__form" onSubmit={handleSubmit}>
          <label className="lead-capture-modal__field">
            <span className="lead-capture-modal__label">Full Name *</span>
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your full name"
              className={fieldClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label className="lead-capture-modal__field">
            <span className="lead-capture-modal__label">Phone Number *</span>
            <input
              required
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="+91"
              className={fieldClass}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>

          <label className="lead-capture-modal__field">
            <span className="lead-capture-modal__label">Email Address *</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="your@email.com"
              className={fieldClass}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <button type="submit" className="lead-capture-modal__submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
