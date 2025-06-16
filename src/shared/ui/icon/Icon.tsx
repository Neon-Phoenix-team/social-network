import React from 'react'
import sprite from './sprite.svg'

type IconPropsType = {
  iconId: string
  width?: string
  height?: string
  viewBox?: string
  fill?: string
  strokeWidth?: string
}

export const Icon = (props: IconPropsType) => {
  const { width, height, viewBox, fill, iconId, strokeWidth } = props

  return (
    <svg
      strokeWidth={strokeWidth || 'inherit'}
      width={width || '24'}
      height={height || '24'}
      viewBox={viewBox || '0 0 24 24'}
      fill={fill || 'none'}
      stroke={'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use xlinkHref={`${sprite.src}#${iconId}`} />
    </svg>
  )
}
