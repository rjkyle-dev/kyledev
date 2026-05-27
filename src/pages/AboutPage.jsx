import { useEffect } from 'react'
import AboutNew from '../components/sections/about_new'
import Footer from '../components/layout/Footer'

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <main>
                <AboutNew />
            </main>
            <Footer />
        </>
    )
}

export default AboutPage
