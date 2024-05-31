import { HiOutlineInbox } from "react-icons/hi2";
import { CiStar } from "react-icons/ci";
import { RiSendPlane2Line } from "react-icons/ri";
import { LuMails } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import React from 'react'

export function EmailFolderList () {
  return (
    <div className='email-folder-list'>
      <button><MdEdit className="react-icon" size={20}/>Compose</button>
      <div><HiOutlineInbox className="react-icon" size={20}/>
        Inbox
      </div>
      <div><CiStar className="react-icon" size={20}/>
        Starred
      </div>
      <div><RiSendPlane2Line className="react-icon" size={20}/>
        Sent
      </div>
      <div><LuMails className="react-icon" size={20}/>
        All Mail
      </div>
      <div><FaRegTrashAlt className="react-icon" size={20}/>
        Trash
      </div>
    </div>
  )
}
