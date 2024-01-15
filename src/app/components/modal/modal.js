import styles from './modal.module.css'

export const Modal = ({ keepOpen, handleOk, handleCancel, heading }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => keepOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.popup}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Dialog</h5>
                    </div>
                    <div className={styles.modalContent}>
                        {heading}
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button className={styles.deleteBtn} onClick={handleOk}>
                                Yes
                            </button>
                            <button className={styles.cancelBtn} onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}