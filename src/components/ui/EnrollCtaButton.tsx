import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LinkProps } from 'react-router-dom'
import PreviewLink from '../layout/PreviewLink'

export const enrollCtaClassName =
  'header-cta inline-flex min-h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-accent-bright px-8 text-xs font-semibold uppercase leading-none tracking-wide text-accent-dark'

type EnrollCtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function EnrollCtaButton({ children, className = '', type = 'button', ...props }: EnrollCtaButtonProps) {
  return (
    <button type={type} className={`${enrollCtaClassName} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

type EnrollCtaLinkProps = LinkProps & {
  children: ReactNode
}

export function EnrollCtaLink({ children, className = '', ...props }: EnrollCtaLinkProps) {
  return (
    <PreviewLink className={`${enrollCtaClassName} ${className}`.trim()} {...props}>
      {children}
    </PreviewLink>
  )
}