import { useEffect } from 'react'
import Projects from '../components/sections/Project_page'
import Footer from '../components/layout/Footer'

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <main>
                <Projects />
            </main>
            <Footer />
        </>
    )
}

export default ProjectsPage
