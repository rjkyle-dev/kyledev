import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'


const App = () => {
 return (
   <div className='min-h-screen bg-black pb-[100vh]'>
      <Navbar />

      <main>
        <Hero />
        <About />
      </main>
   </div>
);
};

export default App