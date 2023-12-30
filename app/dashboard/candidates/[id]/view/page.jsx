"use client"
import ButtonLight from "@/app/ui/widgets/buttonLight/page";
import React, { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/jobs/viewJob/viewJob.module.css";
import {
  MdAssignmentInd,
  MdDelete,
  MdEdit,
  MdEmail,
  MdOutlineKeyboardArrowDown,
  MdSchedule,
  MdWork,
} from "react-icons/md";
import IconButton from "@/app/ui/widgets/iconButton/page";
import ButtonPrimary from "@/app/ui/widgets/button/page";
import PipelineButton from "@/app/ui/widgets/pipelineButton/page";
import MasterHiringPipeline from "@/app/ui/widgets/masterHiringPipeline/page";
import { FaPhoneVolume, FaUser } from "react-icons/fa";
import DropdownButton from "@/app/ui/widgets/dropDownButton/page";
import CandidateDetails from "@/app/ui/component/candidateDetails/page";
import AssignedJobs from "@/app/ui/widgets/assignedJobs/page";
import CandidateHistory from "@/app/ui/widgets/candidateHistory/page";
import Loading from "@/app/ui/widgets/loading/page";
import axios from "axios";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";

const View = ({params}) => {
    const dropdownOptions = ['Applied', 'Interview Scheduled', 'Interview Not Attended', 'Interview Rescheduled', 'Rejected', 'On Hold', 'Selected', 'Offered'];
  const [activeComponent, setActiveComponent] = useState('allDetails');


  const { id } = params;
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`/api/candidate/getCandidate/${id}`);
        setCandidate(response.data);
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidate();
  }, [id]);


  const jobId = candidate?.appliedJobs;
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/job/getJob/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [jobId]);



  const handleButtonClick = (componentName) => {
    // Set the active component based on the button click
    setActiveComponent(componentName);
  };



  if (!candidate) {
    return <Loading />;
  }


  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h5>Candidate </h5>
        <div className={styles.topBarButtons}>
          <ButtonLight>
            Request Updated Profile
          </ButtonLight>
          <IconButton><MdEdit title="Edit Candidate"/></IconButton>
              <IconButton><MdDelete title="Delete Candidate"/></IconButton>
              <IconButton><MdWork title="Assign Candidate to a Job"/></IconButton>
        </div>
      </div>
      <div className={styles.jobTitleContainer}>
        <div className={styles.jobTitleContent}>
          <div className={styles.jobIcon} style={{backgroundColor: "#cce6ff"}}>
            <FaUser style={{color: "#003366"}}/>
          </div>
          <div className={styles.jobTitle}>
            <div className={styles.title}>
              <h3>{`${candidate.firstname} ${candidate.lastname}`}</h3>
            </div>
            <div className={styles.desc}>
              <span>
                <MdEmail /> {candidate.email}
              </span>
              <span>
              <FaPhoneVolume /> {candidate.phone}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.otherDetails}>
          <div className={styles.owner}>
            <span>Current Stage: </span> <span style={{color: "#0066cc"}}>{candidate.hiringStage}</span>
          </div>
          <div className={styles.date}>
          <ButtonPrimary><MdSchedule /> Schedule an Interview</ButtonPrimary>
          <ButtonSeondary><MdAssignmentInd /> Assign Candidate to Job</ButtonSeondary>
          {/* <DropdownButton options={dropdownOptions}>Assign Candidate <MdOutlineKeyboardArrowDown /></DropdownButton> */}
          </div>
        </div>
      </div>
      <div className={styles.candidatePipeline}>

        <div className={styles.hiringPipeline}>

          <div className={styles.pipelineNav}>
            <PipelineButton onclick={() => handleButtonClick('allDetails')} activeComponent={activeComponent} componentName="allDetails">
              All Details
            </PipelineButton>

            <PipelineButton onclick={() => handleButtonClick('applied')} activeComponent={activeComponent} componentName="applied">
              Assigned Jobs
            </PipelineButton>

            <PipelineButton onclick={() => handleButtonClick('interviewScheduled')} activeComponent={activeComponent} componentName="interviewScheduled">
              Candidate History
            </PipelineButton>
          </div>
<div>

          {/* Conditionally render the active component */}
          {/* <MasterHiringPipeline>Page</MasterHiringPipeline> */}
      {activeComponent === 'allDetails' && <CandidateDetails workExperiences={candidate?.workExperience} educationHistory={candidate.educationHistory} id={id}/>}
      {activeComponent === 'applied' && <AssignedJobs title={job?.title} date={job?.targetDate} company={job?.companyName} stage={candidate.hiringStage}/>}
      {activeComponent === 'interviewScheduled' && <CandidateHistory stage={activeComponent}/>}
</div>
        </div>
      </div>
    </div>
  );
};

export default View;
