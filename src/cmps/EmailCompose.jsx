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
    console.log(formValues)
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
          {/* <textarea id="freeform" name="freeform" rows="50" cols="50" /> */}
          <div className="textwrapper">
            <textarea cols="2" rows="10" id="body" name="body" />
          </div>
          <button>send mail</button>
        </form>
      </main>
    </section>
  )
}
