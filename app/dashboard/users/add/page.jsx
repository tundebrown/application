"use client";
import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { useState } from "react";
import { MdOutlineClose, MdOutlineRemoveRedEye } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles

const AddJobPage = () => {

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userForm}>
        Enter candidate details
        <form action={addUser} className={styles.form}>
          <input
            type="text"
            placeholder="First Name*"
            name="username"
            required
          />
          <input type="text" placeholder="Last Name*" name="lastname" required />
          <input type="email" placeholder="Email*" name="email" required />
          <div className={styles.showPassword}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button" onClick={handleTogglePassword}>
              {showPassword ? <MdOutlineClose /> : <MdOutlineRemoveRedEye />}
            </button>
          </div>
          <input
            type="hidden"
            placeholder="Is Admin?"
            name="isAdmin"
            value={false}
          />
          <input
            type="hidden"
            placeholder="Phone"
            name="phone"
            id="phone"
            value={phoneNumber}
          />
          <PhoneInput
            international
            defaultCountry="US" // You can set a default country
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Phone Number"
            inputProps={{
              id: "phone",
              name: "phone",
            }}
            style={{ width: "49%" }}
          />
          <input type="text" placeholder="address" name="address" />
          <input type="number" placeholder="experience in years" name="experience" />
          <select name="highestQualification" id="highestQualification">
            <option value="">Highest Qualification</option>
            <option value="PhD">PhD</option>
            <option value="MSc">MSc</option>
            <option value="Bsc">Bsc</option>
          </select>
          <input type="text" placeholder="Job Title" name="jobTitle" />
          <input type="text" placeholder="Employer" name="employer" />
          <input
            type="number"
            placeholder="Expected Salary Annually ($)"
            name="expectedSalary"
          />
          <input
            type="number"
            placeholder="Current Salary Annually($)"
            name="currentSalary"
          />

          <button type="submit">Submit</button>
          <p style={{fontSize:"10px", color: "gray"}}>Hint: all inputs mark with * are required</p>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
