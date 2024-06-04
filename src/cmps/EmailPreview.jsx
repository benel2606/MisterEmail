import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineStar } from "react-icons/ai"
import { AiFillStar } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { emailService } from "../services/email.service.js"

export function EmailPreview({
  email,
  onRemoveEmail,
  onIsRead,
  onToggleStarred,
}) {
  const location = useLocation()
  let currentLocation = emailService.getCurrentLocation(location)

  return (
    <article
      className={
        email.isRead === true ? "email-preview" : "email-preview is-read"
      }
    >
      <div className="email-preview-container">
        <input type="checkbox"></input>
        <div className="star-icon-btn" onClick={onToggleStarred}>
          {email.isStarred === true ? (
            <AiFillStar
              className="react-icon"
              color={"rgb(214 222 7)"}
              size={20}
            />
          ) : (
            <AiOutlineStar
              className="react-icon"
              color={"#00000073"}
              size={20}
            />
          )}
        </div>
        <Link to={`/${currentLocation}/${email.id}`} onClick={onIsRead}>
          <div>{email.fromName}</div>
          <div>
            {email.subject}
            <span>
              -{" "}
              {email.body.length > 100
                ? email.body.substring(0, 100) + "..."
                : email.body}
            </span>
          </div>
          <div>{emailService.formattedDate(email.sentAt, "EmailPreview")}</div>
        </Link>
      </div>
      <div onClick={() => onRemoveEmail(email.id)}>
        <MdDelete className="react-icon before-padding" size={20} />
      </div>
    </article>
  )
}
