import NavComponent from "@/app/ui/dashboard/navcomponent/navcomponent";
import styles from "@/app/ui/dashboard/profile/profile.module.css";

const menuItems = [
  {
    title: "Create Formal Interview",
    path: "/dashboard/interviews/add",
  },
  {
    title: "Create Video Interview",
    path: "/dashboard/interviews/add/addVideo",
  },
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
