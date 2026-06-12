type FormSuccessMessageProps = {
  className?: string
}

export default function FormSuccessMessage({ className = '' }: FormSuccessMessageProps) {
  return (
    <p
      className={`form-success-celebrate text-description leading-6 text-body ${className}`.trim()}
      role="status"
    >
      Thank you! We&apos;ll be in touch shortly.
    </p>
  )
}