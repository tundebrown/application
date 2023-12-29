import styles from "./ui/general/page.module.css";
import Navbar from "./ui/navbar/navbar";
import Image from "next/image";

const Dashboard = async () => {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <div className={styles.content}>
            <small>Welcome to</small>
            <h1 className={styles.h1}>
              Application <br /> Tracking System
            </h1>
            <button className={styles.button} type="button">Sign Up</button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
