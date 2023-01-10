import * as React from 'react'
import classnames from 'classnames'
import styles from './multipleChoice.module.css'

type Question = {
  value: number
  label: string
}

type Props = {
  options: Question[]
  initialValue?: number | null
  disabled?: boolean
  onChange?: (fields: number) => void
}

const MultipleChoice = ({
  options,
  initialValue = null,
  disabled,
  onChange,
}: Props) => {
  const [isCheck, setIsCheck] = React.useState<number | null>(initialValue)

  function handleOnChange(value: number) {
    setIsCheck(value)
    onChange && onChange(value)
  }

  return (
    <div className={styles.wrapper}>
      {options.map((item) => {
        return (
          <label
            key={item.value}
            htmlFor={`question-${item.value}`}
            className={classnames(styles.label, {
              [styles.checked]: isCheck === item.value,
            })}
          >
            <input
              type="radio"
              value={item.value}
              id={`question-${item.value}`}
              checked={isCheck === item.value}
              onChange={() => handleOnChange(item.value)}
              disabled={disabled}
              name="multiplechoice"
            />
            <p>{item.label}</p>
          </label>
        )
      })}
    </div>
  )
}

export default MultipleChoice
