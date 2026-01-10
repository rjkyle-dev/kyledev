import React from 'react'


const Testimonials = () => {
    return (
        <section id='testimonials' className='relative overflow-hidden py-20 bg-black'>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <FadeIn delay={0}>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl lg:text-5xl font-normal text-white mb-4 max-w-2xl mx-auto'>
                            Testimonials
                        </h2>
                    </div>
                </FadeIn>
            </div>
        </section>
    )
};
export default Testimonials;