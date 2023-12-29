import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdSupervisedUserCircle,
  MdLogout,
  MdVideocam,
  MdEditDocument,
} from "react-icons/md";
// import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Interview",
    list: [
      {
        title: "Formal Interview",
        path: "/dashboard/interviews",
        desc: "Schedule and conduct Interviews with Candidates, Interviewers, Recruiters and Contacts.",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Video Interview",
        path: "/dashboard/interviews/video",
        desc: "Schedule and conduct both recorded and live video Interviews with Candidates, Recruiters and Interviewers.",
        icon: <MdVideocam />,
      },
      {
        title: "Log an Interview",
        path: "/dashboard/interviews/log",
        desc: "Log Interview data that had happened in the past or spontaneously.",
        icon: <MdEditDocument />,
      },

    ],
  },

];

const Sidebar = () => {
  return (
    <div className={styles.container}>

      <ul className={styles.list}>
        {menuItems.map((cat) => (
            <li key={cat.title} >
            <p className={styles.interviewTitle}>{cat.title}</p>
              <hr />
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>

      <div className={styles.line}>
        
      </div>

    </div>
  );
};

export default Sidebar;
