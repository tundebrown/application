"use client"
import React, { useState } from 'react';
import styles from "./page.module.css"
const DropdownButton = ({ children, options }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropbtn}>
        {children}
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option, index) => (
            <a key={index} href="#">
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;