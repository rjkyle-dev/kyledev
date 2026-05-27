import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import { personal_info } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
import ShapeGrid from '../ShapeGrid'
import HeroTopBar from '../ui/HeroTopBar'
import HeroNavOverlay from '../ui/HeroNavOverlay'
import Lanyard from '../ui/Lanyard'

const formatTime = (date) => {
    
    const hours12 = date.getHours() % 12 || 12
    const hours = String(hours12).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const period = date.getHours() >= 12 ? 'PM' : 'AM'
    return `${hours}:${minutes}:${seconds} ${period}`
}

const thingsIDo = [
    'WEB APPLICATIONS',
    'FULL-STACK SYSTEMS',
    'UI & FRONTEND',
    'API DEVELOPMENT',
    'DATABASE DESIGN',
    'PERFORMANCE OPTIMIZATION',
]

const AboutNew = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const [time, setTime] = useState(() => formatTime(new Date()))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTime(new Date()))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const goToContact = () => {
        navigate('/')
        setTimeout(() => scrollToSection('contact'), 100)
    }

    const scrollToContent = () => {
        const content = document.getElementById('about-content')
        content?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="about_new" className="relative bg-black">
            <div className="relative flex min-h-screen flex-col overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ShapeGrid
                        speed={0.5}
                        squareSize={40}
                        direction="diagonal"
                        borderColor="#2F293A"
                        hoverFillColor="#222"
                        shape="square"
                        hoverTrailAmount={0}
                    />
                </div>

                {/* <HeroTopBar
                    className="z-10"
                    time={time}
                    onCenterClick={() => navigate('/')}
                    onContactClick={goToContact}
                    centerLabel="Back to home"
                /> */}
                 <HeroTopBar
                className="z-20"
                time={time}
                onCenterClick={() => setIsMenuOpen(true)}
                onContactClick={() => scrollToSection('contact')}
                centerLabel="Open menu"
                isCenterActive={isMenuOpen}
            >
                {/* <div className="absolute z-30 w-full -top-10">
                    <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={15} transparent={true} />
                </div> */}
            </HeroTopBar>

                <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-8">
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-6 h-3 w-3 rounded-full bg-white"
                        aria-hidden
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xs font-medium tracking-[0.35em] text-white uppercase sm:text-sm"
                    >
                        About
                    </motion.p>
                </div>

                <div className="relative z-10 px-4 pb-6 sm:px-8 sm:pb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 64 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center font-bold uppercase leading-[0.9] tracking-tight text-white"
                        style={{ fontSize: 'clamp(3.5rem, 14vw, 10rem)' }}
                    >
                        My Story
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, y: 64 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center font-bold uppercase leading-[0.9] tracking-tight text-white"
                        style={{ fontSize: 'clamp(3.5rem, 14vw, 10rem)' }}
                    >
                        Highlights
                    </motion.h2>

                    <motion.button
                        type="button"
                        onClick={scrollToContent}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="mx-auto mt-8 block cursor-pointer text-xs tracking-[0.3em] text-white/50 uppercase transition-colors hover:text-white"
                    >
                        Scroll down
                    </motion.button>
                </div>
            </div>

            <div id="about-content" className="relative z-10 border-t border-white/10 py-16 sm:py-24">
                <FadeIn delay={60}>
                    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:gap-10 lg:px-8 xl:gap-16">
                        {/* Column 1 — Identity */}
                        <div className="flex flex-col justify-between gap-12 lg:min-h-[32rem]">
                            <div className="flex flex-col gap-6">
                                <h2
                                    className="font-bold uppercase leading-[0.85] tracking-tight text-white"
                                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                                >
                                    I&apos;AM
                                </h2>
                                <h2
                                    className="font-bold uppercase leading-[0.9] tracking-tight text-primary"
                                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                                >
                                    KYLE LABRADOR
                                </h2>

                                <div className="h-px w-full bg-white/30" />

                                <p className="text-xs leading-relaxed tracking-[0.12em] text-white/80 uppercase sm:text-sm">
                                    Building work across web and software formats.
                                </p>

                                <div className="pt-2">
                                    <p
                                        className="text-3xl text-white sm:text-4xl"
                                        style={{ fontFamily: 'cursive' }}
                                    >
                                        Kyle Labrador
                                    </p>
                                    <p className="mt-2 text-sm text-white/60">{personal_info.title}</p>
                                </div>
                            </div>

                            <blockquote className="border-none p-0 font-serif text-sm leading-relaxed text-white/70 italic sm:text-base">
                                &ldquo;Perfection is achieved not when there is nothing more to add, but when there is
                                nothing left to take away.&rdquo;
                            </blockquote>
                        </div>

                        {/* Column 2 — Portrait & tagline */}
                        <div className="flex flex-col gap-8 lg:gap-10">
                            <div className="about-portrait-glitch relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden lg:mx-0 lg:max-w-none">
                                <img
                                    src="/images/profile/profile2.jpg"
                                    alt="Kyle Labrador"
                                    className="h-full w-full object-cover object-center grayscale contrast-125"
                                />
                            </div>

                            <p
                                className="text-center font-bold uppercase leading-[1.05] tracking-tight text-white lg:text-left"
                                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
                            >
                                I build work across{' '}
                                <span className="text-white">react, node, design,</span> and full-stack systems.
                            </p>
                        </div>

                        {/* Column 3 — Bio & services */}
                        <div className="flex flex-col justify-between gap-12 lg:min-h-[32rem]">
                            <p
                                className="font-bold uppercase leading-[1.15] tracking-tight text-white"
                                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.65rem)' }}
                            >
                                I&apos;m a Philippines-based full-stack developer. My practice is driven by
                                experiments, systems, and iteration. Some work resolves quickly, others evolve over
                                time.
                            </p>

                            <div>
                                <p className="mb-6 text-xs tracking-[0.2em] text-white/50 uppercase">Things I do</p>
                                <ul className="space-y-4 border-l border-white/30 pl-6">
                                    {thingsIDo.map((item) => (
                                        <li
                                            key={item}
                                            className="text-sm font-bold tracking-[0.08em] text-white uppercase sm:text-base"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                type="button"
                                onClick={() => window.open(personal_info.resume, '_blank')}
                                className="group inline-flex w-fit cursor-pointer items-center gap-3 border border-white px-6 py-3 text-sm font-bold tracking-[0.15em] text-white uppercase transition-colors duration-300 hover:bg-white hover:text-black"
                            >
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                                Download Resume
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </div>
            <HeroNavOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                time={time}
                activeId="about_new"
            />
        </section>
    )
}

export default AboutNew
