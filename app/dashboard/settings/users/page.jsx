"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "@/app/ui/dashboard/jobs/jobs.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { deleteJob } from "@/app/lib/actions";
// import { fetchJobs } from "@/app/lib/data";
import {
  MdAdd,
  MdCopyAll,
  MdInfo,
  MdOutlineArrowDropDown,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineMenu,
  MdOutlineViewAgenda,
} from "react-icons/md";
import ButtonLight from "@/app/ui/widgets/buttonLight/page";
import Loading from "@/app/ui/widgets/loading/page";

const Users = ({ searchParams }) => {
  const [data, setData] = useState(null);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, jobs } = await fetchJobs(q, page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/getQueryUser", {
          params: {
            q: q, // replace with your actual query
            page: page, // replace with the desired page number
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [q, page]);

  if (!data) {
    return (
      <div style={{position:"fixed", right: "50%", top:"30%"}}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <h4>
            All Users <MdOutlineArrowDropDown />
          </h4>
        </div>
        <div className={styles.filter}>
          <Search placeholder="Search for a user..." />
          {/* <button className={styles.otherButton}>
            <MdOutlineMenu />
          </button> */}
          <Link href="/dashboard/settings/users/inviteUser">
            <button className={styles.otherButton}>
              <MdInfo /> Invite User
            </button>
          </Link>
          <Link href="/dashboard/settings/users/createUser">
            <button className={styles.addButton}>
              <MdAdd /> Create New User
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.scrollableTableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <td className={styles.bb}>NAME</td>
              <td className={styles.bb}>EMAIL</td>
              <td className={styles.bb}>ROLE</td>
              <td className={styles.bb}>ACCOUNT</td>
              <td className={styles.bb}>STATUS</td>
              <td className={styles.bb}>LAST LOGIN</td>
              <td className={styles.bb}>EDIT</td>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => (
              <tr key={user._id}>
                <td>
                  <Link href={`/dashboard/users/${user._id}/view`}>
                    {`${user.username} ${user.lastname}`}
                  </Link>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.account}</td>
                <td>{user.status}</td>
                <td>{user.createdAt?.toString().slice(0, 10)}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/settings/users/${user._id}/view`}>
                      <button
                        className={`${styles.button} ${styles.view}`}
                        title="view user"
                      >
                        <MdOutlineViewAgenda />
                      </button>
                    </Link>
                    <Link href={`/dashboard/settings/users/${user._id}`}>
                      <button
                        className={`${styles.button} ${styles.edit}`}
                        title="edit user"
                      >
                        <MdOutlineEdit />
                      </button>
                    </Link>
                    {/* <form action={deleteJob}> */}
                    <form>
                      <input type="hidden" name="id" value={user._id} />
                      <button
                        className={`${styles.button} ${styles.delete}`}
                        title="delete user"
                      >
                        <MdOutlineDelete />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination count={data.count} />
    </div>
  );
};

export default Users;
