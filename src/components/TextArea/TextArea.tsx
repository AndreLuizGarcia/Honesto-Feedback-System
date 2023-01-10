import * as React from 'react'
import styles from './textarea.module.css'
import classnames from 'classnames'

type Props = {
  initialValue?: string
  handleUpdateValue?: (value: string) => void
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = ({
  initialValue = '',
  placeholder = 'Say something',
  disabled,
  handleUpdateValue,
  ...props
}: Props) => {
  const [value, setValue] = React.useState<string>(initialValue)

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setValue(value)
    handleUpdateValue && handleUpdateValue(value)
  }

  return (
    <textarea
      className={classnames(styles.textarea)}
      placeholder={placeholder}
      rows={10}
      cols={100}
      onChange={handleOnChange}
      value={value}
      disabled={disabled}
      {...props}
    />
  )
}

export default TextArea
