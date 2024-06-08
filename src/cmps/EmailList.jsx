import { EmailPreview } from "./EmailPreview"

export function EmailList({
  emails,
  onRemoveEmail,
  onIsRead,
  onToggleStarred,
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
          />
          {/* <section className="email-actions">
                        <button onClick={() => onRemoveEmail(email.id)}>X</button>
                    </section> */}
        </li>
      ))}
    </ul>
  )
}
