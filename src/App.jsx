import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Services from './components/sections/Services'
import BackToTop from './components/ui/BackToTop'
import ChatButton from './components/ui/ChatButton'
import Testimonials from './components/sections/Testimonials'


const App = () => {
 return (
   <div className='min-h-screen bg-black pb-[100vh]'>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Testimonials />
      </main>

      <BackToTop />
      <ChatButton />
   </div>
);
};

export default App