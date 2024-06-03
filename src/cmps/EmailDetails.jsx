import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { emailService } from "../services/email.service.js"
import { ActionList } from "./ActionList"

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
    <>
      <main className="email-details">
        <ActionList />
        <div className="subject">{email.subject}</div>
        <div className="details">
          <img
            src="https://lh3.googleusercontent.com/a/default-user=s40-p"
            alt="defult-user"
          />
          <div className="sent-details">
            <div>{email.fromName}</div>
            <div className="from-mail">{`<${email.fromEmail}>`}</div>
            <div>to me</div>
          </div>
          <div className="sent-at">
            {emailService.formattedDate(email.sentAt, "EmailDetasils")}
          </div>
        </div>
        <h4>{email.body}</h4>
      </main>
    </>
  )
}
