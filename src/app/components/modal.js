import styles from './modal.module.css'

export const Modal = ({ setIsModalOpen }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsModalOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.popup}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Dialog</h5>
                    </div>
                    <div className={styles.modalContent}>
                        Are you sure you want to delete the item?
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button className={styles.deleteBtn} onClick={() => setIsModalOpen(false)}>
                                Delete
                            </button>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}