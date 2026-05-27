import { useState } from 'react'
import CountUp from '@/components/CountUp'
import Hero from './Hero'

const Landing = () => {
    const [loaded, setLoaded] = useState(false)

    if (loaded) {
        return <Hero />
    }

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="text-6xl md:text-8xl font-bold text-white font-mono">
                <CountUp
                    to={100}
                    duration={3}
                    onEnd={() => setLoaded(true)}
                />
                <span>%</span>
            </div>
        </section>
    )
}

export default Landing
