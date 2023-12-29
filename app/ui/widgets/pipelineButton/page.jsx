'use client'

import { MdArrowRight } from "react-icons/md"
import styles from "./page.module.css"

const PipelineButton = ({children, type, onclick, activeComponent, componentName}) => {
  return (
    <button type={type} className={styles.button} onClick={onclick} style={{
        borderColor: activeComponent === `${componentName}` ? 'rgb(131, 135, 168)' : 'rgb(167, 167, 167)',
        borderWidth: activeComponent === `${componentName}` ? '3px' : '1px',
        padding: activeComponent === `${componentName}` ? '10px 18px' : '12px 20px',
      }}>
        {children}
    </button>
  )
}

export default PipelineButton

// border-color: rgb(131, 135, 168);
// border-width: 3px;
// padding: 10px 18px;