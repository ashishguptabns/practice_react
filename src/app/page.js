"use client"

import { useState } from 'react'
import styles from './page.module.css'
import { Modal } from './components/modal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className={styles.main}>
      <div className={styles.center}>
        {!isModalOpen && <button className={styles.modalBtn} onClick={() => setIsModalOpen(true)}>Shared Modal</button>}
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  )
}
