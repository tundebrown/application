"use client";

import Link from "next/link";
import styles from "./menuLink.module.css";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathname === item.path && styles.active
      }`}
    >
      <div className={styles.content}>
        <span className={styles.icon}>{item.icon}</span> <h5 className={styles.h5}>{item.title}</h5>
      </div>
    </Link>
  );
};

export default MenuLink;
