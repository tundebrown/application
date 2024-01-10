import React from 'react'
import styles from './page.module.css';
import { FaNetworkWired, FaUserCircle, FaUserFriends, FaUserShield } from 'react-icons/fa';
import { MdHomeWork, MdWork, MdWorkHistory } from 'react-icons/md';
import Link from 'next/link';

const Setting = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h3>Settings</h3>
        </div>
        <div className={styles.content}>
            <div className={styles.subHeading}>
                <h5>Account Management</h5>
            </div>
            <div className={styles.subContent}>
                <div className={styles.itemContainer}>
                    <Link href="/dashboard/settings/users" className={styles.itemIcon} >
                    <FaUserCircle />
                    </Link>
                    <span>Users</span>
                </div>
                <div className={styles.itemContainer}>
                    <div className={styles.itemIcon}>
                    <FaUserShield />
                    </div>
                    <span>Account</span>
                </div>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.subHeading}>
                <h5>CRM Process Customiztion</h5>
            </div>
            <div className={styles.subContent2}>
                <div className={styles.itemContainer}>
                    <div className={styles.itemIcon} >
                    <FaNetworkWired />
                    </div>
                    <span>Hiring Pipeline</span>
                </div>
                <div className={styles.itemContainer}>
                    <div className={styles.itemIcon}>
                    <MdWorkHistory />
                    </div>
                    <span>Job Status</span>
                </div>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.subHeading}>
                <h5>Data Customization</h5>
            </div>
            <div className={styles.subContent3}>
                <div className={styles.itemContainer}>
                    <div className={styles.itemIcon} >
                    <FaUserFriends />
                    </div>
                    <span>Candidate Fields</span>
                </div>
                <div className={styles.itemContainer}>
                    <div className={styles.itemIcon}>
                    <MdWork />
                    </div>
                    <span>Job Fields</span>
                </div>
                <div className={styles.itemContainer}>
                    <div className={styles.itemIcon}>
                    <MdHomeWork />
                    </div>
                    <span>Company Fields</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Setting