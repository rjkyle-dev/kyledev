import React from 'react';
import { Download, Code2, Sparkles, Code } from 'lucide-react';   
import {SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiDotnet, SiLaravel, SiCss3, SiLaragon, SiHtml5, SiFsharp, SiSharp, SiResharper, SiBootstrap, SiMysql, SiTypescript} from 'react-icons/si'
import {about_stats, personal_info, stats} from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy';
import FadeIn from '../animations/FadeIn';
import RadianGradientBackground from '../background/RadialGradientBackground';

const About = () => {

    const skills = [
        {
            name: "React.js", icon: SiReact, color: "#61DAFB"
        },
        {
            name: "Laravel", icon: SiLaravel, color: "#FF1F31"
        },
        {
            name: "Tailwindcss", icon: SiTailwindcss, color: "#3178c6"
        },
        {
            name: "Node.js", icon: SiNodedotjs, color: "#06B6D4"
        },
        {
            name: "DotNet.js", icon: SiDotnet, color: "#339933"
        },
        {
            name: "Typescript", icon: SiTypescript, color: "#47A248"
        }
    ]

    return <section id='about' className='relative overflow-hidden py-20 bg-black'>
        <RadianGradientBackground variant='about' />

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-2 lg:grid-grid-cols-2 gap-16 items-center mb-20' >
                <div className='flex flex-col gap-12'>
                    <div className='flex flex-col gap-8'>
                        <FadeIn delay={60}>
                          <div className='inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full w-fit'>
                             <Code2 className='w-4 h-4 text-primary'/>
                             <span className='text-sm text-primary font-medium'>
                                Full-Stack Developer
                             </span>
                             <Sparkles className='w-4 h-4 text-primary' />
                          </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <h2 className='text-4xl lg:text-5xl font-normal text-white leading-tight'>
                                Crafting Digital Experiences That Matter
                            </h2>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <div className='flex flex-col gap-4'>
                                {personal_info.bio.map((paragraph, index) =>
                                  <p key={index} className='text-base text-white/70 leading-relaxed'>
                                    {paragraph}
                                  </p>
                                )}
                            </div>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <div className='grid grid-cols-3 gap-8'>
                                {about_stats.map((stat, index) =>
                                  <div key={index} className='relative'>
                                    <div className='absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary via-primary/50 to-primary/20 rounded-full'></div>
                                    <div className='text-3xl font-normal text-white mb-2 font-mono'>
                                        {stat.value}
                                    </div>
                                    <p className='text-sm text-white/60 leading-snug'>
                                        {stat.label}
                                    </p>
                                  </div>
                                )}
                            </div>
                        </FadeIn>

                        <FadeIn delay={400}>
                            <button
                              onClick={() => window.open(personal_info.resume, '_blank')}
                              className='inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black rounded-full py-4 px-8 text-base font-medium transition-all duration-300 w-fit group'
                            >
                             <Download className='w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300'/>
                             Download Resume
                            </button>
                        </FadeIn>
                    </div>
                </div>

                <FadeIn delay={100}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 relative group">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300">
                            
                            </div>
                               <div className='relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-opacity duration-300'>
                                  <div className='flex items-center gap-4'>
                                     <div className='p-3 bg-primary/10 rounded-xl'>
                                        <Code className='w-6 h-6 text-primary' />
                                     </div>
                                     <div className='flex-1'>
                                        <h3 className='text-lg font-semibold text-white mb-2'>Expertise</h3>
                                        <p className='text-sm text-white/70 leading-relaxed'>Specialized in building scalable web application with modern technology</p>
                                     </div>
                                  </div>
                               </div>
                            </div>

                            <div className='relative group'>
                                <div className='absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
                                <div className='relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all h-full duration-300 '>
                                    <div className='p-3 bg-primary/10 rounded-xl w-fit mb-4'>
                                        <Sparkles className='w-6 h-6 text-primary'/>
                                    </div>
                                    <h3 className='text-base font-semibold text-white mb-2'>Clean Code</h3>
                                    <p className='text-sm text-white/70 leading-relaxed'>Writing maintainable, well-documented code that scales.</p>
                                </div>
                            </div>

                            <div className='relative group'>
                                <div className='absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
                                <div className='relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all h-full duration-300 '>
                                    <div className='p-3 bg-primary/10 rounded-xl w-fit mb-4'>
                                        <Download className='w-6 h-6 text-primary'/>
                                    </div>
                                    <h3 className='text-base font-semibold text-white mb-2'>Performance</h3>
                                    <p className='text-sm text-white/70 leading-relaxed'>
                                      Optimizing for speed and efficiency in every projects.
                                    </p>
                                </div>
                            </div>

                            <div className='col-span-2 relative group'>
                                <div className='absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
                                 <div className='relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all h-full duration-300 '>
                                   <div className='grid grid-cols-3 gap-6 text-center'>
                                     <div>
                                         <div className='text-2xl font-bold text-primary mb-1'>100%</div>
                                         <div className='text-xs text-white/60'>Client Satisfaction</div>
                                     </div>
                                     <div>
                                         <div className='text-2xl font-bold text-primary mb-1'>24/7</div>
                                         <div className='text-xs text-white/60'>Support Available</div>
                                     </div>
                                     <div>
                                         <div className='text-2xl font-bold text-primary mb-1'>Fast</div>
                                         <div className='text-xs text-white/60'>Delivery Time</div>
                                     </div>
                                   </div>
                                </div>
                            </div>
                        </div>

                        
                   
                </FadeIn>
            </div>

              <FadeIn delay={500}>
                <div className='flex flex-col items-center gap-8'>
                    <div className='text-center'>
                        <h3 className='text-xl font-normal text-white mb-2'>Tech Stack & Expertise</h3>
                        <p className='text-sm text-white/60'>Technologies I work to build amazing products</p>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl'>
                        {skills.map((skill, index) => (
                            <div key={index} className='cursor-pointer group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 gap-3 hover:border-primary/50  h-full  flex flex-col items-center justify-center transition-all duration-300 hover:scale-105'>
                                <skill.icon className='text-3xl text-primary' />
                                <div className='text-sm text-white/80 font-medium text-center'>
                                    {skill.name}
                                </div>

                                <div className='absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 rounded-2xl group-hover:from-primary/10 group-hover:to-primary/10 transition-all duration-300'>

                                </div>
                            </div>
                        ))}     
                    </div>
                </div>
              </FadeIn>

        </div>
    </section>
}

export default About