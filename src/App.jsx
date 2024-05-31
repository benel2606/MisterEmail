
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage';
import { EmailIndex } from './cmps/EmailIndex';
import { AppHeader } from './cmps/AppHeader';
import { EmailFolderList } from './cmps/EmailFolderList';
import { EmailDetails } from  './pages/EmailDetails'

import "./App.css"
export function App() {

    return (
        <Router>
            <section className='main-app'>
                {/* <AppHeader/>    
                <EmailFolderList/> */}
            <Routes>
                    {/* <Route path='/' element={<HomePage />} /> */}
                    <Route path='/' element={<EmailIndex />} />
                    <Route path="/email/:emailId" element={<EmailDetails />} />
            </Routes>
            

            {/* <footer>
                <section className="container">
                    2024 &copy;
                </section>
            </footer> */}
        </section>
    </Router>


    )
}
