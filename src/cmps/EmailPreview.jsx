import { Link } from "react-router-dom";

export function EmailPreview({ email, onRemoveEmail }) {

    return (
        <article className="email-preview">
            <Link to={`/email/${email.id}`}>
                <h4>{email.subject}</h4>
                <h4>{email.body}</h4>
                <h4>{email.isStarred}</h4>
                <h4>{email.isRead}</h4>
                <h4>{email.removedAt}</h4>
                <h4>{email.sentAt}</h4>
            </Link>
            <button onClick={() => onRemoveEmail(email.id)}>X</button>
        </article>
    )
}