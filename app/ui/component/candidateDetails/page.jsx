"use client"
import React, { useState } from "react";
import styles from "./page.module.css";
import ButtonLight from "../../widgets/buttonLight/page";
import { MdAdd, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const CandidateDetails = ({ workExperiences, educationHistory }) => {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  const toggleAccordion2 = () => {
    setIsActive2(!isActive2);
  };

  const toggleAccordion3 = () => {
    setIsActive3(!isActive3);
  };

  return (
    // <div className={`${styles.accordion} ${isActive ? 'active' : ''}`}>
    <div className={styles.container}>
      <div className={styles.accordion}>
        <div className={styles.accordionHeader}>
          <h4 onClick={toggleAccordion}>Work History</h4>
          <div className={styles.action}>
            <ButtonLight>
              <MdAdd /> Add Experience
            </ButtonLight>
            {isActive ? (
              <MdKeyboardArrowDown onClick={toggleAccordion} />
            ) : (
              <MdKeyboardArrowUp onClick={toggleAccordion} />
            )}
          </div>
        </div>
        {isActive && (
          <div className={styles.accordionContent}>
            {workExperiences.map((experience, index) => {
              return (
                <div key={index} className={styles.workWrapper}>
                  <div className={styles.workTitle}>
                    <h4>{experience.title}</h4>
                  </div>
                  <div className={styles.workCompanyName}>
                    <h5>{experience.company}</h5>{" "}
                    <span>{`| ${experience.location}`}</span>
                  </div>
                  <div className={styles.workDuration}>
                    <span>Start date - End date</span>{" "}
                    <span> | Employment type</span>
                  </div>
                  <div className={styles.workDescription}>
                    <p>Description -</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.accordion}>
        <div className={styles.accordionHeader}>
          <h4 onClick={toggleAccordion2}>Education</h4>
          <div className={styles.action}>
            <ButtonLight>
              <MdAdd /> Add Education
            </ButtonLight>
            {isActive2 ? (
              <MdKeyboardArrowDown onClick={toggleAccordion2} />
            ) : (
              <MdKeyboardArrowUp onClick={toggleAccordion2} />
            )}
          </div>
        </div>
        {isActive2 && (
          <div className={styles.accordionContent}>
            {educationHistory.map((education, index) => {
              return (

                <div key={index} className={styles.workWrapper}>
              <div className={styles.workTitle}>
                <h4>{education.qualification}</h4> <span>| {education.grade}</span>
              </div>
              <div className={styles.workCompanyName}>
                <h5>{education.collegeName}</h5> <span> | Location </span>
              </div>
              <div className={styles.workDuration}>
                <span>Start date - End date</span>
              </div>
              <div className={styles.workDescription}>
                <p>
                  Description - 
                </p>
              </div>
            </div>
                )
})}
          </div>
        )}
      </div>

      <div className={styles.accordion}>
        <div className={styles.accordionHeader}>
          <h4 onClick={toggleAccordion3}>All Details</h4>
          <div className={styles.action}>
            {isActive3 ? (
              <MdKeyboardArrowDown onClick={toggleAccordion3} />
            ) : (
              <MdKeyboardArrowUp onClick={toggleAccordion3} />
            )}
          </div>
        </div>
        {isActive3 && (
          <div className={styles.accordionContent}>
            <div className={styles.jobDescWrapper}>
              <div className={styles.jobDesc}>
                <div className={styles.jobDescPane}>
                  <div className={styles.jobDescContent}>
                    <h4>Workplace module</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Minimum Experience</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Maximum Experience</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialablee</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Educational Qualification</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Job Type</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Skills</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                </div>
                <div className={styles.jobDescPane}>
                  <div className={styles.jobDescContent}>
                    <h4>Educational Specialization</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Address</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>State</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Country</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Company Name</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                  <div className={styles.jobDescContent}>
                    <h4>Salary Range</h4>
                  </div>
                  <div className={styles.jobDescContent}>
                    <span>Not avaialable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDetails;
