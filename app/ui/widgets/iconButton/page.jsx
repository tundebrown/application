import styles from "./page.module.css"

const IconButton = ({children, onclick}) => {
  return (
    <button className={styles.button} onClick={onclick}>
        {children}
    </button>
  )
}

export default IconButton