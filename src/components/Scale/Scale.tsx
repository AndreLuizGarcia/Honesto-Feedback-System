import * as React from 'react'
import styles from './scale.module.css'
import classnames from 'classnames'

type Props = {
  initialValue?: number
  handleUpdateValue?: (fields: number) => void
} & React.InputHTMLAttributes<HTMLInputElement>

const Scale = ({
  initialValue = 0,
  name,
  disabled = false,
  handleUpdateValue,
  ...props
}: Props) => {
  const [selected, setSelected] = React.useState<number>(() =>
    oppositeNumber(initialValue),
  )
  const scale = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

  function handleOnChange(index: number) {
    setSelected(index)
    const realValue = oppositeNumber(index)
    handleUpdateValue?.(realValue)
  }

  return (
    <div
      className={classnames(styles.ratingWrapper, {
        [styles.disabled]: disabled,
      })}
    >
      {scale.map((_, index) => (
        <React.Fragment key={`scale-${index}-${name}`}>
          <input
            type="radio"
            name={name}
            id={`scale-${index}-${name}`}
            onChange={() => handleOnChange(index)}
            checked={index === selected}
            value={oppositeNumber(index)}
            disabled={disabled}
            {...props}
          />
          <label htmlFor={`scale-${index}-${name}`}></label>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Scale

function oppositeNumber(num: number) {
  return 10 - num
}
