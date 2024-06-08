import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {
  useLocation,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList"
import { AppHeader } from "../cmps/AppHeader"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { EmailCompose } from "./EmailCompose.jsx"

// import { EmailFilter } from "../cmps/EmailFilter"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromSearchParams(searchParams)
  )
  const [isEmailCmposeShow, setIsEmailCmposeShow] = useState(false)
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const currentLocation = emailService.getCurrentLocation(location)

  useEffect(() => {
    setSearchParams(filterBy)
    loadEmails()
  }, [filterBy])

  useEffect(() => {
    // setSearchParams({ txt: "", status: params.folder })
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      ...filterBy,
      status: params.folder,
    }))
    loadEmails()
  }, [params.folder])

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy)
      setEmails(emails)
    } catch (error) {
      console.log("Having issues with loading emails:", error)
    }
  }

  async function onRemoveEmail(email) {
    try {
      if (email.removedAt) {
        await emailService.remove(email.id)
      } else {
        await emailService.update({
          ...email,
          removedAt: Date.now(),
          folder: "trash",
        })
      }
      setEmails((prevEmails) =>
        prevEmails.filter((storedEmail) => storedEmail.id !== email.id)
      )
    } catch (error) {
      console.log("Having issues removing email:", error)
    }
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      ...filterBy,
      status: currentLocation,
    }))
    console.log("onSetFilterBy", filterBy)
  }

  async function onToggleStarred(email) {
    try {
      await emailService.update({ ...email, isStarred: !email.isStarred })
      loadEmails()
    } catch (error) {
      console.log("Having issues starred email:", error)
    }
  }

  async function onIsRead(email) {
    try {
      // if (email.isRead === true) return
      await emailService.update({ ...email, isRead: !email.isRead })
      loadEmails()
    } catch (error) {
      console.log("Having issues starred email:", error)
    }
  }

  function emailComposeHandle(isOpen) {
    setIsEmailCmposeShow(isOpen)
  }
  function onArchive(email) {
    console.log("onArchive")
  }

  if (!emails) return <div>Loading...</div>
  return (
    <main className="email-index">
      <AppHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <EmailFolderList emailComposeHandle={emailComposeHandle} />
      {params.emailId ? (
        <Outlet />
      ) : (
        <EmailList
          emails={emails}
          onRemoveEmail={onRemoveEmail}
          onIsRead={onIsRead}
          onToggleStarred={onToggleStarred}
          onArchive={onArchive}
        />
      )}
      {isEmailCmposeShow && (
        <EmailCompose emailComposeHandle={emailComposeHandle} />
      )}
    </main>
  )
}
