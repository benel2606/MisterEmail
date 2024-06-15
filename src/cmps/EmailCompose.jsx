import React from "react"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { emailService } from "../services/email.service"
import { IoMdClose } from "react-icons/io"
import { useSaveToDraft } from "../customHooks/useSaveToDraft.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"

export function EmailCompose({
  onAddEmail,
  onUpdateEmail,
  searchParams,
  folder,
}) {
  const [draftEmail, setDraftEmail] = useState(emailService.createMail())

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const mailId = searchParams.get("compose")
    if (mailId && mailId !== "new") {
      emailService.getById(mailId).then(setDraftEmail)
    }
  }, [])

  const onCancelSaveToDraft = useSaveToDraft(draftEmail, onSaveDraft)

  async function onSaveDraft(mail) {
    try {
      if (!mail.id) {
        const addedMail = await onAddEmail(mail)
        setDraftEmail(addedMail)
      } else {
        onUpdateEmail({ ...mail })
      }
      showErrorMsg("Draft saved")
    } catch (err) {
      console.log("err:", err)
      showErrorMsg("Error saving draft")
    }
  }
  function changeHandle(ev) {
    let { name: field, value, type } = ev.target
    if (type == "number") {
      value = +value
    }
    setDraftEmail((prevEmail) => ({
      ...prevEmail,
      [field]: value,
      isDraft: true,
    }))
  }

  async function onSendMail(ev) {
    ev.preventDefault()
    onCancelSaveToDraft()
    await onSaveDraft({ ...draftEmail, sentAt: Date.now(), isDraft: false })
    navigate(`/${folder}`)
  }
  const { subject, body, toEmail } = draftEmail
  return (
    <section className="email-compose">
      <header>
        <div>New Mail</div>
        <div
          className="close-compose"
          onClick={() => navigate("/" + params.folder)}
        >
          <IoMdClose />
        </div>
      </header>
      <main>
        <form onSubmit={onSendMail}>
          <input
            value={toEmail}
            onChange={changeHandle}
            type="email"
            placeholder="Recipients"
            name="toEmail"
          ></input>
          <input
            value={subject}
            onChange={changeHandle}
            type="text"
            placeholder="Subject"
            name="subject"
          ></input>
          <div className="textwrapper">
            <textarea
              value={body}
              onChange={changeHandle}
              cols="2"
              rows="10"
              id="body"
              name="body"
            />
          </div>
          <button>send mail</button>
        </form>
      </main>
    </section>
  )
}
