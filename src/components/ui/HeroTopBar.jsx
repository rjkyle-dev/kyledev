const HeroTopBar = ({
    time,
    onCenterClick,
    onContactClick,
    centerLabel = 'Open menu',
    isCenterActive = false,
    className = '',
    children,
}) => {
    return (
        <header
            className={`relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 sm:px-10 pt-10 sm:pt-14 ${className}`}
        >
            <div className="flex min-w-0 items-center gap-2 justify-self-start">
                <span className="inline-flex shrink-0 items-center bg-white/10 px-2 py-1 text-[10px] font-mono tracking-[0.2em] text-white/80 uppercase sm:text-xs">
                    Local/
                </span>
                <span className="truncate text-[10px] font-mono tracking-[0.15em] text-white uppercase sm:text-xs">
                    {time}
                </span>
            </div>

            {children}

            <button
                type="button"
                onClick={onCenterClick}
                aria-label={centerLabel}
                className="relative z-100 flex cursor-pointer items-center justify-center justify-self-center"
            >
                <span
                    className={`grid grid-cols-2 gap-1 transition-transform duration-300 ease-out hover:rotate-45 hover:scale-125 ${
                        isCenterActive ? 'rotate-45 scale-125' : ''
                    }`}
                >
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    ))}
                </span>
            </button>

            <button
                type="button"
                onClick={onContactClick}
                className="relative z-[1001] shrink-0 cursor-pointer justify-self-end rounded-full border border-white px-5 py-2 text-[10px] font-medium leading-none tracking-[0.25em] text-white uppercase transition-colors hover:bg-white hover:text-black sm:text-xs"
            >
                Contact Now
            </button>
        </header>
    )
}

export default HeroTopBar
