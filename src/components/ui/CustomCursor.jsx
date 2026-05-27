import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const position = useRef({ x: 0, y: 0 })
    const target = useRef({ x: 0, y: 0 })
    const frameRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isPointer, setIsPointer] = useState(false)

    useEffect(() => {
        const prefersFinePointer = window.matchMedia('(pointer: fine)').matches
        if (!prefersFinePointer) return

        document.body.classList.add('custom-cursor-active')

        const handleMouseMove = (event) => {
            target.current = { x: event.clientX, y: event.clientY }
            setIsVisible(true)

            const el = document.elementFromPoint(event.clientX, event.clientY)
            const clickable = el?.closest(
                'a, button, [role="button"], input, textarea, select, label, [data-cursor-pointer]'
            )
            setIsPointer(!!clickable)
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        const animate = () => {
            position.current.x += (target.current.x - position.current.x) * 0.18
            position.current.y += (target.current.y - position.current.y) * 0.18

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`
            }

            frameRef.current = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)
        frameRef.current = requestAnimationFrame(animate)

        return () => {
            document.body.classList.remove('custom-cursor-active')
            window.removeEventListener('mousemove', handleMouseMove)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [isVisible])

    return (
        <div
            ref={cursorRef}
            aria-hidden
            className={`pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white  bg-white transition-[width,height,opacity] duration-200 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
            } ${isPointer ? 'h-3 w-3' : 'h-3 w-3'}`}
        />
    )
}

export default CustomCursor
