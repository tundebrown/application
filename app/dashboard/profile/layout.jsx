import NavComponent from "@/app/ui/dashboard/navcomponent/navcomponent";
import styles from "@/app/ui/dashboard/profile/profile.module.css";

const menuItems = [
  {
    title: "Profile",
    path: "/dashboard/profile",
  },
  {
    title: "Email Settings",
    path: "/dashboard/emailsetting",
  },
  {
    title: "Calender Settings",
    path: "/dashboard/candidates",
  }
];

const SingleUserPage = async ({ children }) => {


  return (
    <div className={styles.container}>
      <NavComponent menuItems={menuItems}/>
      {children}
    </div>
  );
};

export default SingleUserPage;
