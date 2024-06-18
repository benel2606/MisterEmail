import { HiOutlineInbox } from "react-icons/hi2"
import { MdOutlineStarOutline } from "react-icons/md"
import { RiSendPlane2Line } from "react-icons/ri"
import { LuMails } from "react-icons/lu"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { IoDocumentOutline } from "react-icons/io5"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import React from "react"
import { BiCollapse } from "react-icons/bi"

export function EmailFolderList({
  currentLocation,
  searchParams,
  unreadEmailCounter,
  onUpdateEmail,
  collapse,
}) {
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
  const comoseClass = `compose-label ${collapse ? "is-collapse" : ""} `
  const folderLabelClass = `folder-label ${collapse ? "is-collapse" : ""} `
  const counterClass = `counter ${collapse ? "is-collapse" : ""} `
  return (
    <div
      className={`email-folder-list ${
        collapse ? "toggle-collapse-mobile" : ""
      }`}
    >
      <li onClick={() => buildComposePath()}>
        <button className={`${collapse ? "is-collapse" : ""}`}>
          <MdEdit
            className={`react-icon ${collapse ? "is-collapse" : ""}`}
            size={20}
          />
          <span className={comoseClass}>Compose</span>
        </button>
      </li>
      <li
        className={`email-folder-nav ${isActive("inbox")}`}
        onClick={() => buildFoldersPath("inbox")}
      >
        <HiOutlineInbox className="react-icon" size={20} />
        <span className={folderLabelClass}>Inbox</span>
        <span className={counterClass}>{unreadEmailCounter.inbox}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("starred")}`}
        onClick={() => buildFoldersPath("starred")}
      >
        <MdOutlineStarOutline className="react-icon" size={20} />
        <span className={folderLabelClass}>Starred</span>
        <span className={counterClass}>{unreadEmailCounter.starred}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("sent")}`}
        onClick={() => buildFoldersPath("sent")}
      >
        <RiSendPlane2Line className="react-icon" size={20} />
        <span className={folderLabelClass}>Sent</span>
        <span className={counterClass}>{unreadEmailCounter.sent}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("all-mail")}`}
        onClick={() => buildFoldersPath("all-mail")}
      >
        <LuMails className="react-icon" size={20} />
        <span className={folderLabelClass}>All Mail</span>
        <span className={counterClass}>{unreadEmailCounter.allMail}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("draft")}`}
        onClick={() => buildFoldersPath("draft")}
      >
        <IoDocumentOutline className="react-icon" size={20} />
        <span className={folderLabelClass}>Drafts</span>
        <span className={counterClass}>{unreadEmailCounter.draft}</span>
      </li>
      <li
        className={`email-folder-nav ${isActive("trash")}`}
        onClick={() => buildFoldersPath("trash")}
      >
        <FaRegTrashAlt className="react-icon" size={20} />
        <span className={folderLabelClass}>Trash</span>
        <span className={counterClass}>{unreadEmailCounter.trash}</span>
      </li>
    </div>
  )
}
