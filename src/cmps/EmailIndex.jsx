import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList"
import { AppHeader } from "../cmps/AppHeader"
import { EmailFolderList } from "../cmps/EmailFolderList"

// import { EmailFilter } from "../cmps/EmailFilter"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
  const params = useParams()

  useEffect(() => {
    loadEmails()
  }, [filterBy])

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy)
      setEmails(emails)
    } catch (error) {
      console.log("Having issues with loading emails:", error)
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      await emailService.remove(emailId)
      setEmails((prevEmails) =>
        prevEmails.filter((email) => email.id !== emailId)
      )
    } catch (error) {
      console.log("Having issues removing email:", error)
    }
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function onIsRead(email) {
    console.log("onIsRead", email)
  }

  async function onToggleStarred(email) {
    try {
      console.log("onToggleStarred", email)
      await emailService.update({ ...email, isStarred: !email.isStarred })
      loadEmails()
    } catch (error) {
      console.log("Having issues starred email:", error)
    }
  }

  async function onIsRead(email) {
    try {
      console.log("onIsRead", email)
      await emailService.update({ ...email, isRead: !email.isRead })
      loadEmails()
    } catch (error) {
      console.log("Having issues starred email:", error)
    }
  }

  if (!emails) return <div>Loading...</div>
  return (
    <main className="email-index">
      <AppHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <EmailFolderList />
      {params.emailId ? (
        <Outlet />
      ) : (
        <EmailList
          emails={emails}
          onRemoveEmail={onRemoveEmail}
          onIsRead={onIsRead}
          onToggleStarred={onToggleStarred}
        />
      )}
      {/* <pre>{JSON.stringify(emails, null, 4)}</pre> */}
    </main>
  )
}
