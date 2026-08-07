import { useEffect } from 'react'
import ServicePage from '../components/sections/service_page'
import Footer from '../components/layout/Footer'

const ServicePages = () => {
    useEffect(() => {
        window.scrollTo(0, 0)   
    }, [])

    return (
        <>
            <main>
                <ServicePage />
            </main>
            <Footer />
            </>
    )
}

export default ServicePages
