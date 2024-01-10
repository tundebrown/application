import React from "react";
import styles from "./page.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingText}>
          {/* <span>LOADING</span> */}
        </div>
        <div className={styles.loadingContent}></div>
      </div>
    </div>
  );
};

export default Loading;
