'use client'
import s from '../Button/Button.module.scss'
import { Slot } from '@radix-ui/react-slot'
import React, { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'

type ContainedProps = {
  variant?: 'contained'
  color?: 'primary' | 'secondary'
}

type OutlinedOrTextProps = {
  variant?: 'outlined' | 'text'
  color?: never
}

type Props = (ContainedProps | OutlinedOrTextProps) & {
  asChild?: boolean
} & ComponentPropsWithoutRef<'button'>
export const Button = (props: Props) => {
  const {
    variant = 'contained',
    color = 'primary',
    disabled,
    asChild,
    onClick,
    ...rest
  } = props
  const Component = asChild ? Slot : 'button'
  const finalClassName = clsx(
    s.button,
    s[variant],
    variant === 'contained' && color && s[color ?? 'primary'],
    disabled && s.disabled
  )
  return (
    <Component onClick={onClick} className={finalClassName} disabled={disabled} {...rest} />
  )
}
