"use client"

import { useState } from 'react'
import styles from './page.module.css'
import { Modal } from './components/modal/modal'
import { WindowConfirm } from './components/window_confirm/view'
import { Counter } from './components/counter/counter'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={styles.main}>
      <div className={styles.center}>
        {
          !isModalOpen &&
          <>
            <button className={styles.modalBtn} onClick={() => setIsModalOpen(true)}>Shared Modal</button>
            <br />
            <WindowConfirm />
            <br />
            <Counter />
          </>
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
