import styles from './view.module.css'
import useConfirm from "@/app/hooks/useConfirm";
import { useState } from "react";

export const WindowConfirm = () => {
    const { triggerConfirm, ConfirmDialog } = useConfirm()
    const [shouldDelete, setShouldDelete] = useState(false)
    const handleDelete = async () => {
        const shouldDelete = await triggerConfirm("Do you want to delete it?");
        console.debug(shouldDelete);
        setShouldDelete(shouldDelete);
    };
    return (
        <>
            <div className={styles.windowConfirm}>
                <p>Window.Confirm feature</p>
                <br />
                <button onClick={() => handleDelete()}>Delete</button>
                <br />
                <br />
                <p>Should Delete: {shouldDelete ? "Confirmed" : "Not yet"}</p>
                <ConfirmDialog />
            </div>
        </>
    )
}