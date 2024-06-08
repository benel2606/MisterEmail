import React from "react"
import { useEffect, useRef, useState } from "react"
import { emailService } from "../services/email.service"
import { IoMdClose } from "react-icons/io"

export function EmailCompose({ emailComposeHandle }) {
  function sendMailHandle(ev) {
    ev.preventDefault()
    let formValues = {
      recipients: ev.target.recipients.value,
      subject: ev.target.subject.value,
      body: ev.target.body.value,
    }
    const loggedUser = emailService.getLoggedUser()
    let emailToSave = emailService.createMail(
      loggedUser.email,
      ev.target.recipients.value,
      loggedUser.fullname,
      ev.target.recipients.value.split("@")[0],
      ev.target.subject.value,
      ev.target.subject.body,
      true,
      false,
      Date.now(),
      "",
      "sent"
    )
    console.log(emailToSave)
    emailService.save(emailToSave)
  }
  return (
    <section className="email-compose">
      <header>
        <div>New Mail</div>
        <div
          className="close-compose"
          onClick={() => emailComposeHandle(false)}
        >
          <IoMdClose />
        </div>
      </header>
      <main>
        <form onSubmit={sendMailHandle}>
          <input type="text" placeholder="Recipients" name="recipients"></input>
          <input type="text" placeholder="Subject" name="subject"></input>
          <div className="textwrapper">
            <textarea cols="2" rows="10" id="body" name="body" />
          </div>
          <button>send mail</button>
        </form>
      </main>
    </section>
  )
}
