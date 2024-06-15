import { useEffect, useRef } from "react"

export function useSaveToDraft(mailToEdit, onSaveDraft) {
    const timeoutRef = useRef()
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        timeoutRef.current = setTimeout(() => onSaveDraft(mailToEdit), 5000)
    }, [mailToEdit])


    return () => clearTimeout(timeoutRef.current)
}