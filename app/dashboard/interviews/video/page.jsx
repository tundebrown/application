"use client"
import Image from "next/image";
import styles from "@/app/dashboard/interviews/page.module.css";
import ButtonPrimary from "@/app/ui/widgets/button/page";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
import IconButton from "@/app/ui/widgets/iconButton/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/ui/widgets/loading/page";

const Video = ({searchParams}) => {
  const [data, setData] = useState(null);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, jobs } = await fetchJobs(q, page);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/interview/video/getAllJoinedInterview', {
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

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Use 12-hour format
    });
  }

  const formattedMonthYear = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
    month: 'long',
    });
  }

  const formattedDay = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    });
  }

  if(!data){
    return (
      <div style={{display: "grid", justifyContent: "center", alignItems: "center", marginTop:"100px", flexDirection: "column"}}>
    <Loading />
      </div>
    )
  }
  return (
    <div className={styles.childContainer}>
      {(data.interviews.length === 0) ? 
      <div className={styles.noIntContent}>
        <Image width="400" height="400" src="/images/video_interview.png" alt="Interview icon"/>
        <h2>You have not scheduled any video interview</h2>

        <Link href="/dashboard/interviews/add/addVideo/">

        <ButtonSeondary>
            <MdAdd /> Schedule an Interview
        </ButtonSeondary>
        </Link>

      </div> :

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
          <Link href="/dashboard/interviews/add/addVideo">
          <ButtonSeondary>
            <MdAdd/> Add Video Interview
          </ButtonSeondary>
          </Link>
        </div>

        <div className={styles.main}>
        {data?.interviews.map((interview) => (
          <div className={styles.content} key={interview._id}>
            <div className={styles.dateContainer}>
              <div className={styles.date}>
                <span>{formattedMonthYear(((interview.startTime).toString().slice(0, 16)))}</span>
              </div>
              <div className={styles.day}>
                <span>{formattedDay(((interview.startTime).toString().slice(0, 16)))}</span>
              </div>
            </div>

            <div className={styles.intInfo}>
              <h5>{interview.postingTitle}</h5>
              <span>Client: </span>{interview.client}<br />
              <span>Candidate: </span>{`${interview.candidate.firstname} ${interview.candidate.lastname}`} <br />
              <span>Due: </span>{formattedDate(((interview.startTime).toString().slice(0, 16)))} 
            </div>

            <div className={styles.intDesc}>
              <span>No Comment Available</span>
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
        ))}
        </div>
      </div>
}
    </div>
  );
};

export default Video;
