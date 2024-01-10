import NavComponent from "@/app/ui/dashboard/navcomponent/navcomponent";
import styles from "@/app/ui/dashboard/profile/profile.module.css";

const menuItems = [
  {
    title: "User Management",
    path: "/dashboard/settings/users",
  },
  {
    title: "Pending Invitations",
    path: "/dashboard/settings/users/pendingInvitations",
  },
  {
    title: "Roles & Permissions",
    path: "/dashboard/settings/users/accessControl",
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