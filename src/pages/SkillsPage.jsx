import { useEffect } from 'react'
import SkillsPageSection from '../components/sections/Skills_page'
import Footer from '../components/layout/Footer'

const SkillsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <main>
                <SkillsPageSection />
            </main>
            <Footer />
        </>
    )
}

export default SkillsPage
