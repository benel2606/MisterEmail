import { EmailPreview } from "./EmailPreview"

export function EmailList({
  emails,
  onRemoveEmail,
  onIsRead,
  onToggleStarred,
  onArchive,
  onToggleIsRead,
}) {
  return (
    <ul className="email-list">
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
