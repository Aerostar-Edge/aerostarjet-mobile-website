import { useCallback, useEffect, useId, useRef, useState } from 'react'

export type FormSelectOption = {
  value: string
  label: string
}

type FormSelectProps = {
  options: FormSelectOption[]
  defaultValue?: string
  placeholder?: string
  name?: string
  required?: boolean
}

const PANEL_GAP = 12
const PANEL_MAX_HEIGHT = 220

function getPanelMaxHeight(trigger: HTMLButtonElement) {
  const rect = trigger.getBoundingClientRect()
  let limitBottom = window.innerHeight - PANEL_GAP

  const ctaBanner = document.querySelector('.cta-banner')
  if (ctaBanner) {
    const ctaRect = ctaBanner.getBoundingClientRect()
    if (ctaRect.top > rect.bottom) {
      limitBottom = Math.min(limitBottom, ctaRect.top - PANEL_GAP)
    }
  }

  const spaceBelow = limitBottom - rect.bottom - 4
  return Math.min(PANEL_MAX_HEIGHT, Math.max(48, spaceBelow))
}

export default function FormSelect({
  options,
  defaultValue = '',
  placeholder,
  name,
  required,
}: FormSelectProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [panelMaxHeight, setPanelMaxHeight] = useState(PANEL_MAX_HEIGHT)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listboxId = useId()

  const selectedOption = options.find((option) => option.value === value)
  const displayLabel = selectedOption?.label ?? placeholder ?? ''
  const isPlaceholder = !selectedOption && Boolean(placeholder)

  const updatePanelLayout = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    setPanelMaxHeight(getPanelMaxHeight(trigger))
  }, [])

  useEffect(() => {
    if (!open) return

    updatePanelLayout()

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    const onLayoutChange = () => {
      updatePanelLayout()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onLayoutChange)
    window.addEventListener('scroll', onLayoutChange, true)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onLayoutChange)
      window.removeEventListener('scroll', onLayoutChange, true)
    }
  }, [open, updatePanelLayout])

  const selectOption = (optionValue: string, isPlaceholderOption: boolean) => {
    if (isPlaceholderOption) return
    setValue(optionValue)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`form-select${open ? ' form-select--open' : ''}`}>
      <button
        ref={triggerRef}
        type="button"
        className={`form-select__trigger${isPlaceholder ? ' form-select__trigger--placeholder' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => {
          setOpen((previous) => {
            const next = !previous
            if (next) {
              requestAnimationFrame(updatePanelLayout)
            }
            return next
          })
        }}
      >
        <span className="form-select__value">{displayLabel}</span>
        <span className="form-select__chevron" aria-hidden="true" />
      </button>

      {open ? (
        <ul
          id={listboxId}
          className="form-select__panel"
          role="listbox"
          style={{ maxHeight: panelMaxHeight }}
        >
          {placeholder ? (
            <li
              role="option"
              aria-selected={value === ''}
              aria-disabled="true"
              className="form-select__option form-select__option--placeholder"
            >
              {placeholder}
            </li>
          ) : null}
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={`form-select__option${value === option.value ? ' form-select__option--selected' : ''}`}
              onClick={() => selectOption(option.value, false)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}

      {name ? (
        <select
          name={name}
          required={required}
          value={value}
          onChange={() => undefined}
          className="form-select__native"
          tabIndex={-1}
          aria-hidden="true"
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  )
}