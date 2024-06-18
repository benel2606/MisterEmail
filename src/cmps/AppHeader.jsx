import React from "react"
import { useEffect, useRef, useState } from "react"
import { EmailFilter } from "./EmailFilter"
import { emailService } from "../services/email.service"
import { RxHamburgerMenu } from "react-icons/rx"

export function AppHeader({ filterBy, onSetFilterBy, collapseHandle }) {
  return (
    <section className="app-header">
      <RxHamburgerMenu size={28} onClick={collapseHandle} />
      <img src="mister-email-logo.png" alt="logo" />
      <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
    </section>
  )
}
