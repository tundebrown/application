"use client";
import { addJob } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/jobs/addJob/addJob.module.css";
// import { auth, signOut } from "@/app/auth";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles
import Image from "next/image";
// import { MdArrowRight } from "react-icons/md";
// import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { FaArrowRight } from "react-icons/fa";

const AddJobPage = () => {
  const [value, setValue] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState();
  const years = Array.from({ length: 31 }, (_, index) => index);

  // const { user } = await auth();
  const uniqueValue = `ATP_${uuidv4()}`;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");
  const [selectedOption, setSelectedOption] = useState("masterPipeline");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);

    console.log(selectedOption);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check for file size
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
    setPreviewImage(previewURL);
  };

  return (
    <div className={styles.container}>
      <div className={styles.jobForm}>
        <h4>What is the job you are hiring for?</h4>
        <form action={addJob} className={styles.form}>
          <input type="text" placeholder="Job Title" name="title" required />
          <input
            type="hidden"
            placeholder="Status"
            name="status"
            id="status"
            value="open"
          />
          {/* <select name="status" id="status">
            <option value="general">Choose a Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="on-hold">On-hold</option>
          </select> */}
          <input
            type="text"
            placeholder="Recruiter"
            name="recruiter"
            required
          />
          <input
            type="text"
            placeholder="Client Name"
            name="clientName"
            required
          />
          {/* <input
            type="text"
            placeholder="Contact Name"
            name="contactName"
            required
          />
          <input
            type="hidden"
            placeholder="Phone"
            name="phone"
            id="phone"
            value={phoneNumber}
          /> */}
          {/* <PhoneInput
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
          <div className={styles.inputContainer}>
            <label htmlFor="targetDate">Target Date</label>
            <input
              type="date"
              placeholder="Target Date"
              name="targetDate"
              required
            />
          </div>
          <select name="minExperience" id="miExperience" required>
            <option value="0 year">minimum experience</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year} {year === 1 ? "year" : "years"}
              </option>
            ))}
          </select>
          <select name="maxExperience" id="maxExperience" required>
            <option value="0 year">maximum experience</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year} {year === 1 ? "year" : "years"}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Minimum Salary ($)"
            name="minSalary"
            required
          />
          <input
            type="number"
            placeholder="Maximum Salary ($)"
            name="maxSalary"
            required
          />
          <input type="text" placeholder="Address" name="address" required />
          <input type="text" placeholder="State" name="state" required />
          <input type="text" placeholder="Country" name="country" required />
          <select name="workplaceModule" id="workplaceModule" required>
            <option value="On-site">Workplace module</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
          <select name="jobType" id="jobType" required>
            <option value="fulltime">Job Type</option>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="hourly">Hourly</option>
          </select>
          <div className={styles.inputContainer}>
            <label htmlFor="skills">Skills</label>
            <select name="skills" id="skills" required>
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

          <input
            type="text"
            placeholder="Educational Qualification"
            name="educationQualification"
          />
          <input
            type="text"
            placeholder="Educational Specialization"
            name="educationSpecialization"
          />
          {/* <input
            type="text"
            placeholder="Specify Required Skills"
            name="skills"
            required
          /> */}
          {/* <GetUser /> */}
          {/* <input type="hidden" placeholder="Account Manager" name="accountManager" value={user.username}/> */}
          
          <input
            type="hidden"
            placeholder="Job Id"
            value={uniqueValue}
            name="jobOpeningId"
            required
          />
          
          <input
            type="text"
            placeholder="Company / Brand Name"
            name="companyName"
            required
          />
          <input
            type="text"
            placeholder="Company Website"
            name="companyWebsite"
            required
          />
          
            <div className={styles.inputContainer}>
              <label htmlFor="hiringPipeline">Select Hiring Stages: </label>
              <select
                name="hiringPipeline"
                id="hiringPipeline"
                required
                onChange={handleSelectChange}
              >
                <option value="masterPipeline">Master Hiring Pipeline</option>
                <option value="customPipeline">Custom Hiring Pipeline</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
            <label htmlFor="companyLogo">Company Logo</label>
            <input
              type="file"
              multiple
              accept="image/*"
              placeholder="Company Website"
              name="companyLogo"
              id="companyLogo"
              onChange={handleFileChange}
              required
            />
            <div className={styles.inputContainer} style={{width: "30%", paddingLeft: "5px"}}>
            {/* Show the selected image preview */}
            {previewImage && (
              <Image
                width="100"
                height="50"
                src={previewImage}
                alt="Selected Preview"
                style={{
                  maxWidth: "20%",
                  justifyContent: "flex-start",
                  alignContent: "start",
                }}
              />
            )}
            {fileSizeError && <p style={{ color: "red" }}>{fileSizeError}</p>}
          </div>
          </div>
            {selectedOption === "masterPipeline" && (
              <div className={styles.inputContainerCheckBox}>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>Applied</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>Contacted</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>Interview Scheduled</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>Interview Not Attended</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>Interview Rescheduled</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>Rejected</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>On Hold</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>Selected</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" checked />
                  <label>Offered</label>
                </div>
              </div>
            )}
  
            {selectedOption === "customPipeline" && (
              <div className={styles.inputContainerCheckBox}>
                <div className={styles.hiringInput}>
                  <input type="checkbox" name="applied" value="applied" />
                  <label>Applied</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" name="contacted" value="contacted" />
                  <label>Contacted</label>
                </div>
                <div className={styles.hiringInput}>
                  <input
                    type="checkbox"
                    name="interviewScheduled"
                    value="interviewScheduled"
                  />
                  <label>Interview Scheduled</label>
                </div>
                <div className={styles.hiringInput}>
                  <input
                    type="checkbox"
                    name="interviewNotAttended"
                    value="interviewNotAttended"
                  />
                  <label>Interview Not Attended</label>
                </div>
                <div className={styles.hiringInput}>
                  <input
                    type="checkbox"
                    name="interviewRescheduled"
                    value="interviewRescheduled"
                  />
                  <label>Interview Rescheduled</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" name="rejected" value="rejected" />
                  <label>Rejected</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" name="onHold" value="onHold" />
                  <label>On Hold</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" name="selected" value="selected" />
                  <label>Selected</label>
                </div>
                <div className={styles.hiringInput}>
                  <input type="checkbox" name="offered" value="offered" />
                  <label>Offered</label>
                </div>
              </div>
            )}
          
          {/* <p style={{fontSize: "12px"}}>Description</p> */}
          <div className={styles.inputContainer} style={{flexDirection: "column", width: "100%", alignItems: "flex-start"}}>
            <label htmlFor="jobDesc" style={{marginTop:"20px"}}>Job Description</label>
            {/* <textarea
              required
              name="jobDesc"
              id="desc"
              rows="16"
              placeholder="Job description"
            ></textarea> */}
            <input type="hidden" placeholder="Job Description" value={value} name="jobDesc" />
            <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className={styles.quill}
          />
          </div>
          
          <p>-</p>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* <div className={styles.help}>
        Would you like some help in creating the job description?
      </div> */}
    </div>
  );
};

export default AddJobPage;
