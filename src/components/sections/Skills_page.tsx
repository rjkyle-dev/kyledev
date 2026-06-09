import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
    Box,
    Code,
    Code2,
    Database,
    FileCode,
    GitBranch,
    Globe,
    Grid,
    Layers,
    Network,
    Palette,
    PenTool,
    Repeat,
    Server,
    Sparkles,
    Zap,
    type LucideIcon,
} from 'lucide-react'
import { skills } from '../../data/skills'
import { scrollToSection } from '../../hooks/useScrollSpy'
import { useTheme } from '../../context/ThemeContext'
import FadeIn from '../animations/FadeIn'
import ShapeGrid from '../ShapeGrid'
import HeroTopBar from '../ui/HeroTopBar'
import HeroNavOverlay from '../ui/HeroNavOverlay'

const formatTime = (date: Date) => {
    const hours12 = date.getHours() % 12 || 12
    const hours = String(hours12).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const period = date.getHours() >= 12 ? 'PM' : 'AM'
    return `${hours}:${minutes}:${seconds} ${period}`
}

const skillsCategories = {
    'Frontend Development': [
        skills.find((s) => s.name === 'React.js'),
        skills.find((s) => s.name === 'JavaScript'),
        skills.find((s) => s.name === 'CSS'),
        skills.find((s) => s.name === 'HTML5'),
        skills.find((s) => s.name === 'Tailwind CSS'),
        skills.find((s) => s.name === 'Bootstrap'),
        skills.find((s) => s.name === 'Next.js'),
        skills.find((s) => s.name === 'TypeScript'),
        skills.find((s) => s.name === 'Redux'),
        skills.find((s) => s.name === 'Inertia'),
    ].filter(Boolean),
    'Backend & API Development': [
        skills.find((s) => s.name === 'Node.js'),
        skills.find((s) => s.name === 'Python'),
        skills.find((s) => s.name === 'Express.js'),
        skills.find((s) => s.name === 'MySQL'),
        skills.find((s) => s.name === 'Laravel'),
        skills.find((s) => s.name === '.NET'),
        skills.find((s) => s.name === 'C#'),
    ].filter(Boolean),
    'Tools & Other Technologies': [
        skills.find((s) => s.name === 'Figma'),
        skills.find((s) => s.name === 'Git'),
        skills.find((s) => s.name === 'GitHub'),
        skills.find((s) => s.name === 'RESTful APIs'),
    ].filter(Boolean),
}

const skillIconMap: Record<string, LucideIcon> = {
    Code,
    Layers,
    Server,
    Palette,
    Code2,
    Zap,
    Sparkles,
    FileCode,
    Grid,
    Repeat,
    Network,
    Database,
    Box,
    PenTool,
    GitBranch,
    Github: GitBranch,
    Globe,
}

const ProficiencyBar = ({
    proficiency,
    delay = 0,
    isActive = false,
    level,
    isMonochrome = false,
}: {
    proficiency: number
    delay?: number
    isActive?: boolean
    level: string
    isMonochrome?: boolean
}) => {
    const barColor = isMonochrome
        ? level === 'Expert'
            ? 'bg-primary'
            : level === 'Advanced'
              ? 'bg-white/80'
              : 'bg-white/55'
        : level === 'Expert'
          ? 'bg-primary'
          : level === 'Advanced'
            ? 'bg-cyan-400'
            : 'bg-emerald-400'

    return (
        <div className="relative z-10 h-2 overflow-hidden rounded-full bg-white/15">
            <motion.div
                className={`absolute top-0 left-0 h-full rounded-full ${barColor}`}
                initial={{ scaleX: 0 }}
                animate={isActive ? { scaleX: proficiency / 100 } : { scaleX: 0 }}
                transition={{
                    duration: 1.1,
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: 'left center', width: '100%' }}
            />
        </div>
    )
}

