import * as React from 'react'
import classnames from 'classnames'
import styles from './scale.module.css'

type Props = {
  initialValue?: number | null
  onChange?: (fields: number) => void
}

const Scale = ({ initialValue = null, onChange }: Props) => {
  const [selected, setSelected] = React.useState<number | null>(() =>
    initialValue !== null ? oppositeNumber(initialValue) : 10,
  )
  const scale = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

  function handleOnChange(index: number) {
    setSelected(index)
    const realValue = oppositeNumber(index)
    onChange?.(realValue)
  }

  return (
    <div className={classnames(styles.ratingWrapper)}>
      {scale.map((_, index) => (
        <React.Fragment key={`scale-${index}`}>
          <input
            type="radio"
            name="rate"
            id={`scale-${index}`}
            onChange={() => handleOnChange(index)}
            checked={index === selected}
          />
          <label htmlFor={`scale-${index}`}></label>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Scale

function oppositeNumber(num: number) {
  return 10 - num
}
