import MenuLink from "./menuLink/menuLink";
import styles from "./navbar.module.css";
import {
  MdLogout,
  MdNotifications,
  MdOutlineCalendarMonth,
  MdOutlineSettings,
  MdSearch,
} from "react-icons/md";
import { auth, signOut } from "@/app/auth";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "",
    list: [
      {
        title: "Home",
        path: "/dashboard",
      },
      {
        title: "Job Openings",
        path: "/dashboard/jobs",
      },
      {
        title: "Candidates/Talent Pool",
        path: "/dashboard/candidates",
      },
      {
        title: "Interviews",
        path: "/dashboard/interviews",
        
      },
      {
        title: "Mailbox",
        path: "/dashboard/mail",
      },
      {
        title: "Clients",
        path: "/dashboard/clients",
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
      },
    ],
  },
];

// const user = {
//   img: "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   username: "tunde",

// }

const Navbar = async () => {
  const { user } = await auth();
  // const pathname = usePathname();

  return (
    <div className={styles.container}>
      {/* <div className={styles.title}>{pathname.split("/").pop()}</div> */}
      <div className={styles.logoContainer}>
        <Image
          className={styles.logoImage}
          src={"/atslogolight.png"}
          alt=""
          width="60"
          height="15"
        />
      </div>
      <div className={styles.navList}>
        {menuItems.map((cat) =>
          cat.list.map((item) => <MenuLink item={item} key={item.title} />)
        )}
        
      </div>

      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <MdOutlineCalendarMonth size={20} />
          <MdNotifications size={20} />
          <MdOutlineSettings size={20} />
          {/* <MdOutlineSupervisedUserCircle size={20} /> */}
          <div className={styles.user}>
            <Link href="/dashboard/profile">
            <Image
              className={styles.userImage}
              src={user.img || "/noavatar.png"}
              alt=""
              width="30"
              height="30"
              />
              </Link>
            {/* <div className={styles.userDetail}>
              <span className={styles.username}>{user.username}</span>
              <span className={styles.userTitle}>Administrator</span>
            </div> */}
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className={styles.logout}>
              <MdLogout />
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
