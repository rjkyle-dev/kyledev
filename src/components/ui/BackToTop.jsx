import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 bg-black/60 backdrop-blur-sm border border-primary/30 rounded-full shadow-lg transition-all duration-300 hover:bg-black/80 hover:border-primary hover:scale-110 active:scale-95 ${
                isVisible ? 'opacity-100 translate-y-0 animate-floating' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            aria-label="Back to top"
        >
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </button>
    );
};

export default BackToTop;

