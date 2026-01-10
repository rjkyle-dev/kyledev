import React, {useState} from 'react'
import FadeIn from '../animations/FadeIn'
import {Mail, MapPin, Github, Linkedin, Twitter, Facebook, Instagram, Youtube, Send, MessageSquare} from 'lucide-react'
import {personal_info, social_links} from '../../utils/constants'

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState({type:'', message:''});

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        if(!formData.name.trim() || !formData.email || !formData.message){
            setStatus({type:'error', message:'Please fill in all fields.'});
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.email)){
            setStatus({type:'error', message:'Please enter a valid email address.'});
            return;
        }
        
        setStatus({type:'success', message:'Message sent successfully!'});
        setFormData({name:'', email:'', message:''});

        setTimeout(() => {
            setStatus({type:'', message:''});
        }, 5000);
    };

    const socialIcons = {
        linkedin: Linkedin,
        github: Github,
        twitter: Twitter,
        facebook: Facebook,
        instagram: Instagram,
        youtube: Youtube,
    }

    return (
        <section id='contact' className='relative overflow-hidden py-20 bg-black'>
            <div className='absolute inset-0 overflow-hidden'>
             <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30'></div>
             <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30'></div>
             <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 '></div>
           </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <FadeIn delay={0}>
                <div className='text-center mb-16'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/30 rounded-full'>
                        <MessageSquare className='w-4 h-4 text-primary' />
                        <span className='text-sm font-medium text-primary tracking-wider uppercase'>Get in Touch</span>
                    </div>
                    <h2 className='text-4xl lg:text-5xl font-normal text-white mb-4'>Let's Build Something Together</h2>
                    <p className='text-lg text-white/60 max-w-2xl mx-auto'>I'm always looking for new opportunities and collaborations. Feel free to reach out to me via email or through the contact form below.</p>
                </div>
              </FadeIn>

              <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-12'>
                <FadeIn delay={100}>
                    <div className='bg-white/5 border border-white/10 rounded-2xl p-6'>
                       <form onSubmit={handleSubmit} className='space-y-6'>
                       
                            <div>
                                <label htmlFor='name' className='block text-sm font-medium text-white/80 mb-2'>Name</label>
                                <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} 
                                className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all focus:border-primary/50 duration-300' placeholder='Your Name' />
                            </div>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-white/60 mb-2'>Email</label>
                                <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} 
                                className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all focus:border-primary/50 duration-300' placeholder='Your Email' />
                            </div>
                            <div>
                                <label htmlFor='message' className='block text-sm font-medium text-white/60 mb-2'>Message</label>
                                <textarea id='message' name='message' value={formData.message} onChange={handleChange} rows={5} 
                                className='resize-none w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all focus:border-primary/50 duration-300' placeholder='Your Message' />
                            </div>
                            <button type='submit' 
                            className='w-full px-6 py-3 bg-linear-to-r from-primary/10 to-primary text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer
                            '>
                             <Send className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                             <span className='text-sm font-medium text-white tracking-wider uppercase'>Send Message</span>
                            </button>

                            {status.message && (
                                <div className={`p-4 rounded-xl ${status.type === 'success' 
                                    ? 'text-green-400 bg-green-500/10 border border-green-500/20' 
                                : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                                    {status.message}
                                </div>
                            )}
                       
                       </form>
                    </div>
                </FadeIn>

                <FadeIn delay={200}>
                    <div className='space-y-8'>
                        <div>
                            <h3 className='text-2xl font-semibold text-white mb-4'>                        
                                Let's Connect
                            </h3>
                            <p className='text-white/60 leading-relaxed'>
                                 I'm always open to discuss new projects, creative ideas or opportunity to be part of your vision. Feel free to reach out to me via email or through the contact form below.
                            </p>
                        </div>

                        <div className='space-y-4'>
                            <div className='group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300'>
                                <div className='flex items-start gap-4'>
                                    <div className='p-3 bg-linear-to-br from-primary/20 to-primary/20 border border-primary/30 rounded-xl'>
                                      <Mail className='w-6 h-6 text-primary' />
                                    </div>   
                                    <div className='flex-1'>
                                        <p className='text-sm mb-1 text-white/60'>Email</p>
                                        <a href={`mailto:${personal_info.email}`} className='text-white hover:text-[#A8FF8D] transition-colors font-medium'>
                                            {personal_info.email}
                                        </a>
                                    </div>
                                </div>
                                <div className='absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/5 rounded-2xl transition-all pointer-events-none duration-300'/>
                            </div>

                            <div className='group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300'>
                                <div className='flex items-start gap-4'>
                                    <div className='p-3 bg-linear-to-br from-primary/20 to-primary/20 border border-primary/30 rounded-xl'>
                                        <MapPin className='w-6 h-6 text-primary' />
                                    </div>
                               
                                <div className='flex-1'>
                                    <p className='text-sm mb-1 text-white/60'>Location</p>
                                    <p className='text-white font-medium'>{personal_info.location}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                   

                    <div>
                       <p className='text-sm text-white/60 mb-4'>Follow me on social media</p>
                       <div className='flex gap-4'>
                        {Object.entries(social_links).slice(0, 3).map(([platform, url]) => {
                            const Icon = socialIcons[platform];
                            return Icon ? (
                                <a href={url} key={platform} target='_blank' rel='noopener noreferrer' className='w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors duration-300'>
                                    <Icon className='w-4 h-4 text-white' />
                                </a> 
                            ) : null;
                        })}
                        </div>
                       </div>
                    </div>
                </FadeIn>
            </div>
            </div>
        </section>
    );
};

export default Contact;