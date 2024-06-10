import { Link, useLocation } from "react-router-dom"
import { MdDelete, MdOutlineMarkEmailUnread, MdArchive } from "react-icons/md"
import { GoRead } from "react-icons/go"

export function EmailPreviewAction({
  email,
  onRemoveEmail,
  onToggleIsRead,
  onArchive,
}) {
  const location = useLocation()
  return (
    <article className="email-preview-action">
      <div onClick={onRemoveEmail}>
        <MdDelete size={20} />
      </div>
      <div onClick={onToggleIsRead}>
        {email.isRead ? (
          <GoRead size={20} />
        ) : (
          <MdOutlineMarkEmailUnread size={20} />
        )}
      </div>
      <div onClick={onArchive}>
        <MdArchive size={20} />
      </div>
    </article>
  )
}
