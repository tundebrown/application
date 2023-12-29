import Sidebar from "./sidebar/sidebar";
import styles from "./page.module.css";

const Layout = ({children}) => {
    return(
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
            {children}
            </div>
        </div>
    )
}

export default Layout;