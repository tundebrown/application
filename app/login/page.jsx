import styles from "@/app/ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
import Navbar from "../ui/navbar/navbar";
import Image from "next/image";


const Dashboard = async () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.loginHero}>
          <h2>Application Tracking System</h2>
          <p>ATS for recruitment firms that makes recruiters unstoppable</p>
          <Image
            className={styles.heroImageLogin}
            src={"/login-page-left-image-new.svg"}
            alt=""
            width="200"
            height="200"
          />
        </div>
        <div className={styles.loginSection}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
