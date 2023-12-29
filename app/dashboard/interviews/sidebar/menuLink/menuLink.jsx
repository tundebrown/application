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
      <div className={styles.icon}>{item.icon}</div>
      <div className={styles.line}></div>
      <div className={styles.content}>
        <h2>{item.title}</h2>
        <p>{item.desc}</p>
      </div>
    </Link>
  );
};

export default MenuLink;
