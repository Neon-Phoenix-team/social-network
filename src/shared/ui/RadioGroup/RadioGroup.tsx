import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import s from './RadioGroup.module.scss'
import clsx from 'clsx'

type Option = {
  id: string
  label: string;
  value: string;
};

type Props = {
  options: Option[]
  value?: string
  disabled?: boolean,
  onChange?: (value: string) => void,
}

export const RadioGroup = (props: Props) => {
  const { options,disabled, value,onChange} = props

  return (
    <RadioGroupPrimitive.Root
      className={clsx(s.Root,disabled && s.disabled)}
      defaultValue={value}
      onValueChange={onChange}
      disabled={disabled}>

      {options.map((option) => (
        <div className={s.wrapper} key={option.id}>
          <RadioGroupPrimitive.Item
            className={s.Item}
            id={option.id}
            value={option.value}
          >
            <RadioGroupPrimitive.Indicator className={s.Indicator} />
          </RadioGroupPrimitive.Item>
          <label className={s.Label} htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroupPrimitive.Root>
  )
}
