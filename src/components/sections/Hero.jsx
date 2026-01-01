import React from 'react';
import { ChevronDown, Star } from 'lucide-react';   
import {SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiDotnet, SiLaravel, SiCss3, SiLaragon, SiHtml5, SiFsharp, SiSharp, SiResharper, SiBootstrap, SiMysql} from 'react-icons/si'
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
                              Full-Stack | Software Developer
                            </h1>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <p className='text-lg text-white/70 max-w-137.5 mb-8'>
                               Building Modern Web Applications and Software Applications.
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

                    <FadeIn delay={200}>
                      <div className='relative'>
                        <div className='relative overflow-hidden rounded-2xl aspect-4/5 max-w-125 ml-auto group'>
                            <div className='absolute inset-0 rounded-2xl overflow-hidden'>
                                <div className='absolute -inset-0.5 bg-linear-to-r from-primary/20 via-primary/10 to-primary animate-spin-slow rounded-2xl'></div>
                            </div>

                            <div className='relative rounded-2xl overflow-hidden m-px h-[calc(100%-2px)]'>
                                <img 
                                src="/public/images/profile/profile2.jpg" 
                                alt="" 
                                className='w-full h-full object-cover'
                                />
                            </div>

                            <div className='absolute bottom-6 left-6 z-20'>
                                <FadeIn>
                                    <div className='flex items-center gap-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3'>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiReact className='w-full h-full text-primary' />
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiNextdotjs className='w-full h-full text-primary'/>
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiTailwindcss className='w-full h-full text-primary' />                                        
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiDotnet className='w-full h-full text-primary' />
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiLaravel className='w-full h-full text-primary' />
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiLaragon className='w-full h-full text-primary' />
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiCss3 className='w-full h-full text-primary' />
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiHtml5 className='w-full h-full text-primary' />
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiBootstrap className='w-full h-full text-primary' />
                                        </div>
                                        <div className='w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform duration-300'>
                                            <SiMysql className='w-full h-full text-primary' />
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                      </div>
                    </FadeIn>
                </div>
            </div>

            <button
              onClick={() => scrollToSection('about')}
              className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer'
            >
                <ChevronDown className='w-8 h-8 text-primary cursor-pointer' />
            </button>
        </section>
    )
}

export default Hero