import styles from './progress.module.css'
import * as React from 'react'
import classnames from 'classnames'
import Star from '../Icons/Star'
import Flag from '../Icons/Flag'

type Props = {
  totalItems: number
  completedItems: number
  labelText: string
}

const Progress = ({ totalItems, completedItems, labelText }: Props) => {
  const stars = new Array(5).fill({})

  return (
    <div>
      <progress
        className={classnames(styles.progress)}
        id="progress"
        value={completedItems}
        max={totalItems}
        aria-valuenow={completedItems}
        aria-valuemin={0}
        aria-valuemax={totalItems}
        aria-valuetext={`${completedItems}/${totalItems}`}
      />
      <label htmlFor="progress" className={classnames(styles.label)}>
        <div>
          <p>{labelText}</p>
          <span>{`${completedItems}/${totalItems}`}</span>
        </div>
        <div className={classnames(styles.icons)}>
          {stars.map((_, index) => {
            const active = index < 3
            return (
              <Star
                key={`star-${index}`}
                color={active ? '#AB61E5' : '#ACB1B6'}
              />
            )
          })}
          <Flag />
        </div>
      </label>
    </div>
  )
}

export default Progress
