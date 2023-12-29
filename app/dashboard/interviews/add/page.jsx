import ButtonPrimary from '@/app/ui/widgets/button/page'
import styles from './page.module.css'
import ButtonLight from '@/app/ui/widgets/buttonLight/page'

const AddFormalInterview = () => {
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
                        <select name="intName" id="intName">
                            <option value="General Interview">General Interview</option>
                            <option value="External Interview">External Interview</option>
                            <option value="Internal Interview">Internal Interview</option>
                        </select>
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="clientName">Client Name</label>
                        <input type="text" name='clientName' id='clientName' />
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
                    <div className={styles.inputField}>
                        <label htmlFor="location">Location</label>
                        <input type="text" name='location' id='location' />
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
                        <label htmlFor="assessmentName">Assessment Name</label>
                        <input type="text" name='assessmentName' id='assessmentName' />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="attachment">Attachment</label>
                        <input type="file" name='attachment' id='attachment' />
                    </div>
                </div>

            </div>
                <div className={styles.buttons}>
                    <ButtonPrimary type="submit">
                        Save
                    </ButtonPrimary>

                    <ButtonLight>Cancel</ButtonLight>
                </div>
        </form>
    </div>
  )
}

export default AddFormalInterview