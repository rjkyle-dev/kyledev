import React, {useEffect, useState, useRef} from 'react';

const FadeIn = ({children, delay = 0, duration = 500, threshold = 0.1}) => {

    const [isVisible, setInVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Trigger animation when element enters viewport
                if (entry.isIntersecting && !isVisible) {
                    setInVisible(true);
                }
            },
            { 
                threshold: threshold,
                rootMargin: '0px 0px -50px 0px'
             } // Adjust rootMargin as needed
             
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold, isVisible]);

    return <div
       ref={elementRef}
       className={isVisible ? 'animate-fade-in' : 'opacity-0'}
         style={{
            animationDelay: isVisible ? `${delay}ms` : '0ms',
            animationDuration: `${duration}ms`,
            animationFillMode: 'both',
         }}
       >
         {children}
    </div>

};
    
export default FadeIn