import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { scrollToSection } from '../../hooks/useScrollSpy'
import ShapeGrid from '../ShapeGrid'

const NAV_ITEMS = [
    { id: 'home', label: 'Home', action: 'home' },
    { id: 'about_new', label: 'About', action: 'about_new', route: '/about' },
    { id: 'skills', label: 'Skills', action: 'skills', route: '/skills' },
    { id: 'services', label: 'Services', action: 'services', route: '/services'  },
    { id: 'projects', label: 'Projects', action: 'projects', route: '/projects' },
]   

const HeroNavOverlay = ({ isOpen, onClose, time, activeId = 'home' }) => {
    const navigate = useNavigate()
    const [hoveredId, setHoveredId] = useState(null)

    useEffect(() => {
        if (!isOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    useEffect(() => {
        if (!isOpen) setHoveredId(null)
    }, [isOpen])

    const handleNavClick = (item) => {
        onClose()

        requestAnimationFrame(() => {
            if (item.route) {
                navigate(item.route)
                return
            }

            if (item.action === 'home') {
                navigate('/')
                return
            }

            navigate('/')
            setTimeout(() => scrollToSection(item.action), 100)
        })
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[1100] flex flex-col bg-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
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

                    <header className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 sm:px-10 pt-10 sm:pt-14">
                        <div className="flex items-center gap-2 justify-self-start min-w-0">
                            <span className="inline-flex shrink-0 items-center bg-white/10 px-2 py-1 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-white/80 uppercase">
                                Local/
                            </span>
                            <span className="truncate text-[10px] sm:text-xs font-mono tracking-[0.15em] text-white uppercase">
                                {time}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close menu"
                            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center justify-self-center rounded-full border border-white/80 text-white transition-colors hover:bg-white hover:text-black"
                        >
                            <X className="h-4 w-4" strokeWidth={1.5} />
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                onClose()
                                navigate('/')
                                setTimeout(() => scrollToSection('contact'), 100)
                            }}
                            className="shrink-0 cursor-pointer justify-self-end rounded-full border border-white px-5 py-2 text-[10px] sm:text-xs font-medium leading-none tracking-[0.25em] text-white uppercase transition-colors hover:bg-white hover:text-black"
                        >
                            Contact Now
                        </button>
                    </header>

                    <nav className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-24 sm:gap-3">
                        {NAV_ITEMS.map((item, index) => {
                            const isActive = activeId === item.id
                            const isHovered = hoveredId === item.id
                            const hasHover = hoveredId !== null

                            let textClass = 'text-white'
                            if (hasHover) {
                                textClass = isHovered ? 'text-white' : 'text-white/25'
                            } else if (isActive) {
                                textClass = 'text-white/35'
                            }

                            return (
                                <motion.button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleNavClick(item)}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    initial={{ opacity: 0, y: 48 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 24 }}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.04,
                                        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                                    }}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.08 + index * 0.07,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={`cursor-pointer text-center font-bold uppercase leading-none tracking-tight transition-colors duration-300 ${textClass}`}
                                    style={{
                                        fontSize: 'clamp(2.5rem, 10vw, 5.5rem)',
                                    }}
                                >
                                    {item.label}
                                </motion.button>
                            )
                        })}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default HeroNavOverlay
