import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { deleteUser } from "@/app/lib/actions";
import { fetchUsers } from "@/app/lib/data";
import { MdOutlineArrowDropDown, MdOutlineDelete, MdOutlineEdit, MdOutlineMenu, MdOutlineViewAgenda } from "react-icons/md";


const JobsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h4>All Registered Candidates <MdOutlineArrowDropDown /></h4>
        </div>
        <div className={styles.filter}>
        <Search placeholder="Search for a candidate..." />
          <button className={styles.addButton}><MdOutlineMenu /></button>
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Create New Candidate</button>
        </Link>
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>

            <td className={styles.bb}>NAME</td>
            <td className={styles.bb}>EMAIL</td>
            <td className={styles.bb}>PHONE</td>
            <td className={styles.bb}>EXPERIENCE</td>
            <td className={styles.bb}>HIGHEST QUALIFICATION</td>
            <td className={styles.bb}>CURRENT JOB TITLE</td> 
            <td className={styles.bb}>DATE JOINED</td>
            <td className={styles.bb}>CURRENT EMPLOYER</td>
            <td className={styles.bb}>ACTION</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} >
              <td>
              <div className={styles.user}>
                   <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {`${user.username} ${user.lastname}`}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.experience}</td>
              <td>{user.highestQualification}</td>
              <td>{user.jobTitle}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.employer}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}/view`}>
                    <button className={`${styles.button} ${styles.view}`}>
                    <MdOutlineViewAgenda/>
                    </button>
                  </Link>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.edit}`}>
                      <MdOutlineEdit/>
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                    <MdOutlineDelete/>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default JobsPage;







































// import { deleteUser } from "@/app/lib/actions";
// import { fetchUsers } from "@/app/lib/data";
// import Pagination from "@/app/ui/dashboard/pagination/pagination";
// import Search from "@/app/ui/dashboard/search/search";
// import styles from "@/app/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import Link from "next/link";

// const UsersPage = async ({ searchParams }) => {
//   const q = searchParams?.q || "";
//   const page = searchParams?.page || 1;
//   const { count, users } = await fetchUsers(q, page);

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <Search placeholder="Search for a user..." />
//         <Link href="/dashboard/users/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>First Name</td>
//             <td>Email</td>
//             <td>Created At</td>
//             <td>Role</td>
//             <td>Status</td>
//             <td>Action</td>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image
//                     src={user.img || "/noavatar.png"}
//                     alt=""
//                     width={40}
//                     height={40}
//                     className={styles.userImage}
//                   />
//                   {`${user.username} ${user.firstname}`}
//                 </div>
//               </td>
//               <td>{user.email}</td>
//               <td>{user.createdAt?.toString().slice(4, 16)}</td>
//               <td>{user.isAdmin ? "Admin" : "Client"}</td>
//               <td>{user.isActive ? "active" : "passive"}</td>
//               <td>
//                 <div className={styles.buttons}>
//                   <Link href={`/dashboard/users/${user.id}`}>
//                     <button className={`${styles.button} ${styles.view}`}>
//                       View
//                     </button>
//                   </Link>
//                   <form action={deleteUser}>
//                     <input type="hidden" name="id" value={(user.id)} />
//                     <button className={`${styles.button} ${styles.delete}`}>
//                       Delete
//                     </button>
//                   </form>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination count={count} />
//     </div>
//   );
// };

// export default UsersPage;
