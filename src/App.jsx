
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage';
import { EmailIndex } from './pages/EmailIndex';
import { AppHeader } from './cmps/AppHeader';
import {AppSideBar} from './cmps/AppSideBar';
import "./App.css"
export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader/>    
                <AppSideBar/>
            <Routes>
                    {/* <Route path='/' element={<HomePage />} /> */}
                    <Route path='/' element={<EmailIndex />} />
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
