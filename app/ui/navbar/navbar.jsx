import MenuLink from "./menuLink/menuLink";
import styles from "./navbar.module.css";
import {
  MdSearch,
} from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "",
    list: [
      // {
      //   title: "Find Talent",
      //   path: "/page/candidate",
      // },
      {
        title: "Find Job",
        path: "/page/jobs/activejobs",
      },
      {
        title: "Why ATS",
        path: "/page/ats",
      },

    ],
  },
];

const Navbar = async () => {

  return (
    <div className={styles.container}>
      {/* <div className={styles.title}>{pathname.split("/").pop()}</div> */}
      <div className={styles.navList}>
      <div className={styles.logoContainer}>
        <Link href={"/"}>
        <Image
          className={styles.logoImage}
          src={"/atslogolight.png"}
          alt=""
          width="60"
          height="15"
          />
          </Link>
      </div>
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

          <Link href="/login">
          <button className={styles.login}>Login</button>
          </Link>
          <Link href="/signup">
          <button className={styles.signup}>SignUp</button>
          </Link>
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;
