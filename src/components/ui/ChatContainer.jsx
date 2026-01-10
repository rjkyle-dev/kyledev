import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Circle } from 'lucide-react';
import { personal_info } from '../../utils/constants';

const ChatContainer = ({ onClose, isClosing = false }) => {
    const [message, setMessage] = useState('');
    const [imageError, setImageError] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!isClosing) {
            scrollToBottom();
        }
    }, [isClosing]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Frontend only - just clear the input
            setMessage('');
            // In a real app, you would send the message here
        }
    };

    return (
        <div className={`fixed bottom-24 right-6 sm:bottom-28 sm:right-8 z-[1001] w-[calc(100vw-3rem)] sm:w-96 max-w-sm max-h-[calc(100vh-8rem)] h-[400px] sm:h-[500px] flex flex-col bg-black/90 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl overflow-hidden ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/30 to-primary/60 flex items-center justify-center overflow-hidden border border-primary/20">
                            {!imageError ? (
                                <img 
                                    src="/images/profile/profile2.jpg" 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <span className="text-primary font-bold text-lg">
                                    {personal_info.name.split(' ')[0].charAt(0)}
                                </span>
                            )}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full border-2 border-black flex items-center justify-center">
                            <Circle className="w-2 h-2 fill-primary text-primary" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-sm">{personal_info.name.split(' ')[0]}</h3>
                        <p className="text-xs text-primary/70">Online</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close chat"
                >
                    <X className="w-5 h-5 text-white/70 hover:text-white" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 hide-scrollbar">
                {/* Welcome Message */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary/30 to-primary/60 flex items-center justify-center shrink-0 overflow-hidden border border-primary/20">
                        {!imageError ? (
                            <img 
                                src="/images/profile/profile2.jpg" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <span className="text-primary text-xs font-bold">
                                {personal_info.name.split(' ')[0].charAt(0)}
                            </span>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                            <p className="text-white/90 text-sm">
                                Hi! I'm {personal_info.name.split(' ')[0]}. How can I help you today?
                            </p>
                        </div>
                        <p className="text-xs text-white/40 mt-1 ml-1">Just now</p>
                    </div>
                </div>

                {/* Empty state message */}
                <div className="text-center py-8">
                    <p className="text-white/50 text-sm">Start a conversation...</p>
                </div>

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/40">
                <form onSubmit={handleSend} className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="p-3 bg-primary text-black rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                        aria-label="Send message"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatContainer;

