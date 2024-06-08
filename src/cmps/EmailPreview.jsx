import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { emailService } from "../services/email.service.js"
import { EmailPreviewAction } from "./EmailPreviewAction.jsx"

export function EmailPreview({
  email,
  onRemoveEmail,
  onIsRead,
  onToggleStarred,
  onArchive,
}) {
  const location = useLocation()
  let currentLocation = emailService.getCurrentLocation(location)
  const [onHovered, setOnHovered] = useState(false)

  function onClickEmail() {
    onIsRead({ ...email, isRead: true })
  }

  return (
    <article
      className={`email-preview
        ${email.isRead === true ? "is-read" : ""}`}
      onMouseOver={() => setOnHovered(true)}
      onMouseLeave={() => setOnHovered(false)}
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
        <Link to={`/${currentLocation}/${email.id}`} onClick={onClickEmail}>
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
      {onHovered && (
        <EmailPreviewAction
          email={email}
          onRemoveEmail={() => onRemoveEmail(email)}
          onIsRead={() => onIsRead(email)}
          onArchive={() => onArchive(email)}
        />
      )}
    </article>
  )
}
