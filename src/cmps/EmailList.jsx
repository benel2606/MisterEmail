import { EmailPreview } from "./EmailPreview"
import { EmailListAction } from "./EmailListAction"

export function EmailList({
  emails,
  onRemoveEmail,
  onIsRead,
  onToggleStarred,
  onArchive,
  onToggleIsRead,
  sortBy,
  setSortBy,
}) {
  return (
    <ul className="email-list">
      <EmailListAction sortBy={sortBy} setSortBy={setSortBy} />
      {emails.map((email) => (
        <li key={email.id}>
          <EmailPreview
            email={email}
            onRemoveEmail={() => onRemoveEmail(email)}
            onIsRead={() => onIsRead(email)}
            onToggleStarred={() => onToggleStarred(email)}
            onArchive={() => onArchive(email)}
            onToggleIsRead={() => onToggleIsRead(email)}
          />
        </li>
      ))}
    </ul>
  )
}
