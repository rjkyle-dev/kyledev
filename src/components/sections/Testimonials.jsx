import React, { useState, useRef } from 'react'
import FadeIn from '../animations/FadeIn'
import {ChevronLeft, ChevronRight, Quote, Star} from 'lucide-react'
import {testimonials} from '../../data/testimonials'


const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollContainerRef = useRef(null)
    
    const scrollToIndex = (index) => {
        setCurrentIndex(index)
        if(scrollContainerRef.current){
            const cards = scrollContainerRef.current.children[0]?.children
            if(cards && cards[index]){
                const cardWidth = cards[index].offsetWidth
                const cardLeft = cards[index].offsetLeft
                scrollContainerRef.current.scrollTo({
                    left: cardLeft,
                    behavior: 'smooth'
            });
            }
        }
    };

    const nextTestimonial = () => {
        const newIndex = (currentIndex + 1) % testimonials.length;
        scrollToIndex(newIndex);
    };

    const prevTestimonial = () => {
        const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        scrollToIndex(newIndex);
    };

    const testimonialStats = [
        {value:'3x', label:'Fast Delivery'},
        {value:'90%', label:'Client Satisfaction'},
        {value:'100%', label:'On Time Delivery'},
        {value:'5*', label:'Average Rating'},
    ]

    return (
        <section id='testimonials' className='relative overflow-hidden py-20 bg-black'>

            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-90' />
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <FadeIn delay={0}>
                 <div className='text-center mb-16' >
                    <div className='inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/30 rounded-full' >
                            <Quote className=' w-4 h-4 text-primary ' />
                        <span className='text-sm font-medium text-primary tracking-wider uppercase' >
                            Testimonials
                        </span>
                    </div>
                    <h2 className='text-4xl lg:text-5xl font-normal text-white mb-4 max-w-xl mx-auto' >
                        Trusted by forward-thinking teams
                    </h2>
                    <p className='text-lg text-white/60 max-w-xl mx-auto' >
                       Empowering clients with design-driven, high-quality solutions.
                    </p>
                 </div>
                </FadeIn>

                <FadeIn delay={100}>
                   <div className='relative' >
                   <style>{`
                        .testimonials-scroll::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                        <div className='testimonials-scroll w-full overflow-x-auto scroll-smooth snap-x snap-mandatory' ref={scrollContainerRef}
                         style={{scrollSnapType:'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                            <div className='flex flex-nowrap' >
                            {testimonials.map((testimonial, index) => (
                            <div 
                            key={testimonial.id} 
                            className='w-full shrink-0 px-4 snap-start' 
                            style={{scrollSnapAlign:'start'}}
                            >
                                <div className='max-w-4xl mx-auto' >
                                    <div className='flex flex-col gap-6 md:flex-row items-stretch' >
                                        <div className='relative w-full md:w-1/3' >
                                           <div className='relative rounded-2xl overflow-hidden h-72' >
                                              <img src={testimonial.image} alt={testimonial.name} 
                                              className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500' />

                                              
                                              <div className='absolute bottom-4 left-4 right-4' >
                                                <div className='rounded-xl bg-black/60 p-4 shadow-lg' >
                                                    <div className='' >
                                                        <div className='text-2xl font-semibold text-primary mb-1' >
                                                            {testimonialStats[index]?.value}
                                                        </div>
                                                        <div className='text-sm font-semibold text-gray-100' >
                                                            {testimonialStats[index]?.label}
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                        </div>

                                       <div className='flex-1 flex flex-col justify-between py-4' >
                                         <div className='mb-6' >
                                            <Quote className='w-7 h-7 text-primary mb-4 opacity-50' />
                                          <p className='text-lg text-white md:text-xl leading-relaxed' >
                                            {testimonial.qoute}
                                          </p>
                                         </div>

                                         <div className='flex items-center justify-between' >
                                          <div className='' >
                                             <div className='font-medium text-white mb-1' >
                                                {testimonial.name}
                                            </div>
                                             <div className='text-sm text-white/60' >
                                                {testimonial.role}
                                            </div>
                                          </div>
                                           
                                           <div className='flex gap-1' >
                                             {[...Array(Math.floor(testimonial.ratings))].map((_, i) => (
                                                <Star key={i} className='w-4 h-4 fill-primary text-primary' />
                                             ))}
                                           </div>
                                         </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div>
                    </div>

                    <div className='flex items-center justify-center gap-2 mt-10' >
                       {testimonials.map((_, index) => (
                         <button key={index} onClick={() => scrollToIndex(index)}
                           className={`transition-all duration-300 rounded-full ${index === currentIndex 
                            ? 'bg-white w-6 h-2' 
                            : 'bg-white/30 w-2 h-2 hover:bg-white/50'}`}
                            aria-label={`Go to Testimonial ${index + 1}`}
                         />
                       ))}
                    </div>

                    <button 
                     onClick={prevTestimonial} 
                     aria-label='Previous Testimonial'
                     className='flex absolute top-1/2 left-0 -translate-y-1/2 z-10 -translate-x-2 lg:-translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 backdrop-blur-sm border border-white/20 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300'
                    >
                        <ChevronLeft className='w-6 h-6 text-white' />
                    </button>
                    <button 
                     onClick={nextTestimonial} 
                     aria-label='Next Testimonial'
                     className='flex absolute top-1/2 right-0 -translate-y-1/2 z-10 translate-x-4 lg:translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 backdrop-blur-sm border border-white/20 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300'
                    >
                        <ChevronRight className='w-6 h-6 text-white' />
                    </button>
                   </div>
                </FadeIn>
            </div>
        </section>
    )
};
export default Testimonials;