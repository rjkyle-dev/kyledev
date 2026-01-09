import React, { useState, useRef } from 'react'
import { projects, categories } from '../../data/projects'
import {SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiDotnet, SiLaravel, SiCss3, SiLaragon, SiHtml5, SiFsharp, SiSharp, SiResharper, SiBootstrap, SiMysql} from 'react-icons/si'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
import RadianGradientBackground from '../background/RadialGradientBackground'
import {Briefcase, Sparkles, Target, Globe, Palette, Zap, ChevronLeft, ChevronRight, Code, Smartphone, Database, Brain, Gamepad2 } from 'lucide-react'
import ProjectCard from '../ui/ProjectCard'


const Projects = () => {

    const [activeCategory, setActiveCategory] = useState('All')
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollContentRef = useRef(null)

    const filteredProjects = activeCategory === 'All' ? projects : projects.filter(project => project.category === activeCategory);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentIndex(0);
        if(scrollContentRef.current){
            scrollContentRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            })
        }

        };

    const scrollToIndex = (index) => {
        setCurrentIndex(index);
        if(scrollContentRef.current){
            const container = scrollContentRef.current;
            const cardWidth = container.offsetWidth / 3;
            container.scrollTo({
                left:  cardWidth * index,
                behavior: 'smooth'
            });
    }
};

    const nextSlide = () => {
    const maxIndex = Math.max(0, filteredProjects.length - 3);
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(newIndex);
    };

    const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(newIndex);
    };

    const categoryIcons = {
        'All': Target,
        'Web Apps': Code,
        'Full Stack': Smartphone,
        'UI Components': Database,
        'Other Projects': Gamepad2,
    };

    return <section id='projects' className='relative overflow-hidden py-20 bg-black'>
         <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/3 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20'></div>
            <div className='absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20'></div>
            <div className='absolute top-1/2 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 '></div>
         </div>

         <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <FadeIn delay={0}>
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6'>
                        <Briefcase className='w-4 h-4 text-primary' />
                        <span className='text-sm font-medium text-primary'>
                            My Projects
                        </span>
                    </div>
                    <h2 className='text-4xl lg:text-5xl font-normal text-white mb-4'>Featured Projects</h2>
                    <p className='text-lg text-white/60 max-w-2xl mx-auto'>Showcasing my best work and achievements.</p>
                </div>
            </FadeIn>

            <FadeIn delay={100}>
                <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-2'>
                    {categories.map((category) => (
                        <button key={category} onClick={() => handleCategoryChange(category)} className={`group relative px-4 py-2 sm:px-6 sm:py-3 font-medium rounded-full transition-all duration-300 ${activeCategory === category ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                           <div className={`absolute inset-0  rounded-full  transition-all duration-300 ${activeCategory === category ? 'bg-primary/10 opacity-100' : 'bg-white/5 border border-white/10 group-hover:bg-white/10'}`}/>

                           <div className='relative flex items-center gap-1.5 sm:gap-2'>
                           {React.createElement(categoryIcons[category], { className: 'w-3.5 h-3.5 sm:w-20 sm:h-4' })}
                             <span className='text-xs sm:text-sm'>{category}</span>
                           </div>

                           {activeCategory === category && (
                            <div className='absolute inset-0 bg-primary rounded-full blur-xl opacity-50 -z-10' />
                           )}
                        </button>
                    ))}
                </div>
            </FadeIn>

            <FadeIn delay={200}>
                <div className='relative'>
                    <div ref={scrollContentRef} className='overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar'>
                        <div className='flex gap-6 pb-4'>
                            {filteredProjects.map((project, index) => (
                                <div key={project.id} className='w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start shrink-0'>
                                    <ProjectCard project={project}/>
                                </div>
                            ))}
                        </div>   
                    </div>

                    {filteredProjects.length > 3 && (
                        <>
                            <button onClick={prevSlide} disabled={currentIndex === 0} aria-label='Previous Project' 
                            className='rounded-full flex absolute top-1/2 left-4 -translate-y-1/2 z-10 -translate-x-2 lg:-translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12  backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed' >
                                <ChevronLeft className='w-4 h-4 text-white' />
                            </button>
                            <button onClick={nextSlide} disabled={currentIndex === filteredProjects.length - 3} aria-label='Next Project' 
                            className='rounded-full flex absolute top-1/2 right-0 -translate-y-1/2 z-10 translate-x-2 lg:translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed' >
                                <ChevronRight className='w-4 h-4 text-white' />
                            </button>
                        </>
                    )}

                    {filteredProjects.length > 3 && (
                        <div className='flex items-center gap-2 justify-center mt-8'>
                            {Array.from({length: Math.max(0, filteredProjects.length -2)}).map((_, index) => (
                                <button key={index} onClick={() => scrollToIndex(index)} aria-label={`Go to Project ${index + 1}`} 
                                className={`rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-6 h-2' : 
                                'bg-white/30 w-2 h-2 hover:bg-white/50'}`}>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </FadeIn>
        </div>
    </section>
};
export default Projects;