import { addCandidate } from "@/app/lib/actions";
import { fetchJob } from "@/app/lib/data";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css"; // Import the styles
// import { useState } from "react";
import styles from "@/app/ui/dashboard/jobs/singleJob/singleJob.module.css";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
import Loading from "@/app/ui/widgets/loading/page";
import Image from "next/image";
import {
  MdDescription,
  MdExplore,
  MdGroupWork,
  MdLocationPin,
  MdMoney,
  MdSupervisorAccount,
  MdWork,
} from "react-icons/md";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const SingleJobPage = async ({ params }) => {
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [value, setValue] = useState('');
  const years = Array.from({ length: 31 }, (_, index) => index);
  const { applyId } = params;

  const job = await fetchJob(applyId);
  const desc = job.jobDesc;
  let imgUrl;

  console.log("Job Id", job?.id)

  // const [selectedFile, setSelectedFile] = useState(null);
  // const [previewImage, setPreviewImage] = useState(null);
  // const [fileSizeError, setFileSizeError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // // Check for file size
    // if (file.size > 2 * 1024 * 1024) {
    //   setFileSizeError("File size exceeds the limit (2 MB).");
    //   return;
    // } else {
    //   setFileSizeError("");
    // }

    // Set the selected file
    setSelectedFile(file);

    // Create a preview URL for the selected file
    const previewURL = URL.createObjectURL(file);
    imgUrl = previewURL;
    // setPreviewImage(previewURL);
  };

  // setValue(job.jobDesc);

  if(!job){
    <Loading/>
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.jobForm}>
        <h2>{job.title}</h2>
        <div>
          <p>
            <span>
              <MdLocationPin />
            </span>{" "}
            {job.location}{" "}
            <span>
              {" "}
              <MdSupervisorAccount />
            </span>{" "}
            {job.clientName}{" "}
          </p>
          <br />
          <p>
            <span>
              <MdWork />
            </span>{" "}
            {job.skills}{" "}
            <span>
              <MdGroupWork />
            </span>{" "}
            {job.jobType}
          </p>{" "}
          <br />
          <p>
            <span>
              <MdExplore />
            </span>{" "}
            {job.minExperience} - {job.maxExperience} Years Experience
          </p>{" "}
          <br />
          <p>
            <span>
              <MdMoney />
            </span>{" "}
            ${job.minSalary} - ${job.maxSalary}
          </p>{" "}
          <br />
          <div>
            <span>
              <MdDescription />
            </span>{" "}
            <div dangerouslySetInnerHTML={{ __html: job.jobDesc }} />
          </div>{" "}
          <br />
        </div>
        <div style={{marginTop: "20px"}}>
          <h4>Fill the form below to apply</h4>
        </div>
        <form action={addCandidate} className={styles.form}>
        <input
              type="hidden"
              name="appliedJobs"
              value={job.id}
            />
          <div className={styles.formInput}>
            <input
              type="text"
              placeholder="First Name*"
              name="firstname"
              required
            />
          </div>
          <div className={styles.formInput}>
            <input
              type="text"
              placeholder="Last Name*"
              name="lastname"
              required
            />
          </div>
          <div className={styles.formInput}>
            <input type="email" placeholder="Email*" name="email" required />
          </div>
          <div className={styles.formInput}>
            <input type="number" placeholder="Phone" name="phone" id="phone" />
          </div>
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
            placeholder="Phone Number*"
            inputProps={{
              id: "phone",
              name: "phone",
            }}
            style={{ width: "49%" }}
          /> */}
          <div className={styles.formInput}>
            <input type="text" placeholder="address*" name="address" />
          </div>
          <div className={styles.formInput}>
            <input
              type="number"
              placeholder="experience in years*"
              name="experience"
            />
          </div>
          <div className={styles.formInput}>
            <select name="highestQualification" id="highestQualification">
              <option value="">Highest Qualification*</option>
              <option value="PhD">PhD</option>
              <option value="MSc">MSc</option>
              <option value="Bsc">Bsc</option>
            </select>
          </div>
          <div className={styles.formInput}>
            <input type="text" placeholder="Job Title*" name="jobTitle" />
          </div>
          <div className={styles.formInput}>
            <input type="text" placeholder="Employer*" name="employer" />
          </div>
          <div className={styles.formInput}>
            <input
              type="number"
              placeholder="Expected Salary Annually ($)*"
              name="expectedSalary"
            />
          </div>
          <div className={styles.formInput}>
            <input
              type="number"
              placeholder="Current Salary Annually($)*"
              name="currentSalary"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="companyLogo">Upload your resume</label>
            <input
              type="file"
              placeholder="Resume"
              name="img"
              id="img"
              // onChange={handleFileChange}
              required
            />
          </div>
          {/* <div className={styles.inputContainer}>
            Show the selected image preview
            {previewImage && (
              <Image
                src={previewImage}
                alt="Selected Preview"
                style={{
                  maxWidth: "15%",
                  justifyContent: "flex-start",
                  alignContent: "start",
                }}
              />
            )}
            {fileSizeError && <p style={{ color: "red" }}>{fileSizeError}</p>}
          </div> */}

          <div className={styles.inputContainer}>

          <ButtonSeondary type="submit">Submit your application</ButtonSeondary>
          </div>
          <p style={{ fontSize: "10px", color: "gray" }}>
            Hint: all inputs mark with * are required
          </p>
        </form>
      </div>
    </div>
  );
};

export default SingleJobPage;
