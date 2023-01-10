import * as React from 'react'
import styles from './noFeedback.module.css'

const NoFeedback = () => {
  return (
    <div className={styles.wrapper}>
      <h1>No feedback to display 🔮</h1>
      <h2>
        There is no feedback to display at this time – check back in a bit!
      </h2>
    </div>
  )
}

export default NoFeedback
