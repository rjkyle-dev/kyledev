import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { scrollToSection } from '../../hooks/useScrollSpy'
import { projects } from '../../data/projects'
import FadeIn from '../animations/FadeIn'
import ShapeGrid from '../ShapeGrid'
import HeroTopBar from '../ui/HeroTopBar'
import HeroNavOverlay from '../ui/HeroNavOverlay'
import { HeroParallax } from '../ui/hero-parallax'

const formatTime = (date) => {
    const hours12 = date.getHours() % 12 || 12
    const hours = String(hours12).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const period = date.getHours() >= 12 ? 'PM' : 'AM'
    return `${hours}:${minutes}:${seconds} ${period}`
}

const Projects = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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

    const parallaxProducts = projects.map((project) => ({
        title: project.title || project.description || `Project ${project.id}`,
        link: project.demoUrl || project.githubUrl || '#',
        thumbnail: project.image,
    }))

    return (
        <section id="projects" className="relative bg-black">
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

                <HeroTopBar
                    className="z-20"
                    time={time}
                    onCenterClick={() => setIsMenuOpen(true)}
                    onContactClick={() => scrollToSection('contact')}
                    centerLabel="Open menu"
                    isCenterActive={isMenuOpen}
                />

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
                        Projects
                    </motion.p>
                </div>

                <div className="relative z-10 px-4 sm:px-8 sm:pb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 64 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center font-bold uppercase leading-[0.9] tracking-tight text-white"
                        style={{ fontSize: 'clamp(3.5rem, 14vw, 10rem)' }}
                    >
                        Featured
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, y: 64 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center font-bold uppercase leading-[0.9] tracking-tight text-white"
                        style={{ fontSize: 'clamp(3.5rem, 14vw, 10rem)' }}
                    >
                        Work
                    </motion.h2>
                </div>
            </div>

            <div className="relative z-10 border-t border-white/10 py-10 sm:py-14 -top-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeIn delay={120}>
                        <HeroParallax products={parallaxProducts} />
                    </FadeIn>
                </div>
            </div>

            <HeroNavOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                time={time}
                activeId="projects"
            />
        </section>
    )
}

export default Projects