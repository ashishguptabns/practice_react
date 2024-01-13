import styles from './modal.module.css'

export const Modal = ({ setIsModalOpen }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => { setIsModalOpen(false) }} />
            <div className={styles.popup}>
                <div className={styles.heading}>
                    This is a shared modal
                </div>
                <div className={styles.actions}>
                    <button onClick={() => { setIsModalOpen(false) }}>Close</button>
                </div>
            </div>
        </>
    )
}