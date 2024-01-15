import { Modal } from "../components/modal/modal"

const { useRef, useState } = require("react")

export default function useConfirm() {
    const awaitingPromiseRef = useRef(null)
    const [showDialog, setShowDialog] = useState(false)
    const [content, setContent] = useState("Sure to delete?")

    const triggerConfirm = (content) => {
        setShowDialog(true)
        setContent(content)

        return new Promise((res) => {
            awaitingPromiseRef.current = res
        })
    }

    const ConfirmDialog = () => {
        const cancel = () => {
            awaitingPromiseRef.current(false)
            setShowDialog(false)
        }
        const approve = () => {
            awaitingPromiseRef.current(true)
            setShowDialog(false)
        }
        if (!showDialog) {
            return null
        } else {
            return <Modal handleCancel={() => cancel()} handleOk={() => approve()} heading={content} keepOpen={showDialog} />
        }
    }
    return { triggerConfirm, ConfirmDialog }
}

