"use client";
import ButtonPrimary from "@/app/ui/widgets/button/page";
import styles from "./page.module.css";
import ButtonLight from "@/app/ui/widgets/buttonLight/page";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddFormalInterview = () => {
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
    <div className={styles.container}>
      <div className={styles.subTitle}>
        <p>Add Formal Interview</p>
      </div>
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
    </div>
  );
};

export default AddFormalInterview;
