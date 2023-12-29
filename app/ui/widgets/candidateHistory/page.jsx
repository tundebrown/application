import { FaFileDownload, FaPhoneVolume, FaUser, FaUserCircle } from "react-icons/fa";
import styles from "./page.module.css";
import { MdContentCopy, MdDateRange, MdTimelapse, MdWork } from "react-icons/md";
import IconButton from "../iconButton/page";

const CandidateHistory = ({ stage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        No History
      </div>
    </div>
  );
};

export default CandidateHistory;
