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
import { showSuccessMsg } from "../services/event-bus.service"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromSearchParams(searchParams)
  )
  const [unreadEmailCounter, setUnreadEmailCounter] = useState({})
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
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      ...filterBy,
      status: params.folder,
    }))
    loadEmails()
  }, [params.folder])

  async function loadEmails() {
    try {
      updateCounters()
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
        showSuccessMsg("Conversation deleted forever.")
      } else {
        await emailService.update({
          ...email,
          removedAt: Date.now(),
          folder: "trash",
        })
        showSuccessMsg("Conversation moved to Trash.")
      }
      updateCounters()
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
  async function updateCounters() {
    const emails = await emailService.query({ txt: "", status: "" })
    setUnreadEmailCounter(emailService.countUnreadEmails(emails))
    console.log("unreadEmailCounter", unreadEmailCounter)
  }
  async function onToggleStarred(email) {
    try {
      await emailService.update({ ...email, isStarred: !email.isStarred })
      loadEmails()
    } catch (error) {
      console.log("Having issues starred email:", error)
    }
  }

  async function onToggleIsRead(email) {
    console.log("onToggleIsRead", email)
    try {
      await emailService.update({ ...email, isRead: !email.isRead })
      loadEmails()
    } catch (error) {
      console.log("Having issues isRead email:", error)
    }
  }

  async function onIsRead(email) {
    console.log("onIsRead", email)
    try {
      if (email.isRead === true) return
      await emailService.update({ ...email, isRead: !email.isRead })
      loadEmails()
    } catch (error) {
      console.log("Having issues isRead email:", error)
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
      <EmailFolderList
        emailComposeHandle={emailComposeHandle}
        unreadEmailCounter={unreadEmailCounter}
      />
      {params.emailId ? (
        <Outlet />
      ) : (
        <EmailList
          emails={emails}
          onRemoveEmail={onRemoveEmail}
          onIsRead={onIsRead}
          onToggleStarred={onToggleStarred}
          onArchive={onArchive}
          onToggleIsRead={onToggleIsRead}
        />
      )}
      {isEmailCmposeShow && (
        <EmailCompose emailComposeHandle={emailComposeHandle} />
      )}
    </main>
  )
}
