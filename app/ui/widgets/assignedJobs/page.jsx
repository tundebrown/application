import { FaFileDownload, FaPhoneVolume, FaUser, FaUserCircle } from "react-icons/fa";
import styles from "./page.module.css";
import { MdContentCopy, MdDateRange, MdTimelapse, MdWork } from "react-icons/md";
import IconButton from "../iconButton/page";

const AssignedJobs = ({title, company, date, stage }) => {
  return (
    <div className={styles.container}>
      {title && 
      <div className={styles.wrapper}>
        <div className={styles.iconDetails}>
          <div className={styles.icon}>
            <MdWork />
          </div>
          <div className={styles.details}>
            <h5>{title}</h5>
            <span>{company}</span>
          </div>
        </div>
        <div className={styles.details}>
          <span><FaUserCircle /> <h5>Job Owner</h5></span>
          <span><MdTimelapse /> <p>{date?.slice(0, 10)}</p></span>
        </div>
        <div className={styles.stage}>

            <span>Hiring Stage </span> <h4>{stage}</h4>

        </div>
        <div className={styles.phone}>
          <IconButton title="Schedule an Interview">
          <MdDateRange title="Schedule an Interview"/>
          </IconButton>
        </div>
      </div>
      }
      {!title && <div>No Assigned job for this candidate</div>}
    </div>
  );
};

export default AssignedJobs;
