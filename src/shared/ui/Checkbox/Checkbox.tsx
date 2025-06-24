'use client'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import s from './Checkbox.module.scss'
import clsx from 'clsx'
import { CheckBoxSelected } from '@/shared/assets/icons/checkbox/CheckBoxSelected'
import { ReactNode, useId } from 'react'

type Props = {
  name?: string
  label: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export const Checkbox = (props: Props) => {
  const { label, checked, defaultChecked, disabled,onChange,name, ...rest} = props
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
        name={name}
        {...rest}
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
