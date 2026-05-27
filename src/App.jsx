import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import Footer from './components/layout/Footer'
import BackToTop from './components/ui/BackToTop'
import ChatButton from './components/ui/ChatButton'
import CustomCursor from './components/ui/CustomCursor'

const App = () => (
    <BrowserRouter>
        <div className="min-h-screen bg-black">
            <CustomCursor />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <HomePage />
                            <Footer />
                            <BackToTop />
                            <ChatButton />
                        </>
                    }
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
        </div>
    </BrowserRouter>
)

export default App
