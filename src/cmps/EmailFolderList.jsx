import { HiOutlineInbox } from "react-icons/hi2"
import { MdOutlineStarOutline } from "react-icons/md"
import { RiSendPlane2Line } from "react-icons/ri"
import { LuMails } from "react-icons/lu"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"

import { Link, NavLink, useLocation } from "react-router-dom"
import React from "react"

export function EmailFolderList({ emailComposeHandle, unreadEmailCounter }) {
  const location = useLocation()
  const searchParams = location.search
  return (
    <div className="email-folder-list">
      <button onClick={() => emailComposeHandle(true)}>
        <MdEdit className="react-icon" size={20} />
        Compose
      </button>
      <NavLink className="email-folder-nav" to={`/inbox${searchParams}`}>
        <HiOutlineInbox className="react-icon" size={20} />
        <span className="folder-label">Inbox</span>
        <span className="counter">{unreadEmailCounter.inbox}</span>
      </NavLink>
      <NavLink className="email-folder-nav" to={`/starred${searchParams}`}>
        <MdOutlineStarOutline className="react-icon" size={20} />
        <span className="folder-label">Starred</span>
        <span className="counter">{unreadEmailCounter.starred}</span>
      </NavLink>
      <NavLink className="email-folder-nav" to={`/sent${searchParams}`}>
        <RiSendPlane2Line className="react-icon" size={20} />
        <span className="folder-label">Sent</span>
        <span className="counter">{unreadEmailCounter.sent}</span>
      </NavLink>
      <NavLink className="email-folder-nav" to={`/all-mail${searchParams}`}>
        <LuMails className="react-icon" size={20} />
        <span className="folder-label">All Mail</span>
        <span className="counter">{unreadEmailCounter.allMail}</span>
      </NavLink>
      <NavLink className="email-folder-nav" to={`/trash${searchParams}`}>
        <FaRegTrashAlt className="react-icon" size={20} />
        <span className="folder-label">Trash</span>
        <span className="counter">{unreadEmailCounter.trash}</span>
      </NavLink>
    </div>
  )
}
