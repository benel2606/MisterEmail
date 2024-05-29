
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage';
import { EmailIndex } from './pages/EmailIndex';
export function App() {

    return (
        <Router>
            <section className='main-app'>
                <header className="app-header">
                    <section className="container">
                        <h1>Mister Email</h1>
                    </section>
                </header>
            <main>

            <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/email' element={<EmailIndex />} />
            </Routes>
            </main>

            <footer>
                <section className="container">
                    2024 &copy;
                </section>
            </footer>
        </section>
    </Router>


    )
}
