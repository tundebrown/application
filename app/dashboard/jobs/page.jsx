"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import styles from "@/app/ui/dashboard/jobs/jobs.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { deleteJob } from "@/app/lib/actions";
// import { fetchJobs } from "@/app/lib/data";
import {
  MdAdd,
  MdCopyAll,
  MdInfo,
  MdOutlineArrowDropDown,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineMenu,
  MdOutlineViewAgenda,
} from "react-icons/md";
import ButtonLight from "@/app/ui/widgets/buttonLight/page";
import Loading from '@/app/ui/widgets/loading/page';

// const jobs = [{
//   jobOpeningId: "ATP_f39dd736-12db-4eb2-b0ab-d3b53b19922c",
//   title: "Full Stack web developer",
//   jobDesc: "Full Stack web developer",
//   recruiter: "Anarchy",
//   targetDate: "2023-11-18T00:00:00.000+00:00",
//   clientName: "Metajest",
//   status: "active",
//   contactName: "Tunde Olupitan",
//   minExperience: "3",
//   maxExperience: "9",
//   skills: "Nodejs, React, MongoDB",
//   jobType: "fulltime",
//   minSalary: "2000",
//   maxSalary: "4000",
//   location: "Dubai",
//   workplaceModule: "Remote",
//   phone: "+07082355115",
//   companyName: "ATS",
//   companyWebsite: "ats.com",
//   companyLogo: "/nologo.png",
//   createdAt: "2023-11-15T08:04:52.978+00:00",
//   updatedAt: "2023-11-15T08:04:52.978+00:00",
// }];

const JobsPage = ({ searchParams }) => {
  const [data, setData] = useState(null);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, jobs } = await fetchJobs(q, page);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/job/getJobs', {
          params: {
            q: q, // replace with your actual query
            page: page, // replace with the desired page number
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [q, page]);

  const textToCopy = data?.jobs.jobOpeningId;

  const copyToClipboard = (jobId) => {
    navigator.clipboard.writeText(`https://application-black-nine.vercel.app/page/jobs/activejobs/apply/${jobId}`)
      .then(() => {
        console.log('Text copied to clipboard:', jobId);
        alert(`Copied successfully`);
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard', err);
      });
  };

  if (!data) {
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h4>
            All Job Openings <MdOutlineArrowDropDown />
          </h4>
        </div>
        <div className={styles.filter}>
          <Search placeholder="Search for a job..." />
          <button className={styles.otherButton}>
            <MdOutlineMenu />
          </button>
          <Link href="/dashboard/jobs/activejobs">
            <button className={styles.otherButton}>
              <MdInfo /> Jobs Page
            </button>
          </Link>
          <Link href="/dashboard/jobs/add">
            <button className={styles.addButton}>
              <MdAdd /> Create New Job
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.scrollableTableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <td className={styles.bb}>TITLE</td>
              <td className={styles.bb}>RECRUITER</td>
              <td className={styles.bb}>TARGET DATE</td>
              <td className={styles.bb}>CLIENT NAME</td>
              <td className={styles.bb}>STATUS</td>
              <td className={styles.bb}>DATE CREATED</td>
              <td className={styles.bb}>JOB APPLICATION URL</td>
              <td className={styles.bb}>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {data?.jobs.map((job) => (
              <tr key={job._id}>
                <td>
                <Link href={`/dashboard/jobs/${job._id}/view`}>

                  {job.title}
                </Link>
                  </td>
                <td>{job.recruiter}</td>
                <td>{job.targetDate?.toString().slice(0, 10)}</td>
                <td>{job.clientName}</td>
                <td>{job.status}</td>
                <td>{job.createdAt?.toString().slice(0, 10)}</td>
                <td>
                  <ButtonLight className="copy-button" onclick={()=>copyToClipboard(job._id)}>
                    <MdCopyAll /> Copy Job Application URL
                  </ButtonLight>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/jobs/${job._id}/view`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        <MdOutlineViewAgenda />
                      </button>
                    </Link>
                    <Link href={`/dashboard/jobs/${job._id}`}>
                      <button className={`${styles.button} ${styles.edit}`}>
                        <MdOutlineEdit />
                      </button>
                    </Link>
                    <form action={deleteJob}>
                      <input type="hidden" name="id" value={job._id} />
                      <button className={`${styles.button} ${styles.delete}`}>
                        <MdOutlineDelete />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination count={data.count} />
    </div>
  );
};

export default JobsPage;
