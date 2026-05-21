import React from 'react'
import FadeIn from '../animations/FadeIn'
import { Briefcase } from 'lucide-react'
import AchievementsCarousel from '../Carousel'

const Achievements = () => {
    return (
        <section id='others' className='relative overflow-hidden py-20 bg-black'>
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
                                My Achievements & Others
                            </span>
                        </div>
                        <h2 className='text-4xl lg:text-5xl font-normal text-white mb-4'>My Achievements & Others</h2>
                        <p className='text-lg text-white/60 max-w-2xl mx-auto'>Showing my best work and achievements.</p>
                    </div>
                </FadeIn>

                <FadeIn delay={100}>
                    <AchievementsCarousel />
                </FadeIn>
            </div>
        </section>
    )
}

export default Achievements;
