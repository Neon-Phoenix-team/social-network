'use client'

import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import * as Select from '@radix-ui/react-select'
import { clsx } from 'clsx'
import s from './SelectBox.module.scss'
import { ArrowIosDown } from '@/shared/assets/icons/select/ArrowIosDown'

export type SelectBoxProps = {
  className?: string
  disabled?: boolean
  errorMessage?: FieldError
  height?: boolean
  idValue?: boolean
  label?: string
  onValueChange?: (value: any) => void
  options: any[]
  placeholder?: ReactNode
  required?: boolean
  selectContentClassName?: string
  value?: any
  showOnlyDescription?: boolean
}

export const SelectBox = ({
                            className,
                            disabled,
                            errorMessage,
                            height,
                            idValue = false,
                            label,
                            onValueChange,
                            options,
                            placeholder,
                            required,
                            selectContentClassName,
                            value,
                            showOnlyDescription = false,
                          }: SelectBoxProps) => {

  const selected = options.find(opt => (idValue ? opt.id : opt.value) === value)

  const renderItemContent = (item: any) => (
    <div className={s.itemContent}>
      {!showOnlyDescription && item.img}
      <span>{item.description ?? item.value}</span>
    </div>
  )

  return (
    <label className={s.label}>
      {label}
      <Select.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
      >
        <Select.Trigger
          aria-label={label ?? 'select'}
          className={clsx(disabled ? s.triggerDisabled : s.trigger, className)}
        >
          <div className={s.triggerContent}>
            <div className={s.valueWrapper}>
              {selected ? (
                renderItemContent(selected)
              ) : (
                <span className={s.valueDescription}>
                  {placeholder ?? ''}
                </span>
              )}
            </div>
            <ArrowIosDown className={disabled ? s.iconDisabled : s.icon} />
          </div>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={clsx(s.content, selectContentClassName, {
              [s.height]: height,
            })}
            position="popper"
            sideOffset={-1}
          >
            <Select.Viewport>
              {options.map(el => (
                <Select.Item
                  className={s.item}
                  key={el.value}
                  value={idValue ? el.id : el.value}
                  disabled={el.disabled}
                >
                  {renderItemContent(el)}
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {errorMessage?.message && <p className={s.error}>{errorMessage.message}</p>}
    </label>
  )
}
