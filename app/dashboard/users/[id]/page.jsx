import { updateUser } from "@/app/lib/actions";
import { fetchUser } from "@/app/lib/data";
import NavComponent from "@/app/ui/dashboard/navcomponent/navcomponent";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const menuItems = [

  {
    title: "Profile",
    path: "/dashboard/users/",
  },
  {
    title: "Job Openings",
    path: "/dashboard/jobs",
  },
  {
    title: "Candidates/Talent Pool",
    path: "/dashboard/candidates",
  },
  {
    title: "Interviews",
    path: "/dashboard/interviews",
    
  },
  {
    title: "Mailbox",
    path: "/dashboard/mailbox",
  },
  {
    title: "Clients",
    path: "/dashboard/clients",
  },
  {
    title: "Reports",
    path: "/dashboard/reports",
  },

];

const SingleUserPage = async ({ params }) => {
  
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className={styles.container}>
        <NavComponent menuItems={menuItems} />
        <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <h3>
          Profile Settings
        </h3>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id}/>
          <label>First Name</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Last Name</label>
          <input type="text" name="lastname" placeholder={user.lastname} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>Yes</option>
            <option value={false} selected={!user.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>Yes</option>
            <option value={false} selected={!user.isActive}>No</option>
          </select>
          <button>Update</button>
        </form>
        </div>
        <div className={styles.notificationSettings}>
          <h3>
            Notification Settings
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
