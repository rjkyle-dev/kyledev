import { useEffect, useState } from 'react'
import { scrollToSection } from '../../hooks/useScrollSpy'
import ShapeGrid from '../ShapeGrid'
import HeroNavOverlay from './HeroNavOverlay'
import HeroTopBar from './HeroTopBar'
import Lanyard from './Lanyard'
import TechLogoLoop from './logo-loop'
const formatTime = (date) => {
    const hours12 = date.getHours() % 12 || 12
    const hours = String(hours12).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const period = date.getHours() >= 12 ? 'PM' : 'AM'
    return `${hours}:${minutes}:${seconds} ${period}`
}

const HeroIntro = ({ name = 'KYLE' }) => {
    const [time, setTime] = useState(() => formatTime(new Date()))
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTime(new Date()))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative min-h-screen w-full flex flex-col z-100">
            <div className="absolute inset-0 z-0">
            <ShapeGrid 
                speed={0.5}
                squareSize={40}
                direction='diagonal' // up, down, left, right, diagonal
                borderColor="#2F293A"
                hoverFillColor='#222'
                shape='square' // square, hexagon, circle, triangle
                hoverTrailAmount={0} // number of trailing hovered shapes (0 = no trail)
                hoverColor="#222222"
                size={40}
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
                <div className="absolute z-30 w-full -top-10">
                    <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} fov={15} transparent={true} />
                </div>
            </HeroTopBar>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pointer-events-none">
                <h1
                    className="select-none text-center font-bold uppercase leading-none tracking-tight text-white"
                    style={{
                        fontSize: 'clamp(35rem, 18vw, 14rem)',
                    }}
                >
                    {name}
                </h1>
                <div className="mt-6 w-full max-w-[100rem] overflow-hidden rounded-2xl border border-white/20 bg-black/40 sm:mt-8 sm:max-w-[100rem] md:max-w-[80rem] aspect-square h-full object-cover object-top max-h-[50rem]">
                    <img
                        src="/images/profile/profile2.jpg"
                        alt={`${name} profile`}
                        className="block h-auto w-full object-cover object-top max-h-[50rem] "
                    />
                </div>
                
                <div className="mt-10 w-full max-w-4xl text-center sm:mt-12 md:mt-16">
                    <h2
                        className="select-none font-bold uppercase leading-[0.95] tracking-tight text-white"
                        style={{
                            fontSize: 'clamp(1.75rem, 5vw, 3.75rem)',
                        }}
                    >
                        <span className="block">I&apos;M RJ KYLE - FULLSTACK</span>
                        <span className="block">DEV&apos;S.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/80 sm:mt-8 sm:text-base md:text-lg">
                        I created various of Fullstack system development.
                    </p>
                    
                </div>
                
            </div>
            <TechLogoLoop className="relative z-10 mt-10 w-full max-w-none sm:mt-12 md:mt-16" />
            

            <HeroNavOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                time={time}
                activeId="home"
            />
        </div>
    )
}

export default HeroIntro
