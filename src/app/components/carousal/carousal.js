import { useEffect, useRef, useState } from 'react'
import styles from './carousal.module.css'

export const Carousel = ({ people }) => {
    const interval = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        start()
        return () => clearInterval(interval.current)
    }, [])
    const start = () => {
        interval.current = setInterval(() => {
            setActiveIndex((prev) => {
                if (prev === people.length - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }, 3000)
    }
    const stop = () => {
        if (interval.current) {
            clearInterval(interval.current)
        }
    }
    return (
        <div className={styles.carousal}>
            {
                people.map((person, index) => {
                    return (
                        <div key={person.id} className={activeIndex === index ? styles.active : styles.inactive}>
                            <img
                                onMouseLeave={start}
                                onMouseOver={stop}
                                src={person.image}
                                alt={person.title}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}