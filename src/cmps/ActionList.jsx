import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { emailService } from "../services/email.service.js"
import { MdOutlineStarOutline } from "react-icons/md"
import { IoMailUnreadOutline } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { IoMdArrowBack } from "react-icons/io"

export function ActionList() {
  return (
    <main className="action-list">
      <div>
        <IoMdArrowBack className="react-icon" size={18} />
      </div>
      <div>
        <MdOutlineStarOutline className="react-icon" size={18} />
      </div>
      <div>
        <IoMailUnreadOutline className="react-icon" size={18} />
      </div>
      <div>
        <FaRegTrashAlt className="react-icon" size={18} />
      </div>
    </main>
  )
}
