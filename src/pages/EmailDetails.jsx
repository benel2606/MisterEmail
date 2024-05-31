import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { emailService } from "../services/email.service.js"

export function EmailDetails() {

    const [email, setEmail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        const email = await emailService.getById(params.emailId)
        setEmail(email)
    }
    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <h4>{email.subject}</h4>
            <h4>{email.body}</h4>
            <h4>{email.isStarred}</h4>
            <h4>{email.isRead}</h4>
            <h4>{email.removedAt}</h4>
            <h4>{email.sentAt}</h4>       
        </section>
    )
}