const SkillsPageSection = () => {
    const { isMonochrome } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [time, setTime] = useState(() => formatTime(new Date()))
    const skillsContentRef = useRef<HTMLDivElement>(null)
    const [barsActive, setBarsActive] = useState(false)

    useEffect(() => {
        if (typeof globalThis !== 'undefined' && 'scrollTo' in globalThis) {
            globalThis.scrollTo(0, 0)
        }
    }, [])

    useEffect(() => {
        const el = skillsContentRef.current
        if (!el) return

        const checkVisible = () => {
            if (!('innerHeight' in globalThis)) return false
            const rect = el.getBoundingClientRect()
            if (rect.top < globalThis.innerHeight * 0.9 && rect.bottom > 0) {
                setBarsActive(true)
                return true
            }
            return false
        }

        if (checkVisible()) return
        if (typeof globalThis.IntersectionObserver === 'undefined') {
            setBarsActive(true)
            return
        }

        const observer = new globalThis.IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                if (entries[0]?.isIntersecting) setBarsActive(true)
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTime(new Date()))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const getProficiencyLevel = (level: string) => {
        const levels: Record<string, number> = {
            Expert: 60,
            Advanced: 45,
            Intermediate: 30,
        }
        return levels[level] || 50
    }

    const getLevelColor = (level: string) => {
        if (isMonochrome) {
            const mono: Record<string, string> = {
                Expert: 'text-primary bg-primary/20 border-primary/40',
                Advanced: 'text-white/80 bg-white/10 border-white/25',
                Intermediate: 'text-white/60 bg-white/5 border-white/15',
            }
            return mono[level] || 'text-white/50 bg-white/5 border-white/10'
        }
        const colors: Record<string, string> = {
            Expert: 'text-primary bg-primary/20 border-primary/50',
            Advanced: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
            Intermediate: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
        }
        return colors[level] || 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }

    return (
        <section id="skills" className="relative bg-black">
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
                >
                    {null}
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
                        Skills
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
                        My
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, y: 64 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center font-bold uppercase leading-[0.9] tracking-tight text-white"
                        style={{ fontSize: 'clamp(3.5rem, 14vw, 10rem)' }}
                    >
                        Expertise
                    </motion.h2>
                </div>
            </div>

            <div ref={skillsContentRef} className="relative z-10 -top-24 border-t border-white/10 py-10 sm:py-14">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeIn delay={120}>
                        <div className="mb-12 text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                                <Sparkles className="h-4 w-4 text-primary" strokeWidth={2} />
                                <span className="text-sm font-medium text-primary">My Expertise</span>
                            </div>
                            <h2 className="mb-4 text-4xl font-normal text-white lg:text-5xl">
                                Skills & Technologies
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-white/60">
                                A comprehensive overview of my technical skills and proficiency levels.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(skillsCategories).map(([category, categorySkills], categoryIndex) => (
                                <FadeIn key={category} delay={categoryIndex * 100}>
                                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-primary/30">
                                        <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-linear-to-br from-primary/0 to-primary/5 transition-all duration-300 group-hover:from-primary/5 group-hover:to-primary/5" />

                                        <div className="relative z-10">
                                        <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                                            <div className="h-8 w-1 rounded-full bg-linear-to-b from-primary/30 to-primary/10" />
                                            <h3 className="text-xl font-medium text-white">{category}</h3>
                                        </div>

                                        <div className="space-y-5">
                                            {categorySkills.map((skill, skillIndex) => {
                                                if (!skill) return null
                                                const Icon = skillIconMap[skill.icon] ?? Code
                                                const proficiency = getProficiencyLevel(skill.level)

                                                return (
                                                    <div key={skill.id} className="space-y-2">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="flex min-w-0 items-center gap-3">
                                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                                                                    <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="text-sm font-medium text-white">
                                                                        {skill.name}
                                                                    </div>
                                                                    <div className="text-xs text-white/50">
                                                                        {skill.experience}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span
                                                                className={`shrink-0 rounded-full border px-2 py-1 text-xs ${getLevelColor(skill.level)}`}
                                                            >
                                                                {skill.level}
                                                            </span>
                                                        </div>

                                                        <ProficiencyBar
                                                            proficiency={proficiency}
                                                            delay={categoryIndex * 0.08 + skillIndex * 0.06}
                                                            isActive={barsActive}
                                                            level={skill.level}
                                                            isMonochrome={isMonochrome}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </div>

            <HeroNavOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                time={time}
                activeId="skills"
            />
        </section>
    )
}

export default SkillsPageSection
