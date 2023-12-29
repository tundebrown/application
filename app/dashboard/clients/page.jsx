import Image from "next/image";
import styles from "./page.module.css";
import { MdAdd, MdArrowCircleDown, MdCalendarMonth, MdOutlineDelete, MdOutlineEdit, MdOutlineViewAgenda, MdPrint, MdSearch } from "react-icons/md";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
import ButtonLight from "@/app/ui/widgets/buttonLight/page";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Link from "next/link";


const Interview = async ({searchParams}) => {

  const count = 0;
  // const { count,} = await fetchJobs(q, page);
  return (
    <div className={styles.childContainer}>
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>


        </div>
        <div className={styles.topBarRight}>
        <ButtonLight>
            Import <MdArrowCircleDown/>
          </ButtonLight>

        <ButtonLight>
            <MdCalendarMonth/>
          </ButtonLight>
          <ButtonLight>
            <MdPrint/>
          </ButtonLight>
          <div className={styles.filter}>

          </div>

<div className={styles.search}>

        </div>

        </div>
      </div>
      <div className={styles.noIntContent}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <td className={styles.bb}><input type="checkbox" /></td>
            <td className={styles.bb}>CLIENT NAME</td>
            <td className={styles.bb}>CONTACT NUMBER</td>
            <td className={styles.bb}>ACCOUNT MANAGER</td>
            <td className={styles.bb}>ACTION</td>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>
                <div className={styles.product}><input type="checkbox" /></div>
              </td>
              <td>Test Name</td>
              <td>+1 983 9383</td>
              <td>John Doe</td>
              <td>
                <div className={styles.buttons}>
                  {/* <Link href={`/dashboard/jobs/${job.id}/view`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      <MdOutlineViewAgenda />
                    </button>
                  </Link> */}
                  <Link href="">
                    <button className={`${styles.button} ${styles.edit}`}>
                      <MdOutlineEdit />
                    </button>
                  </Link>
                  <form action="">
                    <input type="hidden" name="id" value=""/>
                    <button className={`${styles.button} ${styles.delete}`}>
                      <MdOutlineDelete />
                    </button>
                  </form>
                </div>
              </td>
            </tr>

        </tbody>
      </table>
      <Pagination count={count} />
      </div>
    </div>
  );
};

export default Interview;
