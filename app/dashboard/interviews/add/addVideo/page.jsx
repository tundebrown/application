import ButtonPrimary from '@/app/ui/widgets/button/page'
import styles from '../page.module.css'
import { MdAdd, MdMeetingRoom } from 'react-icons/md'
import ButtonSeondary from '@/app/ui/widgets/buttonSecondary/page'
import Image from 'next/image'
import ButtonLight from '@/app/ui/widgets/buttonLight/page'

const AddVideoInterview = () => {
  return (
    <div className={styles.container}>
        <div className={styles.subTitle}>
            <p>Interview Information</p>
        </div>
        <form action="" >
            <div className={styles.formContainer}>
                <div className={styles.leftpane}>
                    <div className={styles.inputField}>
                        <label htmlFor="intName">Interview Name</label>
                        <input type="text" name='intName' id='intName' />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="provider">Provider</label>
                        <select name="provider" id="provider">
                            <option value="Google Meet"> Google Meet</option>
                        </select>
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="dateFrom">From</label>
                        <input className={styles.date} type="date" name='dateFrom' id='dateFrom' />
                        <input className={styles.date} type="time" name='timeFrom' id='timeFrom' />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="dateTo">To</label>
                        <input className={styles.date} type="date" name='dateTo' id='dateTo' />
                        <input className={styles.date} type="time" name='timeTo' id='timeTo' />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="interviewers">Interviewers</label>
                        <input type="text" name='interviewers' id='interviewers' />
                    </div>
                </div>

                <div className={styles.rightpane}>
                    <div className={styles.inputField}>
                        <label htmlFor="candidateName">Candidate Name</label>
                        <input type="text" name='candidateName' id='candidateName' />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="postingTitle">Posting Title</label>
                        <input type="text" name='postingTitle' id='postingTitle' />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="interviewOwner">Interview Owner</label>
                        <input type="text" name='interviewOwner' id='interviewOwner' />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="comment">Schedule Comments</label>
                        <input type="text" name='comment' id='comment' />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="attachment"></label>
                        <ButtonLight> <Image src="/images/googlemeet.png" width="30" height="20" alt='connect google meet' /> Connect Google Meet</ButtonLight>
                    </div>
                </div>

            </div>
                <div className={styles.buttons}>
                    <ButtonPrimary type="submit">
                        Schedule
                    </ButtonPrimary>

                    <ButtonLight>Cancel</ButtonLight>
                </div>
        </form>
    </div>
  )
}

export default AddVideoInterview