'use client'

import React, { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import './style.scss'

import { Calendar, CalendarOutline } from '@/assets/icons/components'
import s from './Picker.module.scss'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

// TODO добавить useEffect для локализации. и изменить registerLocale
registerLocale('ru', ru)

export const Picker = () => {
  // TODO изменить на ответ от сервера или как там будет! пока просто заглушка
  const [error, setError] = useState('')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )
  const [active, setActive] = useState(false)

  const dayClassName = (date: Date): string => {
    if (!startDate) return ''
    // не активный месяц
    if (
      date.getMonth() !== currentMonth ||
      date.getFullYear() !== currentYear
    ) {
      return 'inactive-month-day'
    }

    // подсветка выходных
    const day = date.getDay()
    if (day === 6 || day === 0) {
      return 'weekend-day'
    }

    return ''
  }

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date.getMonth())
    setCurrentYear(date.getFullYear())
  }

  const handleChangeDate = (date: Date | null): void => {
    if (date) {
      setStartDate(date)
    }
    setActive(false)
  }

  const handleBlur = () => {
    setActive(false)
  }

  const handleClick = () => {
    setActive(true)
  }

  return (
    <>
      <div className={error ? s.error : s.wrapper}>
        <DatePicker
          onInputClick={handleClick}
          dayClassName={dayClassName}
          onBlur={handleBlur}
          className={s.datePicker}
          onMonthChange={handleMonthChange}
          selected={startDate}
          onChange={handleChangeDate}
          showIcon
          locale="ru"
          value={format(startDate, 'dd/MM/yyyy')}
          icon={
            active ? (
              <Calendar className={s.icon} />
            ) : (
              <CalendarOutline className={s.icon} />
            )
          }
        />
        {error && <span className={s.errorText}>{error}</span>}
      </div>
    </>
  )
}
