
const GRADIENT_STOPS = [
    { color: 'var(--gradient-accent-25)', stop: '100%' },
    { color: 'var(--gradient-accent-45)', stop: '100%' },
    { color: 'var(--gradient-accent-50)', stop: '100%' },
    { color: 'var(--gradient-accent-45)', stop: '100%' },
    { color: 'var(--gradient-accent-25)', stop: '100%' },
]

const RadialGradientBackground = ({variant='hero', gradient=[]}) => {

   const variants = {
    hero: [
        {
            position: 'top-1 left-1 -translate-x-1/2 -translate-y-1/2',
            size: 'w-[1400px] h-[1400px]',
            colors: GRADIENT_STOPS,
            blur: '0px',
            opacity: 0.5,
        },
        {
            position: 'top-1 left-1',
            size: 'w-[1400px] h-[1400px]',
            colors: GRADIENT_STOPS,
            blur: '0px',
            opacity: 0.5,
        },
        {
              position: 'bottom-1 right-1',
            size: 'w-[1400px] h-[1400px]',
            colors: GRADIENT_STOPS,
            blur: '0px',
            opacity: 0.5,
        }
    ],
    about: [
        {
               position: 'bottom-0 left-[75%]',
            size: 'w-[700px] h-[700px]',
            colors: GRADIENT_STOPS,
            blur: '0px',
            opacity: 0.5,
        },
    ],
   };

   const activeGradients = variant === 'custom' ? gradient : variants[variant] || variants.hero;

   const generateGradients = (colors) => {
    const colorStops =colors.map(({color, stop}) => `${color} ${stop}`).join(', ');
    return `radial-gradient(circle at center, transparent 0%, transparent 30%, ${colorStops}, transparent 60%, transparent 100%)`;
   };
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {activeGradients.map((gradient, index) => (
                <div
                key={index}
                className={`absolute ${gradient.position} ${gradient.size} rounded-full`}
                style={{
                    background: generateGradients(gradient.colors),
                    filter: `blur(${gradient.blur})`,
                    opacity:gradient.opacity,
                }}
                >

                </div>
            ))}
        </div>
    )


}
export default RadialGradientBackground