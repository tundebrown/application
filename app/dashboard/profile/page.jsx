import { updateUser } from "@/app/lib/actions";
import { fetchUser } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/profile/profile.module.css";
import Image from "next/image";
import { auth, signOut } from "@/app/auth";
import { MdCameraAlt } from "react-icons/md";
import Checkbox from "@/app/ui/widgets/checkbox/page";

const SingleUserPage = async () => {
  //   const { id } = params;
  const { user } = await auth();
  const userData = await fetchUser(user.id);

  // const [previewImage, setPreviewImage] = useState(null);
  // const [fileSizeError, setFileSizeError] = useState("");

  let error = "";
  let imagePreview = "";

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check for file size
    if (file.size > 2 * 1024 * 1024) {
      // setFileSizeError("File size exceeds the limit (2 MB).");
      error = "File size exceeds the limit (2 MB).";
      return;
    } else {
      // setFileSizeError("");
      error = "";
    }

    // Set the selected file
    setSelectedFile(file);

    // Create a preview URL for the selected file
    const previewURL = URL.createObjectURL(file);
    // setPreviewImage(previewURL);
    imagePreview = previewURL;
    console.log("Image URL: ",imagePreview);
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.infoContainer}>
          <h3>Profile Settings</h3>
          <div className={styles.infoDataContainer}>
          <div className={styles.avatarUpload}>
                <div className={styles.avatarEdit}>
                    <MdCameraAlt className={styles.avatarIcon}/>

                  <form action="" method="post" id="form-image">
                    <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                    <label htmlFor="imageUpload"></label>
                  </form>
                </div>
                <div class={styles.avatarPreview}>

                  <Image width="100" height="100" className={styles.profileUserImg} id="imagePreview" src={userData.img || "/noavatar.png"} alt="User profile picture" />
                </div>
              </div>


            {/* <div className={styles.imgContainer}>
              <Image src={userData.img || "/noavatar.png"} alt="" fill />
            </div> */}
            <p>{userData.username}</p>
          </div>
        </div>
        <div className={styles.formContainer}>
          <form action={updateUser} className={styles.form}>
            <input type="hidden" name="id" value={userData.id} />
            <div className={styles.formContent}>
              <label>First Name</label>
              <input
                type="text"
                name="username"
                placeholder={userData.username}
              />
            </div>
            <div className={styles.formContent}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder={userData.lastname}
              />
            </div>
            <div className={styles.formContent}>
              <label>Email</label>
              <input type="email" name="email" placeholder={userData.email} />
            </div>
            <div className={styles.formContent}>
              <label>Phone</label>
              <input type="text" name="phone" placeholder={userData.phone} />
            </div>
            <div className={styles.formContent}>
              <label>City</label>
              <input type="text" name="city" placeholder={userData.city} />
            </div>
            <div className={styles.formContent}>
              <label>State</label>
              <input type="text" name="state" placeholder={userData.state} />
            </div>
            <div className={styles.formContent}>
              <label>Country</label>
              <input type="text" name="country" placeholder={userData.country} />
            </div>
            <div className={styles.formContent}>
              <label>Role</label>
              <input type="text" name="account" placeholder="Account Owner" disabled/>
            </div>
            <div className={styles.formContent}>
              <label>Timezone</label>
              <input type="text" name="timezone" placeholder={userData.timezone} />
            </div>
            <div className={styles.formContent}>
              <label>Default Currency</label>
              <input type="text" name="currency" placeholder={userData.currency} />
            </div>
            <button type="submit" className={styles.btn}>Update</button>
            <button className={styles.passwordBtn}>Change Password</button>

            {/* 
            <label>Password</label>
            <input type="password" name="password" />
            
            <label>Address</label>
            <textarea
              type="text"
              name="address"
              placeholder={userData.address}
            />
            <label>Is Admin?</label>
            <select name="isAdmin" id="isAdmin">
              <option value={true} selected={userData.isAdmin}>
                Yes
              </option>
              <option value={false} selected={!user.isAdmin}>
                No
              </option>
            </select>
            <label>Is Active?</label>
            <select name="isActive" id="isActive">
              <option value={true} selected={userData.isActive}>
                Yes
              </option>
              <option value={false} selected={!userData.isActive}>
                No
              </option>
            </select>
            <button>Update</button> */}
          </form>
        </div>
        <div className={styles.notificationSettings}>
          <h3>Notification Settings</h3>
          <div className={styles.notificationSettingsContentWrapper}>
            <div className={styles.notificationSettingsContent}>
                <div className={styles.notificationSettingsInfo}>
                <h4>Email Reminders</h4>
                <p>Set email reminders for interviews and reports</p>
                </div>
                <div className={styles.notificationSettingsToggle}>
                <Checkbox />
                </div>
            </div>
            <div className={styles.notificationSettingsContent}>
                <div className={styles.notificationSettingsInfo}>
                <h4>Daily Email Report</h4>
                <p>Receive email every morning with new job appllicants you have received for your jobs.</p>
                </div>
                <div className={styles.notificationSettingsToggle}>
                <Checkbox />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
