import { useEffect, useState } from "react"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList"
// import { EmailFilter } from "../cmps/EmailFilter"

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    useEffect(() => {
        loadEmails()
    }, [])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (error) {
            console.log('Having issues with loading emails:', error)
        }
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
        } catch (error) {
            console.log('Having issues removing email:', error)
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }


    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            {/* <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} /> */}
            <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
            {/* <pre>{JSON.stringify(emails, null, 4)}</pre> */}
        </section>
    )
}