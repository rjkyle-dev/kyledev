import React from 'react'
import FadeIn from '../animations/FadeIn'
import {Code, Heart} from 'lucide-react'
import { SiGithub, SiLinkedin, SiX, SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si'
import {personal_info, social_links, nav_links} from '../../utils/constants'
import {scrollToSection} from '../../hooks/useScrollSpy'

const Footer = () => {

    const socialIcons = {
        linkedin: SiLinkedin,
        github: SiGithub,
        twitter: SiX,
        facebook: SiFacebook,
        instagram: SiInstagram,
        youtube: SiYoutube,
    }

    const currentYear = new Date().getFullYear();

    return (
        <footer className='relative overflow-hidden bg-black text-white border-t border-white/10'>
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30'></div>
                <div className='absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30'></div>
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
                    {/* Brand Section */}
                    <FadeIn delay={0}>
                        <div className='space-y-4'>
                            <div className='flex items-center gap-2 mb-4'>
                                <Code className='text-primary w-6 h-6' />
                                <span className='text-xl font-bold bg-linear-to-r from-primary via-primary/50 to-primary/30 bg-clip-text text-transparent'>
                                    {personal_info.name.split(' ')[0]}
                                </span>
                            </div>
                            <p className='text-white/60 text-sm leading-relaxed max-w-xs'>
                                {personal_info.tagline}
                            </p>
                            <div className='flex gap-3 mt-4'>
                                {Object.entries(social_links).map(([platform, url]) => {
                                    const Icon = socialIcons[platform];
                                    return Icon ? (
                                        <a 
                                            href={url} 
                                            key={platform} 
                                            target='_blank' 
                                            rel='noopener noreferrer' 
                                            className='w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group'
                                        >
                                            <Icon className='w-5 h-5 text-white/70 group-hover:text-primary transition-colors duration-300' />
                                        </a> 
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Quick Links */}
                    <FadeIn delay={100}>
                        <div className='space-y-4'>
                            <h3 className='text-lg font-semibold text-white mb-4'>Quick Links</h3>
                            <ul className='space-y-3'>
                                {nav_links.map((link) => (
                                    <li key={link.id}>
                                        <button
                                            onClick={() => scrollToSection(link.id)}
                                            className='text-white/60 hover:text-primary transition-colors duration-300 text-sm cursor-pointer'
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Contact Info */}
                    <FadeIn delay={200}>
                        <div className='space-y-4'>
                            <h3 className='text-lg font-semibold text-white mb-4'>Contact</h3>
                            <div className='space-y-3'>
                                <div>
                                    <p className='text-sm text-white/60 mb-1'>Email</p>
                                    <a 
                                        href={`mailto:${personal_info.email}`} 
                                        className='text-white/80 hover:text-primary transition-colors duration-300 text-sm font-medium'
                                    >
                                        {personal_info.email}
                                    </a>
                                </div>
                                <div>
                                    <p className='text-sm text-white/60 mb-1'>Location</p>
                                    <p className='text-white/80 text-sm font-medium'>{personal_info.location}</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Resume Download */}
                    <FadeIn delay={300}>
                        <div className='space-y-4'>
                            <h3 className='text-lg font-semibold text-white mb-4'>Resume</h3>
                            <p className='text-white/60 text-sm leading-relaxed mb-4'>
                                Download my resume to learn more about my experience and skills.
                            </p>
                            <a
                                href={personal_info.resume}
                                download
                                className='inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/30 transition-all duration-300 text-sm font-medium text-white group'
                            >
                                <span>Download CV</span>
                                <Heart className='w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300' />
                            </a>
                        </div>
                    </FadeIn>
                </div>

                {/* Bottom Bar */}
                <div className='border-t border-white/10 pt-8 mt-8'>
                    <FadeIn delay={400}>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                            <p className='text-white/60 text-sm text-center md:text-left'>
                                © {currentYear} <span className='text-primary'>{personal_info.name}</span>. All rights reserved.
                            </p>
                            <p className='text-white/60 text-sm text-center md:text-right flex items-center gap-1'>
                                Made with <Heart className='w-4 h-4 text-primary fill-primary' /> using React & Tailwind CSS
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </footer>
    )
}

export default Footer;