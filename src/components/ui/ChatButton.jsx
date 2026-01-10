import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatContainer from './ChatContainer';

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const closeTimeoutRef = useRef(null);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        // Wait for fade out animation to complete before actually closing
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 300); // Match animation duration
    }, []);

    const toggleChat = () => {
        if (isOpen) {
            handleClose();
        } else {
            setIsOpen(true);
            setIsClosing(false);
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleScroll = () => {
            handleClose();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, [isOpen, handleClose]);

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <button
                onClick={toggleChat}
                className={`fixed bottom-6 right-20 sm:bottom-8 sm:right-24 ${isOpen ? 'z-[1002]' : 'z-40'} p-3 sm:p-4 bg-black/60 backdrop-blur-sm border border-primary/30 rounded-full shadow-lg transition-all duration-300 hover:bg-black/80 hover:border-primary hover:scale-110 active:scale-95 animate-floating`}
                aria-label="Open chat"
            >
                {isOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                ) : (
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                )}
            </button>
            {isOpen && <ChatContainer isClosing={isClosing} onClose={handleClose} />}
        </>
    );
};

export default ChatButton;

