import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { EmailIndex } from "./cmps/EmailIndex"
import { AppHeader } from "./cmps/AppHeader"
import { EmailFolderList } from "./cmps/EmailFolderList"
import { EmailDetails } from "./cmps/EmailDetails"
import { UserMsg } from "./cmps/UserMsg"

import "./App.css"
export function App() {
  return (
    <Router>
      <section className="main-app">
        <Routes>
          <Route path="/" element={<EmailIndex />}>
            <Route path="/:folder" element={<EmailIndex />} />
            <Route path="/:folder/:emailId" element={<EmailDetails />} />
          </Route>
        </Routes>
        <UserMsg />
      </section>
    </Router>
  )
}
