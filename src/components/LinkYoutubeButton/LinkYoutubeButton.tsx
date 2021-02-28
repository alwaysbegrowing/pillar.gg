import React from 'react'
import styles from './LinkYoutubeButton.less'

export default function LinkYoutubeButton({ onClick }) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.linkYoutubeButton} onClick={() => onClick()} type='button'>Connect With Youtube</button>
    </div>
  )
}
