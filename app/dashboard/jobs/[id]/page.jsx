"use client"
import { updateJob } from "@/app/lib/actions";
// import { fetchJob } from "@/app/lib/data";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css"; // Import the styles
// import { useState } from "react";
import styles from "@/app/ui/dashboard/jobs/singleJob/singleJob.module.css";
import Loading from "@/app/ui/widgets/loading/page";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
// Load ReactQuill dynamically on the client side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const SingleJobPage = ({ params }) => {
  // const [phoneNumber, setPhoneNumber] = useState();
  const [job, setJob] = useState(null);
  const [content, setContent] = useState("");
  const years = Array.from({ length: 31 }, (_, index) => index);
  const { id } = params;
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/job/getJob/${id}`);
        setJob(response.data);
        setContent(response.data.jobDesc)
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    
    fetchJob();
    
  }, [id]);

  const handleQuillChange = (value) => {
    // Handle changes in ReactQuill
    setContent(value);
  };
  
  // const job = await fetchJob(id);
  
  let imgUrl;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // // Check for file size
    if (file.size > 2 * 1024 * 1024) {
      setFileSizeError("File size exceeds the limit (2 MB).");
      return;
    } else {
      setFileSizeError("");
    }

    // Set the selected file
    setSelectedFile(file);

    // Create a preview URL for the selected file
    const previewURL = URL.createObjectURL(file);
    imgUrl = previewURL;
    setPreviewImage(previewURL);
  };

  // setValue(job.jobDesc);

  if(!job){
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <div className={styles.jobForm}>
        Edit your job placement
        <form action={updateJob} className={styles.form}>
          <div className={styles.formInput}>
            <label>Job Title</label>
            <input type="text" placeholder={job.title} name="title" />
          </div>
          {/* <div className={styles.formInput}>
            <label>
              Status 
            </label>
            <select name="status" id="status">
              <option value={job.status}>{job.status}</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="on-hold">On-hold</option>
            </select>
          </div> */}
          <div className={styles.formInput}>
            <label>Recruiter</label>
            <input type="text" placeholder={job.recruiter} name="recruiter" />
          </div>
          <div className={styles.formInput}>
            <label>Client Name</label>
            <input type="text" placeholder={job.clientName} name="clientName" />
          </div>
          {/* <div className={styles.formInput}>
            <label>Contact Name</label>
            <input
              type="text"
              placeholder={job.contactName}
              name="contactName"
            />
          </div>
          <div className={styles.formInput}>
            <label>Phone Number</label>
            <input
              type="number"
              placeholder={job.phone}
              name="phone"
              id="phone"
            />
          </div> */}
          {/* <input
            type="hidden"
            placeholder="Phone"
            name="phone"
            id="phone"
            value={phoneNumber}
          />
          <PhoneInput
            international
            defaultCountry="" // You can set a default country
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Phone Number"
            required
            inputProps={{
              id: "phone",
              name: "phone",
            }}
            style={{ width: "49%" }}
          /> */}
          <div className={styles.formInput}>
            <label>
              Target Date:{" "}
              <span style={{ color: "grey" }}>
                {job.targetDate?.toString().slice(4, 16)}
              </span>
            </label>
            <input type="date" placeholder={job.targetDate} name="targetDate" />
          </div>
          <div className={styles.formInput}>
            <label>Minimum Experience</label>
            <select name="minExperience" id="minExperience">
              <option value={job.minExperience}>{job.minExperience}</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? "year" : "years"}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formInput}>
            <label>Maximum Experience</label>
            <select name="maxExperience" id="maxExperience">
              <option value={job.maxExperience}>{job.maxExperience}</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? "year" : "years"}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formInput}>
            <label>Minimum Salary</label>
            <input type="number" placeholder={job.minSalary} name="minSalary" />
          </div>
          <div className={styles.formInput}>
            <label>Maximum Salary</label>
            <input type="number" placeholder={job.maxSalary} name="maxSalary" />
          </div>
          <div className={styles.formInput}>
            <label>Address</label>
            <input type="text" placeholder={job.address} name="address" />
          </div>
          <div className={styles.formInput}>
            <label>State</label>
            <input type="text" placeholder={job.state} name="state" />
          </div>
          <div className={styles.formInput}>
            <label>Country</label>
            <input type="text" placeholder={job.country} name="country" />
          </div>
          <div className={styles.formInput}>
            <label>Workplace module</label>
            <select name="workplaceModule" id="workplaceModule">
              <option value={job.workplaceModule}>{job.workplaceModule}</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div className={styles.formInput}>
            <label>Job Type</label>
            <select name="jobType" id="jobType">
              <option value={job.jobType}>{job.jobType}</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
          <div className={styles.formInput}>
            <label>Skills</label>
            <select name="jobType" id="jobType">
              <option value={job.skills}>{job.skills}</option>
              <option value="UX Design">UX Design</option>
              <option value="Frontend / Fullstack Development">
                Frontend / Fullstack Development
              </option>
              <option value="Backend Development">Backend Development</option>
              <option value="Art Direction, Branding & Graphic">
                Art Direction, Branding & Graphic
              </option>
            </select>
          </div>
          <div className={styles.formInput}>
            <label>Educational Qualification</label>
            <input type="text" placeholder={job.educationQualification} name="educationQualification" />
          </div>
          <div className={styles.formInput}>
            <label>Educational Specialization</label>
            <input type="text" placeholder={job.educationSpecialization} name="educationSpecialization" />
          </div>
          <input
            type="hidden"
            value={id}
            name="id"
          />

          {/* <div className={styles.formInput}>
            <label>Account Manager</label>
            <input
              type="text"
              placeholder={job.accountManager}
              name="accountManager"
            />
          </div> */}
          {/* <input type="hidden" placeholder={job.jobDesc} value={value} name="jobDesc" /> */}
          <div className={styles.formInput} style={{width: "100%"}}>

          <label>
            Job Description:
          </label>
          <input type="hidden" placeholder="Job Description" value={content} name="jobDesc" />
            <ReactQuill
            theme="snow"
            value={content}
            onChange={handleQuillChange}
            className={styles.quill} style={{marginBottom:"40px"}}/>
            </div>
          <div className={styles.formInput}>
            <label>Company / Brand Name</label>
            <input
              type="text"
              placeholder={job.companyName}
              name="companyName"
            />
          </div>
          <div className={styles.formInput}>
            <label>Company Website</label>
            <input
              type="text"
              placeholder={job.companyWebsite}
              name="companyWebsite"
            />
          </div>
          <div className={styles.formInput}>
            <label>Company Logo</label>
            <input
              type="file"
              placeholder="Company Website"
              name="companyLogo"
              id="companyLogo"
              onChange={handleFileChange}
              // required
            />
          </div>
          <div className={styles.formInput} style={{display: "flex"}}>
            {/* Show the selected image preview */}
            <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", gap:"10px"}}>

            <label htmlFor="">Logo</label>{job?.companyLogo && (
              <Image
                width="100"
                height="50"
                src={job.companyLogo}
                alt="Selected Preview"
                style={{
                  maxWidth: "15%",
                  justifyContent: "flex-start",
                  alignContent: "start",
                }}
              />
              )}
              </div>
            
            {previewImage && (
              <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", gap:"10px"}}>
                <label htmlFor="">New Logo</label>

              <Image
                width="100"
                height="50"
                src={previewImage}
                alt="Selected Preview"
                style={{
                  maxWidth: "15%",
                  justifyContent: "flex-start",
                  alignContent: "start",
                }}
                />
                </div>
            )}
            {/* {fileSizeError && <p style={{ color: "red" }}>{fileSizeError}</p>} */}
          </div>

          {/* <p style={{fontSize: "12px"}}>Description</p>
          <ReactQuill theme="snow" value={value} onChange={setValue} className={styles.quill}/>- */}
          <ButtonSeondary type="submit">Update</ButtonSeondary>
        </form>
      </div>
    </div>
  );
};

export default SingleJobPage;
