import styles from "./page.module.css"

const ButtonSeondary = ({children, type, onclick}) => {
  return (
    <button type={type} className={styles.button} onClick={onclick}>
        {children}
    </button>
  )
}

export default ButtonSeondary