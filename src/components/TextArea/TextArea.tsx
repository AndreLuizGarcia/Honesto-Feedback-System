import * as React from 'react'
import styles from './textarea.module.css'
import classnames from 'classnames'

type Props = {
  initialValue?: string
  onChange?: (value: string) => void
  placeHolder?: string
}

const TextArea = ({
  initialValue = '',
  placeHolder = 'Say something',
  onChange,
}: Props) => {
  const [value, setValue] = React.useState<string>(initialValue)

  function handleOnChange(value: string) {
    setValue(value)
    onChange && onChange(value)
  }

  return (
    <textarea
      className={classnames(styles.textarea)}
      placeholder={placeHolder}
      rows={10}
      cols={100}
      onChange={(e) => handleOnChange(e.target.value)}
      value={value}
    />
  )
}

export default TextArea
