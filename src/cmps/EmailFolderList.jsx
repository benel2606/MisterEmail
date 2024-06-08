import { HiOutlineInbox } from "react-icons/hi2"
import { MdOutlineStarOutline } from "react-icons/md"
import { MdOutlineStar } from "react-icons/md"
import { RiSendPlane2Line } from "react-icons/ri"
import { LuMails } from "react-icons/lu"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"

import { Link, NavLink } from "react-router-dom"
import React from "react"

export function EmailFolderList({ emailComposeHandle }) {
  return (
    <div className="email-folder-list">
      <button onClick={() => emailComposeHandle(true)}>
        <MdEdit className="react-icon" size={20} />
        Compose
      </button>
      <NavLink className="email-folder-nav" to="/">
        <HiOutlineInbox className="react-icon" size={20} />
        Inbox
      </NavLink>
      <NavLink className="email-folder-nav" to="/starred">
        <MdOutlineStarOutline className="react-icon" size={20} />
        Starred
      </NavLink>
      <NavLink className="email-folder-nav" to="/sent">
        <RiSendPlane2Line className="react-icon" size={20} />
        Sent
      </NavLink>
      <NavLink className="email-folder-nav" to="/all-mail">
        <LuMails className="react-icon" size={20} />
        All Mail
      </NavLink>
      <NavLink className="email-folder-nav" to="/trash">
        <FaRegTrashAlt className="react-icon" size={20} />
        Trash
      </NavLink>
    </div>
  )
}
