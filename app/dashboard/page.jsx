import { MdOutlinePhoneAndroid } from "react-icons/md";
import { cards } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
// import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Interviews from "../ui/dashboard/interviews/interviews";
import Todolist from "../ui/dashboard/todolist/todolist";
import { auth } from "@/app/auth";

const Dashboard = async () => {
  const { user } = await auth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <div>Welcome {user.username}</div>
        <div>
          <MdOutlinePhoneAndroid size={10} /> Get Mobile app
        </div>
      </div>
      <div className={styles.main}>
        Overview
        <div className={styles.cards}>
          
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <div className={styles.tabs}>
          <Interviews />
          <Todolist />
        </div>
        <Chart />
      </div>
      {/* <div className={styles.side}>
        <Rightbar />
      </div> */}
    </div>
  );
};

export default Dashboard;
