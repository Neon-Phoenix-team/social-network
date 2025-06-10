'use client'
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import s from './Radio.module.scss'

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type DefaultSpanPropsType = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>

type RadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
  options?: any[]
  onChangeOption?: (option: any) => void

  spanProps?: DefaultSpanPropsType
}

const Radio: React.FC<RadioPropsType> = ({
  id,
  name,
  className,
  options,
  value,
  onChange,
  onChangeOption,
  spanProps,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.checked = true
    onChangeOption?.(e.currentTarget.id[e.currentTarget.id.length - 1])
  }
  console.log(restProps)

  const finalRadioClassName = s.radio + (className ? ' ' + className : '')
  const spanClassName =
    s.span + (spanProps?.className ? ' ' + spanProps.className : '')
  const mappedOptions: any[] = options
    ? options.map(o => (
        <label
          key={name + '-' + o.id}
          className={
            s.label +
            (o.id == value ? ' ' + s.checked : '') +
            (o.disabled ? ' ' + s.disabled : '')
          }
        >
          <input
            id={id + '-input-' + o.id}
            className={finalRadioClassName}
            type={'radio'}
            name={name}
            checked={o.id == value}
            value={o.id}
            onChange={onChangeCallback}
            disabled={o.disabled}
            {...restProps}
          />
          <span
            id={id + '-span-' + o.id}
            {...spanProps}
            className={spanClassName}
          ></span>
          {o.value}
        </label>
      ))
    : []

  return <div className={s.options}>{mappedOptions}</div>
}

export default Radio

// const options = [
//   { id: '1', value: 'One' },
//   { id: '2', value: 'Two' },
//   { id: '3', value: 'Three' },
// ]

// function RadioClient() {
//   const [value, setValue] = useState('1')

//   return (
//     <Radio
//       id="radio"
//       name="radio"
//       options={options}
//       value={value}
//       onChangeOption={setValue}
//     />
//   )
// }
