'use client'

import React, { useState } from 'react'
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
  const [error, setError] = useState(false)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )
  const [active, setActive] = useState(false)

  const handleChangeDate = (date: Date | null): void => {
    if (date) {
      setStartDate(date)
    }
  }

  const handleClick = () => {
    setActive(true)
  }

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

  // const blurHandler = ()=> {
  //   setActive(false)
  // }

  // onBlur={blurHandler}

  return (
    <>
      <div onClick={handleClick} className={error ? s.error : s.wrapper}>
        <DatePicker
          open={active}
          dayClassName={dayClassName}
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
        {error && <span className={s.errorText}>fasdf</span>}
      </div>

    </>
  )
}
