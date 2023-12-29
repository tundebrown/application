import MenuLink from "./menuLink/menuLink";
import styles from "./navcomponent.module.css";
import {
  MdLogout,
  MdNotifications,
  MdOutlineCalendarMonth,
  MdOutlineSettings,
  MdSearch,
} from "react-icons/md";
import { auth, signOut } from "@/app/auth";
import Image from "next/image";

const menuItems = [

      {
        title: "Profile",
        path: "/dashboard/users/",
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
        path: "/dashboard/mailbox",
      },
      {
        title: "Clients",
        path: "/dashboard/clients",
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
      },

];

// const user = {
//   img: "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   username: "tunde",

// }

const NavComponent = async ({menuItems}) => {
  const { user } = await auth();

//   const menuItems = [

//     {
//       title: "Profile",
//       path: `/dashboard/users/${user.id}/profile`,
//     },
//     {
//       title: "Job Openings",
//       path: "/dashboard/jobs",
//     },
//     {
//       title: "Candidates/Talent Pool",
//       path: "/dashboard/candidates",
//     },
//     {
//       title: "Interviews",
//       path: "/dashboard/interviews",
      
//     },
//     {
//       title: "Mailbox",
//       path: "/dashboard/mailbox",
//     },
//     {
//       title: "Clients",
//       path: "/dashboard/clients",
//     },
//     {
//       title: "Reports",
//       path: "/dashboard/reports",
//     },

// ];
  // const pathname = usePathname();

  return (
    <div className={styles.container}>
      {/* <div className={styles.title}>{pathname.split("/").pop()}</div> */}

      <div className={styles.navList}>
        {menuItems.map((item) => <MenuLink item={item} key={item.title} />
        )}
        
      </div>


    </div>
  );
};

export default NavComponent;
