import styles from "./card.module.css";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.texts}>
        <div className={styles.textsItemOne}>
          <span className={styles.number}>{item.number}</span>
          <span className={styles.title}>{item.title}</span>
        </div>
        <div className={styles.detail} style={{color: `${item.color}`}}>
          <div className={styles.detailContent}>

          {item.icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
