'use client'

import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState, KeyboardEvent } from 'react'
import s from './Input.module.scss'
import { Search } from '@/shared/assets/icons/input/Search'
import { Eye } from '@/shared/assets/icons/input/Eye'
import { EyeOff } from '@/shared/assets/icons/input/EyeOff'
import { Close } from '@/shared/assets/icons/input/Close'


type InputProps = {
  className?: string
  disableValue?: boolean
  errorMessage?: string
  label?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  onSearchClear?: () => void
  placeholder?: string
  requiredField?: boolean
  type?: 'default' | 'password' | 'searchType'
  value?: string
} & ComponentPropsWithoutRef<'input'>


function getType(type: 'default' | 'password' | 'searchType', showPassword: boolean): string {
  return type === 'password' && showPassword ? 'text' : type
}


export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    disableValue = false,
    errorMessage,
    label,
    onChangeText,
    onEnter,
    onSearchClear,
    placeholder = 'Some text',
    requiredField = false,
    type = 'default',
    value,
    ...restProps
  } = props

  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)


  const inputStyle = (type: 'default' | 'password' | 'searchType') => {
    if (type === 'searchType') {
      return { paddingLeft: '2.56rem', paddingRight: '35px' }
    } else if (type === 'password') {
      return { paddingRight: '35px' }
    } else {
      return {}
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeText) {
      onChangeText(e.currentTarget.value)
    }
  }

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === 'Enter') {
      onEnter()
    }
  }

  const onSearchClearHandler = () => {
    if (onSearchClear) {
      onSearchClear()
    }
  }

  const finalType = getType(type, showPassword)

  let fillColor = '#8D9094'

  if (disableValue) {
    fillColor = '#4c4c4c'
  } else if (isFocused || errorMessage || value) {
    fillColor = '#fff'
  }


  return (

    <div className={className}>
      <label
        className={s.label}
      >
        {label}
        {requiredField && (
          <span className={s.required}>*</span>
        )}
        <div className={`${s.fieldContainer}`}>
          {type === 'searchType' && (
            <span className={disableValue ? s.searchDisabled : s.searchIcon} aria-hidden="true">
            <Search fill={fillColor} />
            </span>
          )}
          <input
            className={`${s.field} ${errorMessage ? s.error : ''}`}
            disabled={disableValue}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressCallback}
            placeholder={placeholder}
            ref={ref}
            style={inputStyle(type)}
            type={finalType}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...restProps}
          />
          {type === 'password' && (
            <button
              className={s.buttonAction}
              disabled={disableValue}
              onClick={() => setShowPassword(prev => !prev)}
              type={'button'}
            >
              {showPassword ? (
                <Eye fill={disableValue ? '#4c4c4c' : '#fff'} />
              ) : (
                <EyeOff fill={disableValue ? '#4c4c4c' : '#fff'} />
              )}
            </button>
          )}
          {type === 'searchType' && !!value && (
            <button
              className={s.buttonAction}
              disabled={disableValue}
              onClick={onSearchClearHandler}
              type={'button'}
            >
              <Close fill={disableValue ? '#4c4c4c' : '#808080'} />
            </button>
          )}
        </div>
        {errorMessage && (
          <span className={s.errorMessage}>
            {errorMessage}
          </span>
        )}
      </label>
    </div>
  )
})

Input.displayName = 'Input'