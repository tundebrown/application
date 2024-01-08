"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/candidates/candidates.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { deleteCandidate } from "@/app/lib/actions";
// import { fetchCandidates } from "@/app/lib/data";
import {
  MdAdd,
  MdOutlineArrowDropDown,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineMenu,
  MdOutlineViewAgenda,
} from "react-icons/md";
import PDFIcon from "@/app/ui/widgets/pdficon/page";
import ButtonPrimary from "@/app/ui/widgets/button/page";
import ButtonSeondary from "@/app/ui/widgets/buttonSecondary/page";
import Loading from '@/app/ui/widgets/loading/page';
import axios from 'axios';

const CandidatesPage = ({ searchParams }) => {
  const [data, setData] = useState(null);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, candidates } = await fetchCandidates(q, page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/candidate/getCandidates', {
          params: {
            q: q, // replace with your actual query
            page: page, // replace with the desired page number
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [q, page]);

  if (!data) {
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h4>
            All Registered Candidates <MdOutlineArrowDropDown />
          </h4>
        </div>
        <div className={styles.filter}>
          <Search placeholder="Search for a candidate..." />
          <Link href="">
          <ButtonSeondary><MdAdd/>Resume Parser</ButtonSeondary>
          </Link>
          {/* <Link href="/dashboard/candidates/add">
            <button className={styles.addButton}>Add New Candidate</button>
          </Link> */}
          <Link href="/dashboard/candidates/add">
            <ButtonSeondary><MdAdd/>Add New Candidate</ButtonSeondary>
          </Link>
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <td className={styles.bb}>NAME</td>
            <td className={styles.bb}>EMAIL</td>
            <td className={styles.bb}>PHONE</td>
            <td className={styles.bb}>RESUME</td>
            <td className={styles.bb}>EXPERIENCE</td>
            <td className={styles.bb}>HIGHEST QUALIFICATION</td>
            <td className={styles.bb}>DATE APPLIED</td>
            <td className={styles.bb}>CURRENT EMPLOYER</td>
            <td className={styles.bb}>EXPECTED SALARY</td>
            <td className={styles.bb}>CURRENT SALARY</td>
            <td className={styles.bb}>ACTION</td>
          </tr>
        </thead>
        <tbody>
          {data?.candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>
                <div className={styles.user}>
                 <Link href={`/dashboard/candidates/${candidate._id}/view`}>
                 <h4>
                  {`${candidate.firstname} ${candidate.lastname}`}
                  </h4>
                  <span>{candidate.jobTitle}</span>
                 </Link> 
                </div>
              </td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>
                <div className={styles.user}>
                  {/* <iframe
                    src={`${candidate.img}#page=1` || "/nofile.jpeg"}
                    alt=""
                    width={100}
                    height={100}
                    className={styles.userImage}
                  ></iframe> */}
                  <Link target="_blank" href={candidate.img}>
                    <PDFIcon />
                  </Link>
                  
                </div>
              </td>
              <td>{candidate.experience}</td>
              <td>{candidate.highestQualification}</td>
              <td>{candidate.createdAt?.toString().slice(0, 10)}</td>
              <td>{candidate.employer}</td>
              <td>${candidate.expectedSalary}</td>
              <td>${candidate.currentSalary}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/candidates/${candidate._id}/view`} >
                    <button className={`${styles.button} ${styles.view}`} title="View Candidate">
                      <MdOutlineViewAgenda title="View Candidate"/>
                    </button>
                  </Link>
                  <Link href={`/dashboard/candidates/${candidate._id}`}>
                    <button className={`${styles.button} ${styles.edit}`} title="Edit">
                      <MdOutlineEdit title="Edit"/>
                    </button>
                  </Link>
                  <form action={deleteCandidate}>
                    <input type="hidden" name="id" value={candidate._id} />
                    <button className={`${styles.button} ${styles.delete}`} title="Delete">
                      <MdOutlineDelete title="Delete"/>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={data.count} />
    </div>
  );
};

export default CandidatesPage;

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
