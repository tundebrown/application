"use client";

import Link from "next/link";
import styles from "./menuLink.module.css";
import { usePathname } from "next/navigation";


const MenuLink = ({ item }) => {
  const pathname = usePathname();
  const page = pathname.split("/").pop()
  {/* <div className={styles.title}>{pathname.split("/").pop()}</div> */}

  return (
    <>
      <Link
        href={item.path}
        className={`${styles.container} ${
          pathname === item.path && styles.active
        }`}
      >
        {item.title}
      </Link>
    </>
  );
};

export default MenuLink;
