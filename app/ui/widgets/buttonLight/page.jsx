'use client'

import styles from "./page.module.css"

const ButtonLight = ({children, type, onclick}) => {
  return (
    <button type={type} className={styles.button} onClick={onclick}>
        {children}
    </button>
  )
}

export default ButtonLight