"use client"
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const ResumeParser = () => {
  const [resumeData, setResumeData] = useState(null);

  const onDrop = async (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file)

    // const formData = new FormData();
    // formData.append('resume', file);
    // console.log(formData)

    try {
        const response = await axios.post('/api/candidate/resume/parseResume', {files:file}, {
            headers: {
              'Content-Type': file.type,
            },
          });
    
          if (!response.data.success) {
            throw new Error(response.data.message);
          }
    } catch (error) {
      console.error('Error parsing resume:', error);
    }
  };

  const onSave = async () => {
    try {
      await axios.post('/api/saveCandidate', resumeData);
      console.log('Candidate saved successfully!');
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };

  return (
    <div>
      <h1>Resume Parser</h1>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} name="resume"/>
            <p>Drag and drop a resume file here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      
      {resumeData && (
        <div>
          <h2>Parsed Resume Information</h2>
          {/* Display parsed resume information here */}

          <button onClick={onSave}>Save Candidate</button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ResumeParser;