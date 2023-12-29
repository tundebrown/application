import styles from "./todolist.module.css";

const Todolist = () => {
  return (
    <div className={styles.container}>
      <div className={styles.interviews}>
      <h4 className={styles.title}>Open To-Dos</h4>
        No records found
      </div>
    </div>
  );
};

export default Todolist;
