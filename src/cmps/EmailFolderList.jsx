import { HiOutlineInbox } from "react-icons/hi2"
import { MdOutlineStarOutline } from "react-icons/md"
import { RiSendPlane2Line } from "react-icons/ri"
import { LuMails } from "react-icons/lu"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { IoDocumentOutline } from "react-icons/io5"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import React from "react"

export function EmailFolderList({
  currentLocation,
  searchParams,
  unreadEmailCounter,
  onUpdateEmail,
}) {
  // const location = useLocation()
  // const searchParams = location.search
  console.log(searchParams.get("status"))
  // const composeState = searchParams.get("compose")
  const navigate = useNavigate()

  function buildFoldersPath(path) {
    if (path === currentLocation) return
    const composeState = searchParams.get("compose")
    const url =
      `/${path}?txt=${searchParams.get("txt")}&status=${searchParams.get(
        "status"
      )}` + (composeState ? `&compose=${composeState}` : "")
    navigate(url)
  }
  function buildComposePath() {
    const url = `/${searchParams.get(
      "status"
    )}?compose=new&txt=${searchParams.get("txt")}&status=${searchParams.get(
      "status"
    )}`
    navigate(url)
  }
  function isActive(folder) {
    return currentLocation == folder ? "active" : ""
  }
  return (
    <div className="email-folder-list">
      <li onClick={() => buildComposePath()}>
        <button>
          <MdEdit className="react-icon" size={20} />
          Compose
        </button>
      </li>
      <li
        className={`email-folder-nav ${isActive("inbox")}`}
        onClick={() => buildFoldersPath("inbox")}
      >
        <HiOutlineInbox className="react-icon" size={20} />
        <span className="folder-label">Inbox</span>
        <span className="counter">{unreadEmailCounter.inbox}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("starred")}`}
        onClick={() => buildFoldersPath("starred")}
      >
        <MdOutlineStarOutline className="react-icon" size={20} />
        <span className="folder-label">Starred</span>
        <span className="counter">{unreadEmailCounter.starred}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("sent")}`}
        onClick={() => buildFoldersPath("sent")}
      >
        <RiSendPlane2Line className="react-icon" size={20} />
        <span className="folder-label">Sent</span>
        <span className="counter">{unreadEmailCounter.sent}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("all-mail")}`}
        onClick={() => buildFoldersPath("all-mail")}
      >
        <LuMails className="react-icon" size={20} />
        <span className="folder-label">All Mail</span>
        <span className="counter">{unreadEmailCounter.allMail}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("draft")}`}
        onClick={() => buildFoldersPath("draft")}
      >
        <IoDocumentOutline className="react-icon" size={20} />
        <span className="folder-label">Drafts</span>
        <span className="counter">{unreadEmailCounter.draft}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("trash")}`}
        onClick={() => buildFoldersPath("trash")}
      >
        <FaRegTrashAlt className="react-icon" size={20} />
        <span className="folder-label">Trash</span>
        <span className="counter">{unreadEmailCounter.trash}</span>
      </li>
    </div>
  )
}
