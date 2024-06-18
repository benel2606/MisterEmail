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
  collapse,
}) {
  return (
    <ul className={`email-list ${collapse ? "toggle-collapse-mobile" : ""}`}>
      <EmailListAction sortBy={sortBy} setSortBy={setSortBy} />
      <ul>
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
    </ul>
  )
}
