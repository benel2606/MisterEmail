import React from 'react'
import { useEffect, useRef, useState } from "react"
import { EmailFilter } from './EmailFilter'
import { emailService } from "../services/email.service"

export function AppHeader ({filterBy , onSetFilterBy}){
//   const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

//   function onSetFilterBy(filterBy) {
//     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
// }
  return (
    <section className='app-header'>
      <div>Mister Email</div>
      <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
      </section>
  )
}
