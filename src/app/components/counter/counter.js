import { useRef, useState } from 'react'
import styles from './counter.module.css'

export const Counter = () => {
    const [count, setCount] = useState(0)
    const [isCounting, setIsCounting] = useState(false)
    const interval = useRef(null)

    const startTimer = () => {
        interval.current = setInterval(() => {
            setIsCounting(true)
            setCount((count) => Math.round((count + .1) * 10) / 10)
        }, 100);
    }

    const stopTimer = () => {
        clearInterval(interval.current)
        setIsCounting(false)
    }

    const reset = () => {
        setCount(0)
    }
    const stop = () => {
        reset()
        stopTimer()
    }

    return (
        <div className={styles.Counter}>
            <p className={styles.count}>{count}</p>
            <div className={styles.actions}>
                {!isCounting && count === 0 && <button onClick={startTimer} className={styles.actionBtn}>Start</button>}
                {count > 0 && (
                    isCounting
                        ? <button onClick={stopTimer} className={styles.actionBtn}>Pause</button>
                        : <button onClick={startTimer} className={styles.actionBtn}>Resume</button>
                )
                }
                {count > 0 && <>
                    <button onClick={reset} className={styles.actionBtn}>Reset</button>
                    <button onClick={stop} className={styles.actionBtn}>Stop</button>
                </>
                }
            </div>
        </div>
    )
}