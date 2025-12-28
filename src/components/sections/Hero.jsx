import React from 'react';
import { ChevronDown, Star } from 'lucide-react';   
import {SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb} from 'react-icons/si'
import {personal_info, stats} from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy';
import FadeIn from '../animations/FadeIn';
import RadianGradientBackground from '../background/RadialGradientBackground';


const Hero = () => {
    return (
        <section className='relative min-h-screen flex items-center overflow-hidden bg-black'>
            <RadianGradientBackground variant="hero" />

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    <div className='text-left'>
                        <FadeIn delay={0}>
                            <div className='inline-flex items-center gap-2.5 px-4.5 py-2.75 mb-8 bg-linear-to-r from-primary/10 via-primary/15 to-primary/20 border border-primary/20 rounded-full'>
                                <Star className='w-4 h-4 text-white fill-white'/>
                                <span className='text-xs md:text-sm text-white tracking-[1.2px]'>
                                    {personal_info.role} | Base in {personal_info.location}
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <h1 className='text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight'>
                              React.js | Next.js | Tailwind CSS Developer
                            </h1>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <p className='text-lg text-white/70 max-w-137.5 mb-8'>
                               Building modern web applications with React, JavaScript, and Tailwind CSS.
                            </p>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className='inline-flex items-center gap-0 mb-12 group'
                            >
                                <div className='relative z-10 bg-white text-[#212121] rounded-[17px] px-6.5 py-3.25 text-base font-medium border border-white'>
                                    Get in Touch
                                </div>
                            
                            </button>
                        </FadeIn>

                        <FadeIn delay={400}>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-10 max-w-full'>
                                {stats.map((stat, index) => (
                                    <div key={index} className='text-left border-r border-white/50 pr-10 last:border-r-0'>
                                        <div className='text-2xl font-normal text-primary mb-[8px] font-mono'>
                                            {stat.value}
                                        </div>
                                        <p className='text-sm text-white leading-snug'>
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero