import { useEffect, useId, useRef, useState } from 'react'

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

export default function FormSelect({
  options,
  defaultValue = '',
  placeholder,
  name,
  required,
}: FormSelectProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  const selectedOption = options.find((option) => option.value === value)
  const displayLabel = selectedOption?.label ?? placeholder ?? ''
  const isPlaceholder = !selectedOption && Boolean(placeholder)

  useEffect(() => {
    if (!open) return

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

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const selectOption = (optionValue: string, isPlaceholderOption: boolean) => {
    if (isPlaceholderOption) return
    setValue(optionValue)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`form-select${open ? ' form-select--open' : ''}`}>
      <button
        type="button"
        className={`form-select__trigger${isPlaceholder ? ' form-select__trigger--placeholder' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((previous) => !previous)}
      >
        <span className="form-select__value">{displayLabel}</span>
        <span className="form-select__chevron" aria-hidden="true" />
      </button>

      {open ? (
        <ul id={listboxId} className="form-select__panel" role="listbox">
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
