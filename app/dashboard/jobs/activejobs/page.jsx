"use client"
import Link from "next/link";
import styles from "@/app/ui/dashboard/jobs/activejobs/activejobs.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
// import { deleteJob } from "@/app/lib/actions";
// import { fetchJobs } from "@/app/lib/data";
import {
  MdLocationCity,
  MdOutlineArrowForward,
  MdOutlineDelete,
  MdOutlineMenu,
  MdOutlineViewAgenda,
  MdWork,
} from "react-icons/md";
import Image from "next/image";
import Loading from "@/app/ui/widgets/loading/page";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useState } from "react";

const ActiveJobsPage = ({ searchParams }) => {
  // const q = searchParams?.q || "";
  // const page = searchParams?.page || 1;
  // const { count, jobs } = await fetchJobs(q, page);

  const [jobs, setJobs] = useState(null);
  const [count, setCount] = useState(null);
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

        setJobs(response.data.jobs);
        setCount(response.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [q, page]);

  if(!jobs){
    return <Loading/>
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <h3>Filter By</h3>
        <div className={styles.lFilter}>
          <div className={styles.lFilterHeader}>
            <h4>Skills</h4>
            <span className={styles.lFilterLink}>CLEAR</span>
          </div>
          <div className={styles.lFilterContent}>
            <div className={styles.lFilterContentItem}>
              <input type="checkbox" />
              <p>UX Design</p>
            </div>
            <div className={styles.lFilterContentItem}>
              <input type="checkbox" />
              <p>Frontend/Fullstack Development</p>
            </div>
            <div className={styles.lFilterContentItem}>
              <input type="checkbox" />
              <p>Backend Development</p>
            </div>
            <div className={styles.lFilterContentItem}>
              <input type="checkbox" />
              <p>Branding & Graphic</p>
            </div>
            <span className={styles.lFilterLink}>MORE</span>
          </div>
        </div>
        <div className={styles.lFilter}>
          <div className={styles.lFilterHeader}>
            <h4>Total Experience</h4>
          </div>
          <div className={styles.lFilterContent}>
            <div
              className={styles.lFilterContentItem}
              style={{ justifyContent: "space-between", width: "80%" }}
            >
              <div>
                <p>1</p>
              </div>
              <div>
                <p>30</p>
              </div>
            </div>
            <input
              type="range"
              id="lineRange"
              min="0"
              max="30"
              step="1"
              style={{ width: "80%", color: "blue", backgroundColor: "blue" }}
              //   value={value}
              //   onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.lFilter}>
          <div className={styles.lFilterHeader}>
            <h4>Preferred Cities</h4>
            <span className={styles.lFilterLink}>CLEAR</span>
          </div>
          <div className={styles.lFilterContent}>
            <div className={styles.lFilterContentItem}>
              <input type="checkbox" />
              <p>Bengaluru</p>
            </div>
            <div className={styles.lFilterContentItem}>
              <input type="checkbox" />
              <p>Mumbai</p>
            </div>
            <div className={styles.lFilterContentItem}>
              <input type="checkbox" />
              <p>Delhi NCR</p>
            </div>
            <div className={styles.lFilterContentItem}>
              <input type="checkbox" />
              <p>Hyberabad</p>
            </div>
            <span className={styles.lFilterLink}>MORE</span>
          </div>
        </div>
      </div>
      <div className={styles.rightPane}>
        <div className={styles.top}>
          <div>
            <h2>
              Find your dream job!
            </h2>
          </div>
          <div className={styles.filter}>
            <Search placeholder="Search for a job..." />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <label htmlFor="">SORT BY</label>
              <select name="" id="" className={styles.otherButton}>
                <option value="">Latest</option>
                <option value="">Oldest</option>
              </select>
            </div>
            <button className={styles.otherButton}>
              <MdOutlineMenu />
            </button>
            {/* <button className={styles.otherButton}>
                <MdInfo /> Jobs Page
              </button> */}

            {/* <Link href="/dashboard/jobs/add">
              <button className={styles.addButton}>
                <MdAdd /> Create New Job
              </button>
            </Link> */}
          </div>
        </div>

        <div className={styles.rightContentWrapper}>
        {jobs.map((job) => (
          <Link className={styles.findDreamJob} key={job.id} href={`/dashboard/jobs/activejobs/apply/${job._id}`}>
              
          <div className={styles.rightContent}>
            <div className={styles.rightContentLogo}>
              <Image
                src={job?.companyLogo || "/noavatar.png"}
                alt=""
                width="100"
                height="50"
                />
            </div>
            <div className={styles.rightContentDesc}>
              <h4>{job.title}</h4>
              <p>{job.companyName}</p>
            </div>
            <div className={styles.rightContentDesc2}>
              <div className={styles.rightContenDescContainer}>
                <div className={styles.rightContentDescContent}>
                  <MdWork /> {job.minExperience} To {job.maxExperience} Years
                </div>
                <div>
                  <MdLocationCity /> {job.location}
                </div>
              </div>
              <div className={styles.rightContentArrow}>
                <MdOutlineArrowForward />
              </div>
            </div>
          </div>
                </Link>
        ))}
        </div>

        <Pagination count={count} />
      </div>
    </div>
  );
};

export default ActiveJobsPage;
