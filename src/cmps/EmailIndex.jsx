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
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromSearchParams(searchParams)
  )
  const [unreadEmailCounter, setUnreadEmailCounter] = useState({})
  const [isEmailCmposeShow, setIsEmailCmposeShow] = useState(false)
  const [sortBy, setSortBy] = useState({ sort: "date", direct: true })
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const currentLocation = emailService.getCurrentLocation(location)
  const compose = searchParams.get("compose")

  useEffect(() => {
    //setSearchParams(filterBy)
    renderSearchParams()
    loadEmails()
  }, [filterBy, sortBy, params.folder])

  useEffect(() => {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      ...filterBy,
      status: params.folder,
    }))
    loadEmails()
  }, [params.folder])

  useEffect(() => {
    updateCounters()
  }, [emails])

  async function loadEmails() {
    console.log("loadMails")
    try {
      // updateCounters()
      const emails = await emailService.query(filterBy, sortBy)
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
        })
        showSuccessMsg("Conversation moved to Trash.")
      }
      // updateCounters()
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
    const emails = await emailService.query({ txt: "", status: "" }, sortBy)
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

  function onArchive(email) {
    console.log("onArchive")
  }

  async function onAddEmail(mail) {
    try {
      const savedMail = await emailService.save({ ...mail })
      if (
        (params.folder === "sent" && savedMail.sentAt) ||
        (params.folder === "draft" && !savedMail.sentAt)
      ) {
        setEmails((prevMails) => [savedMail, ...prevMails])
      }
      const msg = !savedMail.sentAt
        ? "Mail saved to draft"
        : "Mail Sent to " + savedMail.to
      showSuccessMsg(msg)
      return savedMail
    } catch (err) {
      showErrorMsg("Sending mail failed")
      console.log("Had issues sending mail", err)
    }
  }
  async function onUpdateEmail(emailToSave) {
    try {
      const updatedMail = await emailService.save(emailToSave)
      if (params.folder === "draft" && updatedMail.sentAt) {
        setEmails((prevMails) =>
          prevMails.filter((m) => m.id !== updatedMail.id)
        )
      } else if (params.folder === "sent" && updatedMail.sentAt) {
        setEmails((prevMails) => [updatedMail, ...prevMails])
      } else {
        console.log("onUpdateMail")
        setEmails((prevMails) =>
          prevMails.map((mail) =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
      }
    } catch (err) {
      showErrorMsg("Can not update mail")
      console.log("Had issues updating mail", err)
    }
  }

  function renderSearchParams() {
    const filterForParams = {
      txt: filterBy.txt || "",
      status: filterBy.status || "inbox",
      compose: searchParams.get("compose") || "",
    }
    setSearchParams(filterForParams)
  }

  if (!emails) return <div>Loading...</div>
  return (
    <main className="email-index">
      <AppHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <EmailFolderList
        currentLocation={currentLocation}
        searchParams={searchParams}
        unreadEmailCounter={unreadEmailCounter}
      />
      {params.emailId ? (
        <Outlet />
      ) : (
        <EmailList
          emails={emails}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onRemoveEmail={onRemoveEmail}
          onIsRead={onIsRead}
          onToggleStarred={onToggleStarred}
          onArchive={onArchive}
          onToggleIsRead={onToggleIsRead}
        />
      )}
      {!!compose && (
        <EmailCompose
          onAddEmail={onAddEmail}
          onUpdateEmail={onUpdateEmail}
          searchParams={searchParams}
          folder={params.folder}
          // emailComposeHandle={emailComposeHandle}
          // onUpdateEmail={onUpdateEmail}
        />
      )}
    </main>
  )
}
