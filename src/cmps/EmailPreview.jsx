import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { emailService } from "../services/email.service.js"

export function EmailPreview({ email, onRemoveEmail ,onIsStarred}) {
    const [isStarred,setIsStarred]=useState(email.isStarred)
    const [isRead,setIsRead]=useState(email.isRead)
    
    function onIsStarred(e){
        e.preventDefault();
        setIsStarred((isStarred)=>!isStarred)
        email.isStarred = isStarred
        emailService.update(email)
        //onIsStarred()
    }
    function formattedDate(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString()
        return formattedDate
    }

    function onIsRead(e) {
        console.log(isRead)
        // setIsRead((isRead)=>!isRead)
        email.isRead = true
        emailService.update(email)
        console.log(isRead)
    }

    return (
        <article className={email.isRead===true?"email-preview":"email-preview is-read"}>
            <div className="email-preview-container">
                <input type="checkbox"></input>
                <div className="star-icon-btn" onClick={onIsStarred}>
                    {email.isStarred===true?<AiFillStar className="react-icon" color={"rgb(214 222 7)"} size={20}/>:<AiOutlineStar className="react-icon" color={"#00000073"} size={20}/>}
                </div>
                <Link to={`/email/${email.id}`} onClick={onIsRead}>
                    <div>{email.subject}</div>
                    <div>{email.body}</div>
                    <div>{formattedDate(email.sentAt)}</div>
                </Link>
            </div>
            <div onClick={() => onRemoveEmail(email.id)}><MdDelete className="react-icon before-padding" size={20}/></div>
        </article>
    )
}