import { Link } from "react-router-dom";



export function EmailPreview({ email }) {

    return (
        <article className="email-preview">
            <Link to={`/email/${email.id}`}>
                <h2>subject:{email.subject}</h2>
                <h4>body: {email.body}</h4>
                <h4>isStarred: {email.isStarred}</h4>
                <h4>isRead: {email.isRead}</h4>
                <h4>removedAt: {email.removedAt}</h4>
                <h4>sentAt: {email.sentAt}</h4>
            </Link>
        </article>
    )
}