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
  MdVideoCall,
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
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Image from "next/image";

const View = ({ params }) => {
  const [activeComponent, setActiveComponent] = useState("allCandidates");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleInt, setModalVisibleInt] = useState(false);
  const [modalVisibleVid, setModalVisibleVid] = useState(false);
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

            <ButtonSeondary onclick={() => setModalVisibleInt(true)}><MdTimer/> Schedule Formal Interview</ButtonSeondary>
            <ButtonSeondary onclick={() => setModalVisibleVid(true)}><MdVideoCall /> Schedule Video Interview</ButtonSeondary>

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
      {modalVisibleInt && (
            <ScheduleFormalInterview
              onClose={() => setModalVisibleInt(false)}
            />
          )}
                {modalVisibleVid && (
            <ScheduleVideoInterview
              onClose={() => setModalVisibleVid(false)}
            />
          )}
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

const ScheduleFormalInterview = ({onClose}) => {
  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");
  const [formData, setFormData] = useState({});
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [accountManager, setAccountManager] = useState([]);
  const [selectedAccountManager, setSelectedAccountManager] = useState(null);
  const [intName, setIntName] = useState("");
  const [location, setLocation] = useState("");
  const [postingTitle, setPostingTitle] = useState("");
  const [interviewOwner, setInterviewOwner] = useState("");
  const [comment, setComment] = useState("");

  const handleFromdate = (e) => {
    setFromDate(e.target.value);
  };

  const handleFromtime = (e) => {
    setFromTime(e.target.value);
  };
  const handleTodate = (e) => {
    setToDate(e.target.value);
  };

  const handleTotime = (e) => {
    setToTime(e.target.value);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/client/getAllClients"); // Replace with your API endpoint
        const clients = response.data;
        // Transform data to match react-select's expected format (value, label)
        const formattedOptions = clients.clients.map((client) => ({
          value: client._id,
          label: client.username,
        }));

        setClients(formattedOptions);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (selectedClient) => {
    setSelectedClient(selectedClient);
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get("/api/candidate/getCandidates"); // Replace with your API endpoint
        const candidates = response.data;
        // Transform data to match react-select's expected format (value, label)
        const formattedOptions = candidates.candidates.map((candidate) => ({
          value: candidate._id,
          label: `${candidate.firstname} ${candidate.lastname}: ${candidate.hiringStage}`,
        }));

        setCandidates(formattedOptions);
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidate();
  }, []);

  const handleCandidateSelect = (selectedCandidate) => {
    setSelectedCandidate(selectedCandidate);
  };

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user/getUsers"); // Replace with your API endpoint
        const users = response.data;
        // Transform data to match react-select's expected format (value, label)
        const formattedOptions = users.users.map((user) => ({
          value: user._id,
          label: user.username,
        }));
        
        setAccountManager(formattedOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    fetchUsers();
  }, []);
  
  const handleChange = (selectedAccountManager) => {
    setSelectedAccountManager(selectedAccountManager);
  };

  const handleSaveInterview = async  (e) => {
    e.preventDefault();
    if (
      intName === "" ||
      selectedClient.value === "" ||
      location === "" ||
      selectedCandidate.value === "" ||
      postingTitle === "" ||
      selectedAccountManager.value === "" ||
      comment === "" 
    ) {
      alert("Please fill all fields");
      return;
    }
    

    try {
      // Send data to Next.js API
      const response = await axios.post('/api/interview/createInterview', {interviewName:intName, client:selectedClient.value, candidate:selectedCandidate.value, postingTitle:postingTitle, startTime:`${fromDate}T${fromTime}`, endTime:`${toDate}T${toTime}`, location:location, interviewOwner:selectedAccountManager.value, comment:comment});
      // alert(response.data.data);
      toast(response.data.data);
    } catch (error) {
      console.error('Error creating formal interview:', error);
      alert('Error creating formal interview');
    }
  };

  return (
    <div className={styles.modal}>
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}style={{width:"80%"}}>
        <h3>Add Formal Interview</h3>
        <div className={styles.modalLine}></div>
        <div className={styles.workInputContainer}>
        <form onSubmit={handleSaveInterview}>
        <div className={styles.formContainer}>
          <div className={styles.leftpane}>
            <div className={styles.inputField}>
              <label htmlFor="intName">Interview Name</label>
              <select name="intName" id="intName" onChange={(e) => setIntName(e.target.value)} required>
                <option value="General Interview">General Interview</option>
                <option value="External Interview">External Interview</option>
                <option value="Internal Interview">Internal Interview</option>
              </select>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="clientName">Client</label>
              <Select
                className={styles.select}
                options={clients}
                isSearchable
                placeholder="Select Client"
                value={selectedClient}
                onChange={handleClientSelect}
                required
              />
              <input type="hidden" name="clientName" id="clientName" />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="dateFrom">From</label>
              <input
                className={styles.date}
                type="date"
                onChange={handleFromdate}
                required
              />
              <input
                className={styles.date}
                type="time"
                onChange={handleFromtime}
                required
                style={{width:"18%"}}
              />
              <input
                type="hidden"
                value={`${fromDate}T${fromTime}`}
                name="startTime"
              />

              <label htmlFor="dateTo" style={{width:"2%"}}>To</label>

              <input
                className={styles.date}
                type="time"
                onChange={handleTotime}
                required
                style={{width:"18%"}}
              />
              <input
                type="hidden"
                value={`${fromDate}T${fromTime}`}
                name="endTime"
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="location">Location</label>
              <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
            </div>
          </div>

          <div className={styles.rightpane}>
            <div className={styles.inputField}>
              <label htmlFor="candidateName">Candidate</label>
              <Select
                className={styles.select}
                options={candidates}
                isSearchable
                placeholder="Select Candidate"
                value={selectedCandidate}
                onChange={handleCandidateSelect}
                required
              />
              <input type="hidden" name="candidateName" id="candidateName" />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="postingTitle">Posting Title</label>
              <input type="text" name="postingTitle" id="postingTitle" value={postingTitle} onChange={(e) => setPostingTitle(e.target.value)} required/>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="interviewOwner">Interview Owner</label>
              <Select
              className={styles.select}
                options={accountManager}
                isSearchable
                placeholder="Select Recruiter"
                value={selectedAccountManager}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="comment">Comment</label>
              <input type="text" name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required/>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <ButtonPrimary type="submit">Save</ButtonPrimary>
          <Link href="/dashboard/interviews">
            <ButtonLight type="button">Cancel</ButtonLight>
          </Link>
        </div>
      </form>
      <ToastContainer />
      <div className={styles.workInputButton}>
              <ButtonLight onclick={onClose}>Close</ButtonLight>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

