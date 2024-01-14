"use client"

import { useState } from 'react'
import styles from './page.module.css'
import { Modal } from './components/modal'
import useConfirm from './hooks/useConfirm'

export default function Home() {
  const { triggerConfirm, ConfirmDialog } = useConfirm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shouldDelete, setShouldDelete] = useState(false)

  const handleDelete = async () => {
    const shouldDelete = await triggerConfirm("Do you want to delete it?");
    console.debug(shouldDelete);
    setShouldDelete(shouldDelete);
  };

  return (
    <div className={styles.main}>
      <div className={styles.center}>
        {
          !isModalOpen &&
          <button className={styles.modalBtn} onClick={() => setIsModalOpen(true)}>Shared Modal</button>
        }
        {
          !isModalOpen &&
          <div className={styles.windowConfirm}>
            <p>Window.Confirm feature</p>
            <br />
            <button onClick={() => handleDelete()}>Delete</button>
            <br />
            <br />
            <p>Should Delete: {shouldDelete ? "Confirmed" : "Not yet"}</p>
            <ConfirmDialog />
          </div>
        }
        {
          isModalOpen &&
          <Modal
            keepOpen={setIsModalOpen}
            handleCancel={() => setIsModalOpen(false)}
            handleOk={() => setIsModalOpen(false)}
            heading={"This is a shared Modal"}
          />
        }
      </div>
    </div>
  )
}
