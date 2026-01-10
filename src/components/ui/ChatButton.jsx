import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatContainer from './ChatContainer';

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [position, setPosition] = useState({ x: null, y: null });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [hasMoved, setHasMoved] = useState(false);
    const buttonRef = useRef(null);
    const closeTimeoutRef = useRef(null);
    const dragStartPos = useRef({ x: 0, y: 0 });

    // Load saved position from localStorage on mount
    useEffect(() => {
        const savedPosition = localStorage.getItem('chatButtonPosition');
        if (savedPosition) {
            try {
                const { x, y } = JSON.parse(savedPosition);
                setPosition({ x, y });
            } catch (e) {
                // If parsing fails, use default position
            }
        }
    }, []);

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
        // Don't toggle if we just finished dragging (moved more than 5px)
        if (hasMoved) {
            setHasMoved(false);
            return;
        }
        
        if (isOpen) {
            handleClose();
        } else {
            setIsOpen(true);
            setIsClosing(false);
        }
    };

    const handleMouseDown = (e) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        setDragOffset({ x: offsetX, y: offsetY });
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        setHasMoved(false);
        setIsDragging(true);
    };

    const handleTouchStart = (e) => {
        if (!buttonRef.current) return;

        const touch = e.touches[0];
        const rect = buttonRef.current.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left;
        const offsetY = touch.clientY - rect.top;

        setDragOffset({ x: offsetX, y: offsetY });
        dragStartPos.current = { x: touch.clientX, y: touch.clientY };
        setHasMoved(false);
        setIsDragging(true);
    };

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;

        // Check if user has moved more than 5px to consider it a drag
        const deltaX = Math.abs(e.clientX - dragStartPos.current.x);
        const deltaY = Math.abs(e.clientY - dragStartPos.current.y);
        if (deltaX > 5 || deltaY > 5) {
            setHasMoved(true);
            e.preventDefault();
        }

        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;

        // Keep button within viewport bounds
        const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 0);
        const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 0);

        const constrainedX = Math.max(0, Math.min(x, maxX));
        const constrainedY = Math.max(0, Math.min(y, maxY));

        setPosition({ x: constrainedX, y: constrainedY });
    }, [isDragging, dragOffset]);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        
        // Check if user has moved more than 5px to consider it a drag
        const deltaX = Math.abs(touch.clientX - dragStartPos.current.x);
        const deltaY = Math.abs(touch.clientY - dragStartPos.current.y);
        if (deltaX > 5 || deltaY > 5) {
            setHasMoved(true);
            e.preventDefault();
        }

        const x = touch.clientX - dragOffset.x;
        const y = touch.clientY - dragOffset.y;

        // Keep button within viewport bounds
        const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 0);
        const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 0);

        const constrainedX = Math.max(0, Math.min(x, maxX));
        const constrainedY = Math.max(0, Math.min(y, maxY));

        setPosition({ x: constrainedX, y: constrainedY });
    }, [isDragging, dragOffset]);

    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            // Save position to localStorage if button was moved
            if (hasMoved && position.x !== null && position.y !== null) {
                localStorage.setItem('chatButtonPosition', JSON.stringify(position));
            }
            // Reset hasMoved after a short delay to allow click handler to check it
            setTimeout(() => setHasMoved(false), 100);
        }
    }, [isDragging, position, hasMoved]);

    const handleTouchEnd = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            // Save position to localStorage if button was moved
            if (hasMoved && position.x !== null && position.y !== null) {
                localStorage.setItem('chatButtonPosition', JSON.stringify(position));
            }
            // Reset hasMoved after a short delay to allow click handler to check it
            setTimeout(() => setHasMoved(false), 100);
        }
    }, [isDragging, position, hasMoved]);

    // Add/remove global event listeners for dragging
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
            
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

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

    // Calculate button position - use saved position if available, otherwise use default
    const buttonStyle = position.x !== null && position.y !== null
        ? {
            left: `${position.x}px`,
            top: `${position.y}px`,
            right: 'auto',
            bottom: 'auto',
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : 'all 0.3s',
        }
        : {
            bottom: '1.5rem',
            right: '5rem',
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : 'all 0.3s',
        };

    // Disable floating animation when dragging
    const animationClass = isDragging ? '' : 'animate-floating';

    return (
        <>
            <button
                ref={buttonRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onClick={toggleChat}
                style={buttonStyle}
                className={`fixed ${position.x === null ? 'sm:bottom-8 sm:right-24' : ''} ${isOpen ? 'z-[1002]' : 'z-40'} p-3 sm:p-4 bg-black/60 backdrop-blur-sm border border-primary/30 rounded-full shadow-lg hover:bg-black/80 hover:border-primary hover:scale-110 active:scale-95 ${animationClass} select-none`}
                aria-label="Open chat"
            >
                {isOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-primary pointer-events-none" />
                ) : (
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary pointer-events-none" />
                )}
            </button>
            {isOpen && <ChatContainer isClosing={isClosing} onClose={handleClose} />}
        </>
    );
};

export default ChatButton;

