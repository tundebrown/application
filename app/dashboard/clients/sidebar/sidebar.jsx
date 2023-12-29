import Image from "next/image";
import MenuLink from "./filter/filterItem";
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
    list: [
      {
        title: "Client Name",
      },
      {
        title: "Contact Number",
      },
      {
        title: "Account Manager",
      },
      {
        title: "Located Within",
      },
      {
        title: "Attachment Category",
      },
      {
        title: "Associated Tags",
      },
      {
        title: "Billing City",
      },
      {
        title: "Billing Code",
      },
      {
        title: "Billing Country",
      },
      {
        title: "Billing Province",
      },
      {
        title: "Billing Street",
      },
      {
        title: "Created By",
      },
      {
        title: "Created Time",
      },
      {
        title: "Fax",
      },
      {
        title: "Industry",
      },
      {
        title: "Is Attachment Present",
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
            <h5 className={styles.h5}>FILTER CLIENTS BY</h5>
          </div>

        </div>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <div key={item.title} className={styles.filter}><input type="checkbox" /><MenuLink item={item} key={item.title} /></div>
            ))}
          </li>
        ))}
      </ul>

      <div className={styles.line}></div>
    </div>
  );
};

export default Sidebar;
