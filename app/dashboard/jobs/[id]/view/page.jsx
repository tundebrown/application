"use client";
import ButtonLight from "@/app/ui/widgets/buttonLight/page";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/app/ui/dashboard/jobs/viewJob/viewJob.module.css";
import {
  MdArrowDropDown,
  MdArrowRight,
  MdArrowRightAlt,
  MdCopyAll,
  MdDelete,
  MdDocumentScanner,
  MdEdit,
  MdFacebook,
  MdKeyboardArrowRight,
  MdLocationCity,
  MdLocationPin,
  MdSupervisedUserCircle,
  MdTimer,
  MdWork,
  MdWorkspaces,
} from "react-icons/md";
import IconButton from "@/app/ui/widgets/iconButton/page";
import ButtonPrimary from "@/app/ui/widgets/button/page";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
import PipelineButton from "@/app/ui/widgets/pipelineButton/page";
import MasterHiringPipeline from "@/app/ui/widgets/masterHiringPipeline/page";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Loading from "@/app/ui/widgets/loading/page";
import Link from "next/link";

const View = ({ params }) => {
  const [activeComponent, setActiveComponent] = useState("allCandidates");
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = params;
  const [job, setJob] = useState(null);

  const [data, setData] = useState(null);
  const q = "";
  const page = 1;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/job/getJob/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);


  
  // const { count, candidates } = await fetchCandidates(q, page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/candidate/getCandidates', {
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
  }, []);

  console.log(data)

  let pipeline;
  if (job?.hiringPipeline === "masterPipeline") {
    pipeline = "Master Hiring Pipeline";
  } else {
    pipeline = "Custom Hiring Pipeline";
  }

  const handleButtonClick = (componentName) => {
    // Set the active component based on the button click
    setActiveComponent(componentName);
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(`https://application-black-nine.vercel.app/page/jobs/activejobs/apply/${id}`)
      .then(() => {
        console.log('Text copied to clipboard:', id);
        alert(`Copied successfully`);
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard', err);
      });
  };

  if (!job) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h5>Job Id</h5>
        <div className={styles.topBarButtons}>
          <ButtonLight onclick={()=>copyToClipboard(id)}>
            <MdCopyAll /> Copy Job Application URL
          </ButtonLight>
          <IconButton>
            <MdEdit />
          </IconButton>
        </div>
      </div>
      <div className={styles.jobTitleContainer}>
        <div className={styles.jobTitleContent}>
          <div className={styles.jobIcon}>
            <MdWork />
          </div>
          <div className={styles.jobTitle}>
            <div className={styles.title}>
              <h3>{job.title}</h3>
            </div>
            <div className={styles.desc}>
              <span>
                <MdLocationCity /> {job.companyName}
              </span>
              <span>
                <MdLocationPin /> State/City{" "}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.otherDetails}>
          <div className={styles.owner}>
            <span className={styles.status}>
              {job.status} <MdArrowDropDown />
            </span>
            <span className={styles.dateCreated}>
              <MdTimer /> <h4>{job.createdAt?.toString().slice(0, 10)}</h4>
            </span>
          </div>
          <div className={styles.date}>
            Share on:{" "}
            <IconButton>
              <MdFacebook />
            </IconButton>{" "}
            <IconButton>
              <FaLinkedin />
            </IconButton>{" "}
            <IconButton>
              <FaTwitter />
            </IconButton>
            Action:{" "}
            <IconButton>
              <MdEdit title="Edit Job" />
            </IconButton>{" "}
            <IconButton>
              <MdDelete title="Delete Job" />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={styles.jobDescContainer}>
        <div className={styles.jobDescTitle}>
          <h4>{job.Desc}</h4>
        </div>
        <div className={styles.jobDescWrapper}>
          <div className={styles.jobDesc}>
            <div className={styles.jobDescPane}>
              <div className={styles.jobDescContent}>
                <h4>Workplace module</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.workplaceModule}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Minimum Experience</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.minExperience}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Maximum Experience</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.maxExperience}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Educational Qualification</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.educationQualification}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Job Type</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.jobType}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Skills</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.skills}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Job Description</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>
              <MdDocumentScanner onClick={() => setModalVisible(true)} style={{fontSize:"20px", cursor:"pointer", color:"#6699ff"}}/>
            </span>
              </div>
              {modalVisible && (
            <Description
              onClose={() => setModalVisible(false)}
              description={job.jobDesc}
              title={job.title}
            />
          )}
            </div>
            <div className={styles.jobDescPane}>
              <div className={styles.jobDescContent}>
                <h4>Educational Specialization</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.educationSpecialization}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Address</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.address}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>State</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.state}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Country</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.country}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Company Name</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{job.companyName}</span>
              </div>
              <div className={styles.jobDescContent}>
                <h4>Salary Range</h4>
              </div>
              <div className={styles.jobDescContent}>
                <span>{`\$${job.minSalary} - \$${job.maxSalary}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.candidatePipeline}>
        <div className={styles.miniNav}>
          <div className={styles.miniNavItem}>
            <span>Candidates Pipeline</span>
          </div>
        </div>

        <div className={styles.submitCandidate}>
          <div>
            <span>
              Submit resume and details of candidates with your client contact
            </span>
          </div>
          <div className={styles.submitCandidateButtons}>
            {/* <ButtonPrimary>Parse & Assign</ButtonPrimary> */}
            <Link href="/dashboard/interviews/add">
            <ButtonSeondary><MdTimer/> Schedule Interview</ButtonSeondary>
            </Link>
            <ButtonSeondary>Submit Candidates</ButtonSeondary>
          </div>
        </div>

        <div className={styles.hiringPipeline}>
          <div>
            <span>Hiring Pipeline Associated With This Job: {pipeline}</span>
          </div>

          <div className={styles.pipelineNav}>
            <PipelineButton
              onclick={() => handleButtonClick("allCandidates")}
              activeComponent={activeComponent}
              componentName="allCandidates"
            >
              All Candidates
            </PipelineButton>
            <MdArrowRight />
            {job.hiringStages.map((stage, index) => {
              if (stage !== null) {
                return (
                  <PipelineButton
                    onclick={() => handleButtonClick(stage)}
                    activeComponent={activeComponent}
                    componentName={stage}
                    key={index}
                  >
                    {stage} <MdKeyboardArrowRight />
                  </PipelineButton>
                );
              }
            })}
            {/* <PipelineButton onclick={() => handleButtonClick('applied')} activeComponent={activeComponent} componentName="applied">
              Applied
            </PipelineButton>
            <MdArrowRight />
            <PipelineButton onclick={() => handleButtonClick('contacted')} activeComponent={activeComponent} componentName="contacted">
              Contacted
            </PipelineButton>
            <MdArrowRight />
            <PipelineButton onclick={() => handleButtonClick('interviewScheduled')} activeComponent={activeComponent} componentName="interviewScheduled">
              Interview Scheduled
            </PipelineButton>
            <MdArrowRight />
            <PipelineButton onclick={() => handleButtonClick('interviewNotAttended')} activeComponent={activeComponent} componentName="interviewNotAttended">
              Interview Not Attended
            </PipelineButton>
            <MdArrowRight />
            <PipelineButton onclick={() => handleButtonClick('interviewRescheduled')} activeComponent={activeComponent} componentName="interviewRescheduled">
              Interview Rescheduled
            </PipelineButton>
            <MdArrowRight />
            <PipelineButton onclick={() => handleButtonClick('rejected')} activeComponent={activeComponent} componentName="rejected">
              Rejected
            </PipelineButton>
            <MdArrowRight />
            <PipelineButton onclick={() => handleButtonClick('onHold')} activeComponent={activeComponent} componentName="onHold">
              On Hold
            </PipelineButton>
            <MdArrowRight />
            <PipelineButton onclick={() => handleButtonClick('selected')} activeComponent={activeComponent} componentName="selected">
              Selected
            </PipelineButton>
            <MdArrowRight />
            <PipelineButton onclick={() => handleButtonClick('offered')} activeComponent={activeComponent} componentName="offered">
              Offered
            </PipelineButton> */}
          </div>
          <div>
            {/* Conditionally render the active component */}
            {/* <MasterHiringPipeline>Page</MasterHiringPipeline> */}
            {activeComponent === "allCandidates" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage=""/>
            )}
            {activeComponent === "applied" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent} />
            )}
            {activeComponent === "contacted" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent} />
            )}
            {activeComponent === "interviewScheduled" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent}/>
            )}
            {activeComponent === "interviewNotAttended" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent} />
            )}
            {activeComponent === "interviewRescheduled" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent} />
            )}
            {activeComponent === "rejected" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent} />
            )}
            {activeComponent === "onHold" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent} />
            )}
            {activeComponent === "selected" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent} />
            )}
            {activeComponent === "offered" && (
              <MasterHiringPipeline candidates={data?.candidates} targetJobId={id} targetStage={activeComponent} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Description = ({ onClose, description, title }) => {
  return (
    <div className={styles.modal}>
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <h3>Description of {title}</h3>
        <div className={styles.modalLine}></div>
        <div className={styles.workInputContainer}>
        <div dangerouslySetInnerHTML={{ __html: description }}/>
          <div className={styles.workInputButton}>
              <ButtonLight onclick={onClose}>Close</ButtonLight>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
};

export default View;
