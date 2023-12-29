"use client";
import { addCandidate } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/candidates/addCandidate/addCandidate.module.css";
import ButtonLight from "@/app/ui/widgets/buttonLight/page";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
import IconButton from "@/app/ui/widgets/iconButton/page";
import Image from "next/image";
import { useState } from "react";
import { MdAdd, MdDelete, MdEdit, MdOutlineClose, MdOutlineRemoveRedEye } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles

const AddCandidatePage = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddWorkExperience = (workExperience) => {
    setWorkExperiences([...workExperiences, workExperience]);
    setModalVisible(false);
    console.log(workExperiences)
  };

  const handleDeleteWorkExperience = (index) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences.splice(index, 1);
    setWorkExperiences(updatedWorkExperiences);
  };

  const handleEditWorkExperience = (index) => {
    // Implement your edit logic here
    // For simplicity, let's just delete the entry for demonstration
    handleDeleteWorkExperience(index);
  };

  


  const [educationHistory, setEducationHistory] = useState([]);
  const [modalEVisible, setModalEVisible] = useState(false);

  console.log(educationHistory)

  const handleAddEducationHistory = (educationHistoryItem) => {
    setEducationHistory([...educationHistory, educationHistoryItem]);
    setModalEVisible(false);
  };

  const handleDeleteEducationHistory = (index) => {
    const updatedEducationHistory = [...educationHistory];
    updatedEducationHistory.splice(index, 1);
    setEducationHistory(updatedEducationHistory);
  };

  const handleEditEducationHistory = (index) => {
    // Implement your edit logic here
    // For simplicity, let's just delete the entry for demonstration
    handleDeleteEducationHistory(index);
  };

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check for file size
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
    setPreviewImage(previewURL);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userForm}>
        Enter candidate details
        <form action={addCandidate} className={styles.form}>
          <input
            type="text"
            placeholder="First Name*"
            name="firstname"
            required
          />
          <input
            type="text"
            placeholder="Last Name*"
            name="lastname"
            required
          />
          <input type="email" placeholder="Email*" name="email" required />
          <input
            type="hidden"
            placeholder="Phone"
            name="phone"
            id="phone"
            value={phoneNumber}
          />
          <PhoneInput
            international
            required
            defaultCountry="" // You can set a default country
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Phone Number*"
            inputProps={{
              id: "phone",
              name: "phone",
            }}
            style={{ width: "49%" }}
          />
          <input type="text" placeholder="address*" name="address" required />
          <input
            type="number"
            placeholder="experience in years*"
            name="experience"
            required
          />
          <select
            name="highestQualification"
            id="highestQualification"
            required
          >
            <option value="">Highest Qualification*</option>
            <option value="PhD">PhD</option>
            <option value="MSc">MSc</option>
            <option value="Bsc">Bsc</option>
          </select>
          <input
            type="text"
            placeholder="Job Title*"
            name="jobTitle"
            required
          />
          <input type="text" placeholder="Employer*" name="employer" required />
          <input
            type="number"
            placeholder="Expected Salary Annually ($)*"
            name="expectedSalary"
            required
          />
          <input
            type="number"
            placeholder="Current Salary Annually($)*"
            name="currentSalary"
            required
          />
          <div className={styles.inputContainer}>
            <label htmlFor="companyLogo">Upload your resume</label>
            <input
              type="file"
              placeholder="Resume"
              name="img"
              id="img"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className={styles.inputContainerTwo}>
            <ButtonLight
              className={styles.inputButton}
              type="button"
              onclick={() => setModalVisible(true)}
            >
              <MdAdd /> Add Work Experience
            </ButtonLight>
            {workExperiences.map((workExp, index) => (
              <div className={styles.inputInnerContainer} key={index}>
                <div className={styles.inputInnerHeader}>
                  <h4>Work Experience {index + 1}:</h4>
                  <div>
                    {/* <IconButton type="button" onclick={() => handleEditWorkExperience(index, workExp.title, workExp.company, workExp.location)}>
                      <MdEdit />
                    </IconButton> */}
                    <IconButton type="button" onclick={() => handleDeleteWorkExperience(index)}>
                      <MdDelete/>
                    </IconButton>
                  </div>
                </div>
                <div className={styles.inputInnerContent}>
                  <div className={styles.contentDetail}>
                    <h5>Title</h5>
                    <p>{workExp.title}</p>
                  </div>
                  <div className={styles.contentDetail}>
                    <h5>Company Name</h5>
                    <p>{workExp.company}</p>
                  </div>
                  <div className={styles.contentDetail}>
                    <h5>Location</h5>
                    <p>{workExp.location}</p>
                  </div>
                  <input type="hidden" value={`${workExp.title},${workExp.company},${workExp.location}`} name={`workExperience${index}`} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.inputContainerTwo}>
            <ButtonLight
              className={styles.inputButton}
              type="button"
              onclick={() => setModalEVisible(true)}
            >
              <MdAdd /> Add Education History
            </ButtonLight>
            {educationHistory.map((edHistory, index) => (
              <div className={styles.inputInnerContainer} key={index}>
                <div className={styles.inputInnerHeader}>
                  <h4>Education History {index + 1}:</h4>
                  <div>
                    {/* <IconButton type="button" onclick={() => handleEditWorkExperience(index, workExp.title, workExp.company, workExp.location)}>
                      <MdEdit />
                    </IconButton> */}
                    <IconButton type="button" onclick={() => handleDeleteEducationHistory(index)}>
                      <MdDelete/>
                    </IconButton>
                  </div>
                </div>
                <div className={styles.inputInnerContent}>
                  <div className={styles.contentDetail}>
                    <h5>School/CollegName</h5>
                    <p>{edHistory.collegeName}</p>
                  </div>
                  <div className={styles.contentDetail}>
                    <h5>Educational Qualification</h5>
                    <p>{edHistory.qualification}</p>
                  </div>
                  <div className={styles.contentDetail}>
                    <h5>Grade</h5>
                    <p>{edHistory.grade}</p>
                  </div>
                  <input type="hidden" value={`${edHistory.collegeName},${edHistory.qualification},${edHistory.grade}`} name={`educationHistory${index}`} />
                </div>
              </div>
            ))}
          </div>
          {/* <div className={styles.inputContainer}>
            Show the selected image preview
            {previewImage && (
              <object
                width="200"
                height="400"
                data={previewImage}
                alt="Selected Preview"
                style={{
                  maxWidth: "15%",
                  justifyContent: "flex-start",
                  alignContent: "start",
                }}
              ></object>
            )}
            {fileSizeError && <p style={{ color: "red" }}>{fileSizeError}</p>}
          </div> */}

          <ButtonSeondary className={styles.submitButton} type="submit">
            Submit
          </ButtonSeondary>
          <p style={{ fontSize: "10px", color: "gray" }}>
            Hint: all inputs mark with * are required
          </p>

          {modalVisible && (
            <WorkExperienceForm
              onClose={() => setModalVisible(false)}
              onAddWorkExperience={handleAddWorkExperience}
            />
          )}

{modalEVisible && (
            <EducationHistoryForm
              onClose={() => setModalEVisible(false)}
              onAddEducationHistory={handleAddEducationHistory}
            />
          )}
        </form>
      </div>
    </div>
  );
};

