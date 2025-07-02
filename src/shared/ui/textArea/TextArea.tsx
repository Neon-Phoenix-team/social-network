import s from './TextArea.module.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextArea as textarea } from '@radix-ui/themes'

type TextAreaProps = {
  placeholder: string
  error?: boolean | undefined
  errorMsg?: string
}

export const TextArea = ({ placeholder, error, errorMsg }: TextAreaProps) => {
  return (
    <>
      <div className={s.wrapper}>
        <textarea
          style={{ resize: 'none' }}
          className={error ? `${s.default} ${s.error}` : s.default}
          placeholder={placeholder}
        />
        {error && <span className={s.error}>{errorMsg}</span>}
      </div>
    </>
  )
}
