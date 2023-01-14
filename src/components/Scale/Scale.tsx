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
  const [selected, setSelected] = React.useState<number>(initialValue)
  const scale = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

  function handleOnChange(index: number) {
    setSelected(index)
    handleUpdateValue?.(index)
  }

  return (
    <div
      className={classnames(styles.ratingWrapper, {
        [styles.disabled]: disabled,
      })}
    >
      {scale.map((item) => {
        return (
          <React.Fragment key={`scale-${item}-${name}`}>
            <input
              type="radio"
              name={name}
              id={`scale-${item}-${name}`}
              onChange={() => handleOnChange(item)}
              checked={item === selected}
              value={item}
              disabled={disabled}
              {...props}
            />
            <label htmlFor={`scale-${item}-${name}`}></label>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Scale
