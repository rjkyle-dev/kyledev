import React from "react";
import {services} from '../../data/services';
import * as Icons from 'lucide-react';
import {Wrench} from 'lucide-react';
import FadeIn from "../animations/FadeIn";


const Services = () => {
    return (
        <section id="services" className="py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full"/>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl"/>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"/>
            </div>

            <div
             className="absolute inset-0 opacity-[0.03]"
             style={{
                backgroundImage:`
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px),
                `,
                backgroundSize: '30px 30px',
             }}
            />

           <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <FadeIn delay={0}>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                <Wrench className="w-4 h-4 text-primary"/>
                    <span className="text-sm text-primary font-medium tracking-wider uppercase">What I Offer</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4 max-w-2xl mx-auto">
                    Built for innovation. Designed for results.
                </h2>
                <p className="text-lg text-white/60 max-w-xl mx-auto">
                    Comprehensive solutions to transform your ideas into exceptional digital experiences.
                </p>
              </div>
            </FadeIn>

            {/* Top Row: 2 Larger Cards */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                {services.slice(0, 2).map((service, index) => {
                    const IconComponent = Icons[service.icon] || Icons.Code2;
                    return (
                        <FadeIn key={service.id} delay={100 + index * 100}>
                        <div className='group relative bg-white/5 hover:border-primary/30 p-6 rounded-3xl border border-white/10 transition-all duration-300 h-full flex flex-col'>
                           <div className='mb-6'>
                            <div className='w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                                <IconComponent className='w-8 h-8 text-primary' />
                            </div>
                           </div>

                           <div className='flex-1'>
                            <h3 className='text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300'>{service.title}</h3>
                            <p className="text-white/60 leading-relaxed">{service.description}</p>
                           </div>

                         <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary-0 group-hover:from-primary/5 group-hover:to-primary/5 rounded-3xl transition-all duration-300 pointer-events-none" />
                        </div>
                        </FadeIn>
                    );
                })}
            </div>

            {/* Bottom Row: 4 Smaller Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {services.slice(2).map((service, index) => {
                    const IconComponent = Icons[service.icon] || Icons.Code2;
                    return (
                        <FadeIn key={service.id} delay={300 + index * 100}>
                            <div className='group relative bg-white/5 hover:border-primary/30 p-6 rounded-2xl border border-white/10 transition-all duration-300 h-full'>
                                <div className='mb-4'>
                                    <div className='w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                                        <IconComponent className='w-6 h-6 text-primary' />
                                    </div>
                                </div>

                                <div className=''>
                                    <h3 className='text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300'>{service.title}</h3>
                                    <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{service.description}</p>
                                </div>

                                <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/5 rounded-2xl transition-all duration-300 pointer-events-none" />
                            </div>
                        </FadeIn>
                    );
                })}
            </div>
           </div>
        </section>
    );
};
export default Services;