const WorkExperienceForm = ({ onClose, onAddWorkExperience }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const handleAddWorkExperience = () => {
    if(title === "" || company === "" || location ===""){
      alert("Please fill all fields")
      return
    }
    onAddWorkExperience({ title, company, location });
    setTitle("");
    setCompany("");
    setLocation("");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContainer}>
          <h4>Work Experience Form</h4>
          <div className={styles.modalLine}></div>
          <div className={styles.workInputContainer}>
            <div className={styles.workInput}>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.workInput}>
              <label>Company:</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className={styles.workInput}>
              <label>Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className={styles.workInputButton}>
              <ButtonSeondary onclick={handleAddWorkExperience}>
                Add Work Experience
              </ButtonSeondary>
              <ButtonLight onclick={onClose}>Close</ButtonLight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const EducationHistoryForm = ({ onClose, onAddEducationHistory }) => {
  const [collegeName, setCollegeName] = useState("");
  const [qualification, setQualification] = useState("");
  const [grade, setGrade] = useState("");

  const handleAddEducationHistory = () => {
    if(collegeName === "" || qualification === "" || grade ===""){
      alert("Please fill all fields")
      return
    }
    onAddEducationHistory({ collegeName, qualification, grade });
    setCollegeName("");
    setQualification("");
    setGrade("");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContainer}>
          <h4>Education History Form</h4>
          <div className={styles.modalLine}></div>
          <div className={styles.workInputContainer}>
            <div className={styles.workInput}>
              <label>School/College Name</label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
            </div>

            <div className={styles.workInput}>
              <label>Educational Qualification</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>

            <div className={styles.workInput}>
              <label>Grade</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>

            <div className={styles.workInputButton}>
              <ButtonSeondary onclick={handleAddEducationHistory}>
                Add Education History
              </ButtonSeondary>
              <ButtonLight onclick={onClose}>Close</ButtonLight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCandidatePage;
