import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdSupervisedUserCircle,
  MdLogout,
  MdVideocam,
  MdEditDocument,
  MdEmail,
  MdOutlineMailLock,
  MdMarkEmailRead,
  MdAttachEmail,
  MdVoicemail,
  MdSettings,
  MdAlternateEmail,
  MdAddBox,
} from "react-icons/md";
import ButtonPrimary from "@/app/ui/widgets/button/page";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
// import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "EMAIL",
    list: [
      {
        title: "All Emails",
        path: "/dashboard/mail",
        icon: <MdEmail />,
      },
      {
        title: "Opened/Replied",
        path: "",
        icon: <MdMarkEmailRead />,
      },
      {
        title: "Failed Emails",
        path: "",
        icon: <MdOutlineMailLock />,
      },
      {
        title: "Scheduled Emails",
        path: "",
        icon: <MdAttachEmail />,
      },
    ],
  },
  {
    title: "EMAIL SETTINGS",
    list: [
      {
        title: "Email Templates",
        path: "",
        icon: <MdEmail />,
      },
      {
        title: "Standard Email Templates",
        path: "",
        icon: <MdSettings />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <div className={styles.listTop}>
          <div className={styles.listTopTitle}>
            <span className={styles.icon}>
              <MdEmail />
            </span>{" "}
            <h5 className={styles.h5}>Conversations</h5>
          </div>
          <ButtonSeondary>
            <MdAddBox /> Compose Email
          </ButtonSeondary>
        </div>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>

      <div className={styles.line}></div>
    </div>
  );
};

export default Sidebar;
