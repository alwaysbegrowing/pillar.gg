import React from 'react'
import styles from './LinkYoutubeButton.less'

export default function LinkYoutubeButton() {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.linkYoutubeButton} type='button'>Connect With Youtube</button>
    </div>
  )
}
