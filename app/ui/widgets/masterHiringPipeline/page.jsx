import { FaFileDownload, FaPhoneVolume, FaUser } from "react-icons/fa";
import styles from "./page.module.css";
import { MdContentCopy } from "react-icons/md";
import Link from "next/link";

const MasterHiringPipeline = ({ candidates, targetJobId, targetStage }) => {

  console.log(targetJobId)
  const filteredCandidates = candidates?.filter(item=> ((item.hiringStage === targetStage || targetStage === '') && item.appliedJobs === targetJobId));

  return (
    <div className={styles.container}>
      {filteredCandidates?.map((candidate, index) => {
        return (
          <Link key={index} href={`/dashboard/candidates/${candidate._id}/view`} className={styles.wrapper}>
          
            <div className={styles.detailsContainer}>
              <div className={styles.icon}>
                <FaUser />
              </div>
              <div className={styles.details}>
                <h5>{`${candidate.firstname} ${candidate.lastname}`}</h5>
                <span>{candidate.email}</span>
              </div>
            </div>
            <div className={styles.resume}>
              <FaFileDownload title="View resume" />
            </div>
            <div className={styles.phone}>
              <span>
                <FaPhoneVolume /> {candidate.phone}
              </span>
              <span className={styles.copy}>
                <MdContentCopy title="Copy phone number to clipboard" />
              </span>
            </div>
            <div className={styles.stage}>

                <span>Hiring Stage: </span> <span>{candidate.hiringStage}</span>

            </div>
        
          </Link>
        );
      })}
    </div>
  );
};

export default MasterHiringPipeline;
