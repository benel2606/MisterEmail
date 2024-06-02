import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { EmailIndex } from "./cmps/EmailIndex"
import { AppHeader } from "./cmps/AppHeader"
import { EmailFolderList } from "./cmps/EmailFolderList"
import { EmailDetails } from "./cmps/EmailDetails"

import "./App.css"
export function App() {
  return (
    <Router>
      <section className="main-app">
        <Routes>
          <Route path="/" element={<EmailIndex />}>
            <Route path="/email/:emailId" element={<EmailDetails />} />
          </Route>
        </Routes>
      </section>
    </Router>
  )
}
