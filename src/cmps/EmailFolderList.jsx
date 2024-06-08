import { HiOutlineInbox } from "react-icons/hi2"
import { MdOutlineStarOutline } from "react-icons/md"
import { RiSendPlane2Line } from "react-icons/ri"
import { LuMails } from "react-icons/lu"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"

import { Link, NavLink, useLocation } from "react-router-dom"
import React from "react"

export function EmailFolderList({ emailComposeHandle }) {
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
        Inbox
      </NavLink>
      <NavLink className="email-folder-nav" to={`/starred${searchParams}`}>
        <MdOutlineStarOutline className="react-icon" size={20} />
        Starred
      </NavLink>
      <NavLink className="email-folder-nav" to={`/sent${searchParams}`}>
        <RiSendPlane2Line className="react-icon" size={20} />
        Sent
      </NavLink>
      <NavLink className="email-folder-nav" to={`/all-mail${searchParams}`}>
        <LuMails className="react-icon" size={20} />
        All Mail
      </NavLink>
      <NavLink className="email-folder-nav" to={`/trash${searchParams}`}>
        <FaRegTrashAlt className="react-icon" size={20} />
        Trash
      </NavLink>
    </div>
  )
}
