import { useEffect, useRef, useState } from "react"
import { IoMdSearch } from "react-icons/io"
import { emailService } from "../services/email.service"
import { MdEdit } from "react-icons/md"

export function EmailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const formRef = useRef()

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === "number" ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { txt } = filterByToEdit
  return (
    <form ref={formRef} onSubmit={onSubmitFilter} className="email-filter">
      <section>
        <div className="search-form-input">
          <span>
            <IoMdSearch className="react-icon" size={20} />
          </span>
          <input
            placeholder="Search mail"
            onChange={handleChange}
            name="txt"
            id="search"
            type="text"
            value={txt}
          />
        </div>
      </section>
    </form>
  )
}
