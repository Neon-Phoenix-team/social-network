'use client'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import s from './Checkbox.module.scss'
import clsx from 'clsx'
import { useId } from 'react'
import { CheckBoxSelected } from '@/shared/assets/icons/checkbox/CheckBoxSelected'

type Props = {
  value?: string
  name?: string
  label: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: () => void
}

export const Checkbox = (props: Props) => {
  const { label, checked, defaultChecked, disabled,onChange,name,value} = props
  const checkBoxId = useId()
  return (
    <div className={clsx(s.wrapper, disabled && s.disabledBox)}>
      <CheckboxPrimitive.Root
        onCheckedChange={onChange}
        className={s.checkboxInput}
        id={checkBoxId}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        value={value}
        name={name}
      >
        <CheckboxPrimitive.Indicator className={s.checkboxIndicator}>
            <CheckBoxSelected />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label className={s.label} htmlFor={checkBoxId}>
        {label}
      </label>
    </div>
  )
}
