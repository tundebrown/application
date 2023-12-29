"use client";

import styles from "./filterItem.module.css";

const MenuLink = ({ item }) => {

  return (
    <div
      className={styles.container}
    >
        <h5 className={styles.h5}>{item.title}</h5>
    </div>
  );
};

export default MenuLink;
