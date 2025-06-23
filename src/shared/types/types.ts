import { JSX } from 'react'

export type SelectOption = {
  id: string
  value: string
  description?: string
  img?: JSX.Element
  disabled?: boolean
}