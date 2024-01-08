"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {
  MdAdd,
  MdArrowCircleDown,
  MdCalendarMonth,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineViewAgenda,
  MdPrint,
  MdSearch,
} from "react-icons/md";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
import ButtonLight from "@/app/ui/widgets/buttonLight/page";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Loading from "@/app/ui/widgets/loading/page";
import Search from "@/app/ui/dashboard/search/search";

const Client = ({searchParams}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState(null);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, jobs } = await fetchJobs(q, page);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/client/getClients', {
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
  }, [q, page, modalVisible]);

  console.log(data?.clients)

  if(!data){
    return (
      <div style={{display: "grid", justifyContent: "center", alignItems: "center", marginTop:"100px", flexDirection: "column"}}>
    <Loading />
      </div>
    )
  }

  return (
    <div className={styles.childContainer}>
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}></div>
        <div className={styles.topBarRight}>
          <ButtonLight type="button" onclick={() => setModalVisible(true)}>
            <MdAdd /> Create Client
          </ButtonLight>

          <ButtonLight>
            <MdCalendarMonth />
          </ButtonLight>
          <ButtonLight>
            <MdPrint />
          </ButtonLight>
          <div className={styles.filter}>
          <Search placeholder="Search for a job..." />
          </div>

          <div className={styles.search}></div>
        </div>
      </div>
      <div className={styles.noIntContent}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <td className={styles.bb}>
                <input type="checkbox" />
              </td>
              <td className={styles.bb}>CLIENT NAME</td>
              <td className={styles.bb}>CONTACT NUMBER</td>
              <td className={styles.bb}>ACCOUNT MANAGER</td>
              <td className={styles.bb}>ACTION</td>
            </tr>
          </thead>
          <tbody>
          {data?.clients.map((client) => (
            <tr key={client._id}>
              <td>
                <div className={styles.product}>
                  <input type="checkbox" />
                </div>
              </td>
              <td>{client.username}</td>
              <td>{client.contactNumber}</td>
              <td>{client.accountManager.username}</td>
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
                    <input type="hidden" name="id" value="" />
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
        {modalVisible && (
          <CreateClientForm
            onClose={() => setModalVisible(false)}
            // onAddWorkExperience={handleAddWorkExperience}
          />
        )}
        <Pagination count={data?.count} />
      </div>
    </div>
  );
};

const CreateClientForm = ({ onClose}) => {
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [accountManager, setAccountManager] = useState([]);
  const [selectedAccountManager, setSelectedAccountManager] = useState(null);
  const [formData, setFormData] = useState({
    // firstName: '', lastName: '', email: '', contactNumber: '', accountManager: '',
  })

  
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
  
  const handleSaveClient = async  (e) => {
    e.preventDefault();
    if (
      username === "" ||
      contactNumber === "" ||
      selectedAccountManager === "" ||
      email === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    setFormData({username:username, email:email, contactNumber:contactNumber, accountManager:selectedAccountManager?.value})

    try {
      // Send data to Next.js API
      const response = await axios.post('/api/client/createClient', {username:username, email:email, contactNumber:contactNumber, accountManager:selectedAccountManager?.value});
      alert(response.data.data);
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Error saving client data');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContainer}>
          <h4>Create Client</h4>
          <div className={styles.modalLine}></div>
          <form onSubmit={handleSaveClient} className={styles.workInputContainer}>
            <div className={styles.workInput}>
              <label>Client Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={styles.workInput}>
              <label>email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.workInput}>
              <label>Contact Number</label>
              <input
                type="number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>

            <div className={styles.workInput}>
              <label>Account Manager</label>
              {/* <input
                type="text"
                value={accountmanager}
                onChange={(e) => setAccountManager(e.target.value)}
              /> */}
              <Select
                options={accountManager}
                isSearchable
                placeholder="Select Recruiter"
                value={selectedAccountManager}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.workInputButton}>
              <ButtonSeondary type="submit">Save</ButtonSeondary>
              <ButtonLight onclick={onClose}>Close</ButtonLight>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Client;
