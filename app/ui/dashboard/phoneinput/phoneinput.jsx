"use client";
import styles from "./phoneinput.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles

const PhoneInputData = (onPhoneNumberChange) => {
  const [phoneNumber, setPhoneNumber] = useState();

  const handleInputChange = (e) => {
    const newData = e.target.value;
    setPhoneNumber(newData);
    // Pass the updated data to the parent component
    onPhoneNumberChange(newData);
  };

  return (
          <PhoneInput
            international
            defaultCountry="US" // You can set a default country
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            inputProps={{
              id: "phone",
              name: "phone",
            }}
            style={{ width: "49%" }}
          />
  );
};

export default PhoneInputData;
