import Image from "next/image";
import styles from "@/app/dashboard/interviews/page.module.css";
import ButtonPrimary from "@/app/ui/widgets/button/page";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
import IconButton from "@/app/ui/widgets/iconButton/page";
import Link from "next/link";

const Interview = () => {
  return (
    <div className={styles.childContainer}>
      <div className={styles.noIntContent}>
        <Image width="600" height="250" src="/images/interview.png" alt="Interview icon"/>
        <h2>You have not scheduled any formal interview</h2>

        <Link href="/dashboard/interviews/add">
        <ButtonSeondary>
            <MdAdd /> Schedule an Interview
        </ButtonSeondary>
        </Link>

      </div>

      <div className={styles.intContent}>
        <div className={styles.topBar}>
          <div className={styles.filter}>

            <p>Fiter By Date: </p> 
            <select name="" id="" className={styles.filterSelect}>
              <option value="">All Time</option>
              <option value="">Today</option>
              <option value="">Tomorrow</option>
              <option value="">Yesterday</option>
              <option value="">This Week</option>
              <option value="">Last Week</option>
              <option value="">This Month</option>
              <option value="">Last Month</option>
              <option value="">Custom Range</option>
            </select>
          </div>
          <Link href="/dashboard/interviews/add">
          <ButtonSeondary>
            <MdAdd/> Add Formal Interview
          </ButtonSeondary>
          </Link>
        </div>

        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.dateContainer}>
              <div className={styles.date}>
                <span>Dec 2023</span>
              </div>
              <div className={styles.day}>
                <span>10</span>
              </div>
            </div>

            <div className={styles.intInfo}>
              <h5>Posting Title</h5>
              <span>Client: </span>client name <br />
              <span>Candidate: </span>Candidate name <br />
              <span>Due: </span>Dec 20, 2023 12:43pm
            </div>

            <div className={styles.intDesc}>
              <span>No Comments available</span>
            </div>

            <div className={styles.action}>
              <IconButton>
                <MdEdit/>
              </IconButton>
              <IconButton>
                <MdDelete/>
              </IconButton>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Interview;
