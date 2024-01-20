"use client"

import React from "react";
import { useState } from 'react'
import styles from './page.module.css'
import { Modal } from './components/modal/modal'
import { WindowConfirm } from './components/window_confirm/view'
import { Counter } from './components/counter/counter'
import { Carousel } from './components/carousal/carousal'
import people from './components/carousal/data'
import Link from "next/link";
import useTheme from "./hooks/useTheme";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()

  return (
    <div className={styles.main}>
      <div className={styles.center}>
        {
          !isModalOpen &&
          <>
            <button className={styles.modalBtn} onClick={toggleTheme}>Toggle Theme</button>
            <Link href={`/todo/`}>
              <button className={styles.modalBtn}>Todo</button>
            </Link>
            <button className={styles.modalBtn} onClick={() => setIsModalOpen(true)}>Shared Modal</button>
            <WindowConfirm />
            <Counter />
            <Carousel people={people} />
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
