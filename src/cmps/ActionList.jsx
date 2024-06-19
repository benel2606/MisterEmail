import { useLocation, useNavigate } from "react-router-dom"
import { MdOutlineStarOutline } from "react-icons/md"
import { IoMailUnreadOutline } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { IoMdArrowBack } from "react-icons/io"

export function ActionList() {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.pathname.split("/")[1])
  function goBack() {
    const lastFolder = location.pathname.split("/")[1]
    const url = `/${lastFolder}?txt=&status=${lastFolder}&compose=`
    navigate(url)
  }
  return (
    <main className="action-list">
      <div onClick={goBack}>
        <IoMdArrowBack className="react-icon" size={18} />
      </div>
      {/* <div>
        <MdOutlineStarOutline className="react-icon" size={18} />
      </div>
      <div>
        <IoMailUnreadOutline className="react-icon" size={18} />
      </div>
      <div>
        <FaRegTrashAlt className="react-icon" size={18} />
      </div> */}
    </main>
  )
}
