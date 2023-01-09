import * as React from 'react'
import classnames from 'classnames'
import styles from './multipleChoice.module.css'

type Question = {
  value: number
  label: string
}

type Props = {
  options: Question[]
  initialValue?: number[]
  onChange?: (fields: number[]) => void
}

const MultipleChoice = ({ options, initialValue = [], onChange }: Props) => {
  const [isCheck, setIsCheck] = React.useState<number[]>(initialValue)

  function handleOnChange(value: number) {
    if (isCheck && isCheck.includes(value)) {
      const newArray = isCheck.filter((item) => item !== value)
      setIsCheck(newArray)
      onChange && onChange(newArray)

      return
    }

    setIsCheck((prev) => [...prev, value])
    onChange && onChange([...isCheck, value])
  }

  return (
    <div className={styles.wrapper}>
      {options.map((item, index) => {
        const checked = Array.isArray(isCheck) && isCheck.includes(item.value)

        return (
          <label
            key={item.value}
            htmlFor={`question-${item.value}`}
            className={classnames(styles.label, {
              [styles.checked]: checked,
            })}
          >
            <input
              type="checkbox"
              value={item.value}
              id={`question-${item.value}`}
              checked={checked}
              onChange={() => handleOnChange(item.value)}
            />
            <p>{item.label}</p>
          </label>
        )
      })}
    </div>
  )
}

export default MultipleChoice