const ScheduleVideoInterview = ({onClose}) => {
  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");
  const [formData, setFormData] = useState({});
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [accountManager, setAccountManager] = useState([]);
  const [selectedAccountManager, setSelectedAccountManager] = useState(null);
  const [provider, setProvider] = useState("Google Meet");
  const [intName, setIntName] = useState("");
  const [location, setLocation] = useState("");
  const [postingTitle, setPostingTitle] = useState("");
  const [interviewOwner, setInterviewOwner] = useState("");
  const [comment, setComment] = useState("");

  const handleFromdate = (e) => {
    setFromDate(e.target.value);
  };

  const handleFromtime = (e) => {
    setFromTime(e.target.value);
  };
  const handleTodate = (e) => {
    setToDate(e.target.value);
  };

  const handleTotime = (e) => {
    setToTime(e.target.value);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/client/getAllClients"); // Replace with your API endpoint
        const clients = response.data;
        // Transform data to match react-select's expected format (value, label)
        const formattedOptions = clients.clients.map((client) => ({
          value: client._id,
          label: client.username,
        }));

        setClients(formattedOptions);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (selectedClient) => {
    setSelectedClient(selectedClient);
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get("/api/candidate/getCandidates"); // Replace with your API endpoint
        const candidates = response.data;
        // Transform data to match react-select's expected format (value, label)
        const formattedOptions = candidates.candidates.map((candidate) => ({
          value: candidate._id,
          label: `${candidate.firstname} ${candidate.lastname}: ${candidate.hiringStage}`,
        }));

        setCandidates(formattedOptions);
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidate();
  }, []);

  const handleCandidateSelect = (selectedCandidate) => {
    setSelectedCandidate(selectedCandidate);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user/getUsers"); // Replace with your API endpoint
        const users = response.data;
        // Transform data to match react-select's expected format (value, label)
        const formattedOptions = users.users.map((user) => ({
          value: user._id,
          label: user.username,
        }));

        setAccountManager(formattedOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (selectedAccountManager) => {
    setSelectedAccountManager(selectedAccountManager);
  };

  const handleSaveInterview = async (e) => {
    e.preventDefault();
    console.log(provider)
    if (
      intName === "" ||
      selectedClient.value === "" ||
      provider === "" ||
      selectedCandidate.value === "" ||
      postingTitle === "" ||
      selectedAccountManager.value === "" ||
      comment === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Send data to Next.js API
      const response = await axios.post("/api/interview/video/createInterview", {
        interviewName: intName,
        client: selectedClient.value,
        candidate: selectedCandidate.value,
        postingTitle: postingTitle,
        startTime: `${fromDate}T${fromTime}`,
        endTime: `${toDate}T${toTime}`,
        provider: provider,
        interviewOwner: selectedAccountManager.value,
        comment: comment,
      });
      // alert(response.data.data);
      toast(response.data.data);
    } catch (error) {
      console.error("Error creating formal interview:", error);
      alert("Error creating formal interview");
    }
  };
  return(
    <div className={styles.modal}>
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}style={{width:"80%"}}>
        <h3>Add Video Interview</h3>
        <div className={styles.modalLine}></div>
        <div className={styles.workInputContainer}>
        <form onSubmit={handleSaveInterview}>
        <div className={styles.formContainer}>
          <div className={styles.leftpane}>
          <div className={styles.inputField}>
              <label htmlFor="intName">Interview Name</label>
              <select name="intName" id="intName" onChange={(e) => setIntName(e.target.value)} required>
                <option value="Structured Interview">Structured Interview</option>
                <option value="Technical Interview">Technical Interview</option>
                <option value="Behavioral Interview">Behavioral Interview</option>
              </select>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="clientName">Client</label>
              <Select
                className={styles.select}
                options={clients}
                isSearchable
                placeholder="Select Client"
                value={selectedClient}
                onChange={handleClientSelect}
                required
              />
              <input type="hidden" name="clientName" id="clientName" />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="provider">Provider</label>
              <select name="provider" id="provider" onChange={(e) => setProvider(e.target.value)} required>
                <option value="Google Meet">Google Meet</option>
              </select>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="dateFrom">From</label>
              <input
                className={styles.date}
                type="date"
                onChange={handleFromdate}
                required
              />
              <input
                className={styles.date}
                type="time"
                onChange={handleFromtime}
                required
                style={{width:"18%"}}
              />
              <input
                type="hidden"
                value={`${fromDate}T${fromTime}`}
                name="startTime"
              />

              <label htmlFor="dateTo" style={{width:"2%"}}>To</label>

              <input
                className={styles.date}
                type="time"
                onChange={handleTotime}
                required
                style={{width:"18%"}}
              />
              <input
                type="hidden"
                value={`${fromDate}T${fromTime}`}
                name="endTime"
              />
            </div>
          </div>

          <div className={styles.rightpane}>
            <div className={styles.inputField}>
              <label htmlFor="candidateName">Candidate</label>
              <Select
                className={styles.select}
                options={candidates}
                isSearchable
                placeholder="Select Candidate"
                value={selectedCandidate}
                onChange={handleCandidateSelect}
                required
              />
              <input type="hidden" name="candidateName" id="candidateName" />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="postingTitle">Posting Title</label>
              <input type="text" name="postingTitle" id="postingTitle" value={postingTitle} onChange={(e) => setPostingTitle(e.target.value)} required/>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="interviewOwner">Interview Owner</label>
              <Select
              className={styles.select}
                options={accountManager}
                isSearchable
                placeholder="Select Recruiter"
                value={selectedAccountManager}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="comment">Comment</label>
              <input type="text" name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required/>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="attachment"></label>
              <ButtonLight>
                {" "}
                <Image
                  src="/images/googlemeet.png"
                  width="30"
                  height="20"
                  alt="connect google meet"
                />{" "}
                Connect Google Meet
              </ButtonLight>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <ButtonPrimary type="submit">Schedule</ButtonPrimary>
            <Link href="/dashboard/interviews/video">

          <ButtonLight>Cancel</ButtonLight>
            </Link>
        </div>
      </form>
      <ToastContainer />
      <div className={styles.workInputButton}>
              <ButtonLight onclick={onClose}>Close</ButtonLight>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default View;
