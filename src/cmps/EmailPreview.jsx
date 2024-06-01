import { Link } from "react-router-dom";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export function EmailPreview({ email, onRemoveEmail }) {

    return (
        <article className="email-preview">
            <div className="email-preview-container">
                <input type="checkbox"></input>
                <MdOutlineStarOutline size={20}/>
                <Link to={`/email/${email.id}`}>
                    <h4>{email.subject}</h4>
                    <h4>{email.body}</h4>
                    <h4>{email.isStarred}</h4>
                    <h4>{email.isRead}</h4>
                    <h4>{email.removedAt}</h4>
                    <h4>{email.sentAt}</h4>
                </Link>
            </div>
            <div onClick={() => onRemoveEmail(email.id)}><MdDelete className="react-icon before-padding" size={20}/></div>
        </article>
    )
}